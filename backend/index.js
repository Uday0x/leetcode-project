import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


dotenv.config({
  path: "./.env"
});

const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 7000

app.listen(PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`)
})