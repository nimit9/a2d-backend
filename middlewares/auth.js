import { UnAuthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnAuthenticatedError("Authentication Failed");
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Authentication Failed");
    }
};

const checkAdmin = async (req, res, next) => {
    const { userId } = req.user;

    try {
        const user = await User.findById(userId);
        console.log("user", user);
        if (user.role !== "Admin") {
            throw new UnAuthenticatedError("Only admin can access this route");
        }
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Only admin can access this route");
    }
};

export { authenticateUser, checkAdmin };
