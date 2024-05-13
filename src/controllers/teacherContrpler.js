
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const getTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')

    res.render('teacher_info.ejs', { data: await getMenu(), teacher: data })
}
const getQLTeacheri = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `teacher`')

    res.render('QL_teacher.ejs', { data: await getMenu(), teacher: data })
}


// In ra kết quả
const setTeacheri = async (req, res) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    const data = req.body
    await pool.execute(`INSERT INTO teacher(name, brith, phone, address, position, position_group, email, img) VALUES( '${data.name}', '${data.date}', '${data.title}', '${data.address}', '${data.position}', '${data.gt}', '${data.mail}', '${imageUrl}')`)
        .then(ress => {
            res.redirect('/admin/3')
        })
        .catch(er => {
            console.log(er);
        })
}
const updateTeacheri = async (req, res) => {
   

    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
   

    const data = req.body
   

    await pool.execute(`UPDATE teacher SET name='${data.name}',brith='${data.date}',phone='${data.title}',address='${data.address}',position='${data.position}',position_group='${data.gt}',email='${data.mail}',img='${imageUrl}' WHERE id='${data.id}'`)
        .then(re => {
            res.redirect('/admin/3')
        })
        .catch(err => {
            res.status(401).send('Lỗi');
        })
}
const delTeacheri = async (req, res) => {
    const id = req.body.id

    const [data, er] = await pool.execute(`DELETE FROM teacher WHERE  id='${id}'`)
    if (data) {
        res.redirect('/admin/3')
    }
    else {
        res.status(401).send('Lỗi');
    }

}
const getaddTeacher = async (req, res) => {
    const [gt, err] = await pool.execute('SELECT * FROM `teacher_group`')
    res.render('teacher/add_teacher.ejs', { gt: gt })
}
const geteditTeacher = async (req, res) => {
    var id = req.params.id
    const [gt, err] = await pool.execute('SELECT * FROM `teacher_group`')
    const [teacher, er] = await pool.execute(`SELECT * FROM teacher where id = '${id}' `)
    var isoDateString = teacher[0].brith;
    var date = new Date(isoDateString);
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    var year = date.getFullYear();
    var brith_date = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day


    res.render('teacher/edit_teacher.ejs', { gt: gt, brith_date: brith_date, teacher: teacher[0] })
}
export {
    getTeacheri, getQLTeacheri, geteditTeacher, setTeacheri, updateTeacheri, delTeacheri, getaddTeacher
}
