
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";

const getTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('teacher_info.ejs', { data: await getMenu(), teacher: data })
}
const getQLTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('QL_teacher.ejs', { data: await getMenu(), teacher: data })
}
const setTeacheri = async (req, res) => {
    console.log(req.body, req.file);
}
const updateTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('QL_teacher.ejs', { data: await getMenu(), teacher: data })
}
const delTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('QL_teacher.ejs', { data: await getMenu(), teacher: data })
}
export {
    getTeacheri, getQLTeacheri, setTeacheri, updateTeacheri, delTeacheri
}