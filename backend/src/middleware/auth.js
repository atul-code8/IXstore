// middleware/auth.js
import pkg from "jsonwebtoken";
const { verify } = pkg;

function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "No token, authorization denied. Token required!" });
  }

  const tokenValue = token.split(" ")[1];

  // --- using cookies ---

  // const tokenValue = req.cookies.token;

  // if (!tokenValue) {
  //   return res.status(401).json({ message: "Unauthorized, token required!" });
  // }

  try {
    const decoded = verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export default auth;
