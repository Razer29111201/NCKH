
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
import jwt from "jsonwebtoken";
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const now = new Date();

const idlast = async (req, res) => {

    const [news, er] = await pool.execute('SELECT * FROM news')
    const id = news.pop().id
    return id
}

export {
    

}