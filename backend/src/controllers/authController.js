import jwt from "jsonwebtoken";
import pkg from "bcryptjs";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const { genSalt, hash, compare } = pkg;
const { sign } = jwt;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signUp = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
      role,
    });

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;
        // cookie
        // res.cookie("token", token, { httpOnly: true });
        res.json({
          message: "Token generated successfully",
          access_token: token,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const google = async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
      });

      // After user creation, create a JWT token
      const jwtToken = sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Respond with the created user and the JWT token
      return res.status(201).json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        access_token: jwtToken,
        message: "User created and logged in successfully",
      });
    }

    const jwtToken = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // res.cookie("token", jwtToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      access_token: jwtToken,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ message: "Authentication failed" });
  }
};

export { signUp, logIn, google };
