import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RequestUser } from "../middleware/auth";

config();
const prisma = new PrismaClient();

interface User {
    name: string;
    email: string;
    password: string;
}


export const userSignup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } : User = req.body;

        if(!name || !email || !password ) {
            res.status(400).json({
                Error: "Input filed are missing"
            });
            return;
        }

        const isEmailExist = await prisma.user.findUnique({ where: { email: email } });
        if(isEmailExist) {
            res.status(400).json({
                Error: "Email is already exist"
            });
            return;
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);  
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        });

        const secret = process.env.SECRET ??(() => { throw new Error("Secret is missing") })();
        const token = jwt.sign({email: email}, secret, {expiresIn: '1h'});
        res.status(201).json({
            Message: "User is create",
            token: token
        });
    } catch {
        res.status(404).json({
            Error: "Error while posting user data"
        });
    }
}

export const userSignin = async (req: RequestUser, res: Response) => {
    try {
        const { email, password } : User = req.body;
        if(!email || !password) {
            res.status(400).json({
                Error: "Input filed are missing"
            });
            return;
        }
        const isEmailExist = await prisma.user.findUnique({ where: { email: email } });
        if(!isEmailExist) {
            res.status(400).json({  
                Error: "Email is not exist"
            });
        }
        if (!isEmailExist?.password) {
            res.status(400).json({
                Error: "Password is missing"
            });
            return;
        }
        const isPasswordMathc = await bcrypt.compare(password, isEmailExist.password);
        if(!isPasswordMathc) {
            res.status(400).json({
                Error: "Password is not match"
            });
            return;
        }   

        const secret = process.env.SECRET ??(() => { throw new Error("Secret is missing") })();
        const token = jwt.sign({email: email}, secret, {expiresIn: '1h'});
        res.status(200).json({
            userName: isEmailExist.name,
            token: token,
            status: true
        });
    } catch {
        res.status(404).json({
            Error: "Error while posting user data",
            status: false
        });
    }
}



