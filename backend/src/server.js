import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import bodyParser from "body-parser";
import connectDB from "./db/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
const port = process.env.PORT || 8000;

// when using cookies
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  const html = `<h1>Home Page of Server</h1>`;
  return res.send(html);
});

// Start the server at Port.....
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
