import "express-async-errors";

import { authenticateUser, checkAdmin } from "./middlewares/auth.js";

import authRouter from "./routes/authRouter.js";
import booksRouter from "./routes/booksRouter.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import express from "express";
import morgan from "morgan";
import notFoundMiddleware from "./middlewares/not-found.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use(express.json());
//middlewares

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", authenticateUser, checkAdmin, booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
