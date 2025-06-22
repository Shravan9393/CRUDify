import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"; // ✅ one clean import
import http from "http";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);

// ✅ CORS Config
const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// ✅ Middlewares
app.use(cors(corsConfig));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// ✅ API Routes
app.use("/api", taskRoutes);

export default app;
