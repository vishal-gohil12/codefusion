import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import { codeRoute } from "./routes/codeRoute";
import { projectRoute } from "./routes/projectRoute";

config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRoute);
app.use('/api/v1/', projectRoute);
app.use('/api/v1/', codeRoute);

app.listen(port, ()=> {
    console.log('server is running on ', port);
});
