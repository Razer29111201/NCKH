import express from "express"
import dotenv from 'dotenv'
import configViewEngine from "./configs/viewEngine.js"
import initRouter from "./routes/main.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }))

app.use(cookieParser());
dotenv.config()
const port = process.env.port || 8080

configViewEngine(app, express)

initRouter(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
