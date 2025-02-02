import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res):void => {
    if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
    }

    const token = jwt.sign(
      { id: (req.user as any)._id, email: (req.user as any).email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

export default router;
