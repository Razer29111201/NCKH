
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


// In ra kết quả
const setTeacheri = async (req, res) => {
    var originalString = req.file.path;

    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    console.log(req.body, req.file);
    const data = req.body
    var file = req.file.path.split('\\').splice(2).join('/') || result
    console.log('a' + file);
    await pool.execute(`INSERT INTO teacher(name, brith, phone, address, position, position_group, email, img) VALUES( '${data.name}', '${data.date}', '${data.title}', '${data.address}', '${data.position}', '${data.gt}', '${data.mail}', '${file}')`)
        .then(ress => {
            res.redirect('/admin/3')
        })
        .catch(er => {
            console.log(er);
        })
}
const updateTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')
    console.log(data);
    res.render('QL_teacher.ejs', { data: await getMenu(), teacher: data })
}
const delTeacheri = async (req, res) => {
    const id = req.body.id
    console.log(id);
    const [data, er] = await pool.execute(`DELETE FROM teacher WHERE  id='${id}'`)
    if (data) {
        res.redirect('/admin/3')
    }
    else {
        res.json(lỗi)
    }

}
export {
    getTeacheri, getQLTeacheri, setTeacheri, updateTeacheri, delTeacheri
}
