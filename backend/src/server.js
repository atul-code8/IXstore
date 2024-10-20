import express, { json } from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./db/config.js";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);

// Start the server at Port.....
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
