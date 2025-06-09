import express from "express";

const authRouter = express.Router();

authRouter.get("/signup", (req, res) => {
  res.send("Sign Up");
});

authRouter.get("/login", (req, res) => {
  res.send("Login");
});

authRouter.get("/logout", (req, res) => {
  res.send("Logout");
});

export default authRouter;
