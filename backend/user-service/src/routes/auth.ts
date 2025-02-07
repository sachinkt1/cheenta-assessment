import express from "express";
import User from "../models/User";

const router = express.Router();

// Google Login Route
router.post("/google-login", async (req, res) => {
  const { googleId, name, email, avatar } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ googleId, name, email, avatar, role: "user" });
    }

    res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get User Session Data
router.get("/me", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ id: user._id, role: user.role });
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
