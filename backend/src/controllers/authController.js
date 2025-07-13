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

    const isMatch = compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const jwtToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      access_token: jwtToken,
    });
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
        {
          user: {
            id: user.id,
            role: user.role,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Respond with the created user and the JWT token
      return res.status(201).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        access_token: jwtToken,
        message: "User created and logged in successfully",
      });
    }

    const jwtToken = sign(
      {
        user: {
          id: user.id,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
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

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.status(200).json({ message: "Token valid", user: decoded });
  });
};

export { signUp, logIn, google, verifyToken };
