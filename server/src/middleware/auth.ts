import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import { PrismaClient, User } from "@prisma/client";
config();

const prisma = new PrismaClient();

export interface RequestUser extends Request {
    user?: User;
}

export const auth = async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).json({
            Error: "Token is missing"
        });
        return;
    }

    const secret = process.env.SECRET ??(() => { throw new Error("Secret is missing") })();
    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        const email = decoded.email;
        const user = await prisma.user.findUnique({
            where: { email: email }
        })
        if(!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            Error: "Invalid token"
        });
    }
}
