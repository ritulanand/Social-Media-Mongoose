import { connectDB } from "./src/config/database.js";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/feature/user/userRouter.js";
import postRouter from "./src/feature/post/postRouter.js";
import commentRouter from "./src/feature/comment/commentRoute.js";
import likeRouter from "./src/feature/like/likeRoute.js";
import connectionrouter from "./src/feature/connection/connectionRoutes.js";
import userAuth from "./src/middleware/userAuth.js";
import otpRouter from "./src/feature/otp/otpRouter.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/friendhsip", connectionrouter);
app.use("/otp", otpRouter);

connectDB()
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => {
    console.error("Error connecting to database");
  });
