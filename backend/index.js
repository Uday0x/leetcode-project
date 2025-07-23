import express from "express"
import dotenv from "dotenv"


dotenv.config({
  path: "./.env"
});

const app = express()

const PORT = process.env.PORT || 7000

app.listen(PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`)
})