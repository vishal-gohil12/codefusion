import { exec } from "child_process";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const temp_dir = path.join( __dirname,'/temp');

if(!fs.existsSync(temp_dir)) {
    fs.mkdirSync(temp_dir);
}

export const codeExecution = async (req: Request, res: Response) => {
    const { code } = req.body;

    if (!code) {
        res.status(400).json({ error: 'code are required' });
        return;
    }

    let fileExtension, command;
    fileExtension = "py";
    command = "python";


    const fileName = `temp_${Date.now()}.${fileExtension}`;
    const filePath = path.join(temp_dir, fileName);
    fs.writeFileSync(filePath, code);

    exec(`${command} ${filePath}`, (err, stdout, stderr) => {
        fs.unlinkSync(filePath);
        if(err) {
            res.status(500).json({ error: stderr.trim() });
            return;
        }
        res.json({ output: stdout.trim() });
    })
}
