import pool from "../configs/connetDB.js"
import { Buffer } from 'buffer';
const setSubject = async (req, res) => {
    console.log(req.body.group);
    await pool.execute(`INSERT INTO subject(name, id_sbjgroup) VALUES ('${req.body.name}','${req.body.group}')`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
        })


}
const updateSubject = async (req, res) => {

    await pool.execute(`UPDATE subject SET name='${req.body.name}',id_sbjgroup='${req.body.group}' WHERE id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
        })


}
const delSubject = async (req, res) => {

    await pool.execute(`DELETE FROM subject WHERE  id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
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
    console.log(id);
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
    var originalString = req.file.path;
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result
    const currentDate = new Date();

    const mysqlFormattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    console.log(req.body);
    await pool.execute(`INSERT INTO subject_info( name, slogan, price, tomtat, content, sale, img, date, idSj) VALUES ('${title}','${slogan}','${price}','${tomtat}','${content}','${sale}','${file}','${mysqlFormattedDate}','${idDetail}')`)
        .then(re => {
            res.redirect("/admin/6")
        })

}




export {
    updateSubject, setSubject, delSubject, getSubjectInfobyid, addDetail, getSubjectbyid
}
