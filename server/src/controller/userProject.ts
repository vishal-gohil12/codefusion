import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestUser } from "../middleware/auth";

const prisma = new PrismaClient();

interface Project {
    projectName: string;
    projectLanguage: string;
}

export const projectCreate = async (req: RequestUser, res: Response) => {
    try {
        const user = req.user;
        const { projectName, projectLanguage } : Project = req.body;
        if(user === undefined) {
            res.json({
                user: "User is undefined"
            })
            return;
        }

        if (!projectName || !projectLanguage) {
            res.status(400).json({ error: "Name is required" });
            return;
        }
        const project = await prisma.project.create({
            data: {
                projectName,
                projectLanguage,
                userId: user.id
            }
        });
        res.status(201).json({
            message: "Project created successfully",
            project,
            status: "success"
        });
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllProject = async (req: RequestUser, res: Response) => {
    try {
        const user = req.user;
        if(!user) {
            res.status(400).json({ error: "User is required" });
            return;
        }
        const project = await prisma.project.findMany({
            where: {
                userId: user.id
            }
        });
        res.json({
            projects: project
        })
    } catch {
        return;
    }
}
