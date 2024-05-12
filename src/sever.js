import express from "express"
import dotenv from 'dotenv'
import firebase from "firebase/compat/app"
import * as path from 'path';
import 'firebase/storage';
import configViewEngine from "./configs/viewEngine.js"
import initRouter from "./routes/main.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
const app = express()
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }))


app.use(cookieParser());
dotenv.config()
const port = process.env.PORT || 10000

configViewEngine(app, express)

initRouter(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
