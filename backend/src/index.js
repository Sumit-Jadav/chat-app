import express from "express";

import authRouter from "./routes/auth.route.js";

const app = express();

app.use("api/auth", authRouter);

app.listen(5001, () => {
  console.log("http://localhost:5001/");
});
