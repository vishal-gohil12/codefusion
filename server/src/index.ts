import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import { codeRoute } from "./routes/codeRoute";
import { projectRoute } from "./routes/projectRoute";

config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRoute);
app.use('/api/v1/', projectRoute);
app.use('/api/v1/', codeRoute);

app.get('/', (req, res) => {
    res.send("Server is running...")
})

app.listen(port, ()=> {
    console.log('server is running on ', port);
});
