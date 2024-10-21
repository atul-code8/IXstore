import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import User from "../models/User.js";
import { oauth2Client } from "../googleAuth/config.js";
import { google } from "googleapis";

const { genSalt, hash, compare } = pkg;
const { sign } = jwt;

const signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      role,
    });

    // Hash the password
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({message: 'Token generated successfully', access_token: token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const signUpWithGoogle = async (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // 'offline' to get a refresh token
    prompt: "consent", // Ask the user to re-consent to permissions
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.redirect(authUrl);
};

const callback = async (req, res) => {
  const code = req.query.code;
  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch user's profile information
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    // Store user info in a cookie (or session storage)
    res.cookie("token", tokens.id_token, { httpOnly: true });
    res.cookie("user", JSON.stringify(userInfo.data), { httpOnly: true });

    // Redirect to the profile page
    res.redirect("/profile");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.redirect("/");
  }
};

// const logInWithGoogle = async (req, res) => {
//   try {
//     const url = account.createOAuth2Session(
//       OAuthProvider.Google,
//       "http://localhost:3000/api/auth/callback",
//       "http://localhost:3000/failure"
//     );
//     res.redirect(url);
//   } catch (error) {
//     console.error("Error logging in with OAuth:", error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

// const oauthCallback = async (req, res) => {
//   try {
//     const session = account.createOAuth2Session("google", req.query.code);
//     console.log("Loggedin with OAuth successfully!");
//     res.json(session);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export { signUp, logIn, signUpWithGoogle, callback };
