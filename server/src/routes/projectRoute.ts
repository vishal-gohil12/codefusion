import { Router } from "express";
import { getAllProject, projectCreate } from "../controller/userProject";
import { auth } from "../middleware/auth";

export const projectRoute = Router();

projectRoute.post('/projectCreate', auth, projectCreate);
projectRoute.get('/getProject', auth, getAllProject);
