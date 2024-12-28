import { Router } from "express";
import { userSignin, userSignup } from "../controller/userController";
import { auth } from "../middleware/auth";

export const userRoute = Router();

userRoute.post('/signup', userSignup);
userRoute.post('/login', userSignin);
