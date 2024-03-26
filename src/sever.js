import express from "express"
import dotenv from 'dotenv'
import configViewEngine from "./configs/viewEngine.js"
import initRouter from "./routes/main.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()
const port = process.env.port

configViewEngine(app, express)

initRouter(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
