import express, { json } from "express";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser"
import connectDB from "./db/config.js";

const app = express();
const port = 3000 || process.env.PORT;

// Set EJS as templating engine
app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// connectDB();

// Routes
app.use("/api/auth", authRoutes);


// Start the server at Port..... 
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
