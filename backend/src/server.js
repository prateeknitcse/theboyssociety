import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import birthdayRoutes from "./routes/birthday.routes.js";
import contributionRoutes from "./routes/contribution.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* 🔐 CORS CONFIG */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* TEMP AUTH (mock user) */
app.use((req, res, next) => {
  req.user = { id: "PUT_REAL_USER_ID_HERE" };
  next();
});

/* ROUTES */
app.use("/api/birthday", birthdayRoutes);
app.use("/api/contribution", contributionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);


/* DB + SERVER */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running on port 5000")
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });
