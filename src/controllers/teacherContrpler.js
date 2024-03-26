
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";

const getTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('teacher_info.ejs', { data: await getMenu(), teacher: data })
}
export {
    getTeacheri
}