import pool from "../configs/connetDB.js"
import { Buffer } from 'buffer';
import { getMenu } from "./homepageController.js";
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const setSubject = async (req, res) => {

    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    await pool.execute(`INSERT INTO subject(name, id_sbjgroup,img) VALUES ('${req.body.name}','${req.body.group}','${imageUrl}')`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {

        })


}
const updateSubject = async (req, res) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;

    await pool.execute(`UPDATE subject SET name='${req.body.name}',id_sbjgroup='${req.body.group}', img ='${imageUrl}' WHERE id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
           
        })


}
const delSubject = async (req, res) => {

    await pool.execute(`DELETE FROM subject WHERE  id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
           
        })


}
const getSubjectInfobyid = async (req, res) => {
    await pool.execute(`SELECT * FROM subject_info where idSj = '${req.query.q}' `)
        .then(ress => {
            var content = Buffer.from(ress[0][0].content).toString('utf-8');
            res.json({ data: ress[0][0], content: content })
        })
        .catch(ex => {
            res.json(1)
        })
}
const getSubjectbyid = async (req, res) => {
    var id = req.body.id

    await pool.execute(`SELECT * FROM subject where id = '${id}' `)
        .then(ress => {

            res.json(ress[0][0])
        })
        .catch(ex => {
            res.json(1)
        })
}
const addDetail = async (req, res) => {
    const idDetail = req.body.idDetail;
    const title = req.body.titleDetail;
    const slogan = req.body.slogan;
    const price = req.body.price;
    const sale = req.body.sale;
    const tomtat = req.body.tomtat;
    const content = req.body.content;
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    const currentDate = new Date();

    const mysqlFormattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    await pool.execute(`INSERT INTO subject_info( name, slogan, price, tomtat, content, sale, img, date, idSj) VALUES ('${title}','${slogan}','${price}','${tomtat}','${content}','${sale}','${imageUrl}','${mysqlFormattedDate}','${idDetail}')`)
        .then(re => {
            res.redirect("/admin/6")
        })

}

const editDetail = async (req, res) => {
    const idDetail = req.body.idDetail;
    const title = req.body.titleDetail;
    const slogan = req.body.slogan;
    const price = req.body.price;
    const sale = req.body.sale;
    const tomtat = req.body.tomtat;
    const content = req.body.content;
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    const currentDate = new Date();

    const mysqlFormattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    await pool.execute(`UPDATE subject_info SET name = '${title}', slogan = '${slogan}', price = '${price}', tomtat = '${tomtat}', content = '${content}', sale = '${sale}', img = '${imageData}', date = '${mysqlFormattedDate}'  WHERE idSj = '${idDetail.trim()}'`)
        .then(re => {
            res.redirect("/admin/6")
        })

}

const getSubject = async (req, res) => {

    var [subject, e] = await pool.execute(`select * FROM subject `)
    var [subject_group, er] = await pool.execute(`select * FROM subject_group `)
    var [subject_info, err] = await pool.execute(`select * FROM subject_info `)
    res.render("subject/subject.ejs", { data: await getMenu(), subject: subject, subject_group: subject_group, subject_info: subject_info })

}
const getSubjectDetail = async (req, res) => {
    var [subject, e] = await pool.execute(`select * FROM subject `)
    var [subject_group, er] = await pool.execute(`select * FROM subject_group `)
    var [subject_info, err] = await pool.execute(`select * FROM subject_info where idSj ='${req.params.id}' `)
    if (subject_info.length > 0) {
        var content = Buffer.from(subject_info[0].content).toString('utf-8');

    }
   
    res.render("subject/subjectDeatail.ejs", { data: await getMenu(), subject: subject, subject_group: subject_group, subject_info: subject_info[0], content: content })

}


export {
    editDetail, getSubject, getSubjectDetail,
    updateSubject, setSubject, delSubject, getSubjectInfobyid, addDetail, getSubjectbyid
}
