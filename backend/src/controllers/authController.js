import jwt from "jsonwebtoken";
import pkg from 'bcryptjs';
import "dotenv/config";
import User from "../models/User.js";

const { genSalt, hash, compare } = pkg;
const { sign } = jwt;


const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
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
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    // const user = await account.get();
    res.status(200).json("I'am User!");
  } catch (error) {
    res.status(400).json({ error });
  }
};

const logOut = async (req, res) => {
  try {
    await account.deleteSession("current");
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
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

export {
  signUp,
  logIn,
  getUser,
  logOut,
};
