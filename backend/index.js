import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import problemRoutes from "./src/routes/problem.routes.js";

dotenv.config({
  path: "./.env"
});

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 7000


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems",problemRoutes);

app.listen(PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`)
})