import { Router } from "express";
import { codeExecution } from "../controller/code";

export const codeRoute = Router();

codeRoute.post('/code', codeExecution);
