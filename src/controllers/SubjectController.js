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
function convertMySQLDateToInputDate(mysqlDate) {
    // Tạo đối tượng Date từ chuỗi ISO 8601
    const date = new Date(mysqlDate);

    // Lấy các thành phần năm, tháng, ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Trả về định dạng YYYY-MM-DD
    return `${year}-${month}-${day}`;
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
    const [clas, fiel] = await pool.execute(`WITH RankedClasses AS (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY idsubject ORDER BY id) as row_num
        FROM class
    )
    SELECT id, idsubject, idTeacher, date, soluong, time, status
    FROM RankedClasses
    WHERE row_num = 1;
    `);
    var class_info = await Promise.all(clas.map(async item => {
        const [clas_in, rd] = await pool.execute(`SELECT * FROM class_info where id_class = '${req.body.id}'`);

        var class_detail = await Promise.all(clas_in.map(async e => {
            const [clas_, rd] = await pool.execute(`SELECT * FROM hocvien where id = '${e.id_hocvien}'`);
            clas_.forEach(e => {

                e.birth = convertMySQLDateToInputDate(e.birth)
            })
            return clas_[0]
        }))

        const startDate = convertMySQLDateToInputDate(item.date);

        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const next14Weeks = [];
        for (let i = 0; i < 14; i++) {
            const nextWeekStartDate = new Date(new Date(startDate).getTime() + (i) * oneWeek);

            next14Weeks.push(nextWeekStartDate.toISOString().slice(0, 10));
        }
        item['date_next'] = next14Weeks
        item['hocvien'] = class_detail

        item.date = convertMySQLDateToInputDate(item.date)
        const [subject, fields] = await pool.execute(`SELECT * FROM subject where id = ${item.idsubject}`);
        const [teacher, er] = await pool.execute(`SELECT * FROM teacher where id = ${item.idTeacher}`);
        const result = await Promise.all(subject.map(async e => {
            const [subject_info, er] = await pool.execute(`SELECT * FROM subject_info WHERE idSJ = '${e.id}'`);
            e['info'] = subject_info[0]
            return e
        }))
        item['subject_info'] = result[0]
        item['teacher'] = teacher[0]
        return item
    }))

    const page = parseInt(req.query.count_Pending) || 1;
    const itemsPerPage = 3;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const displayedItems = class_info.slice(startIndex, endIndex);
    const totalPages = Math.ceil(class_info.length / itemsPerPage);
    console.log(displayedItems, totalPages);

    var [subject, e] = await pool.execute(`select * FROM subject `)
    var [subject_group, er] = await pool.execute(`select * FROM subject_group `)
    var [subject_info, err] = await pool.execute(`select * FROM subject_info `)
    res.render("subject/subject.ejs", { displayedItems: displayedItems, totalPages: totalPages, currentPage: page, data: await getMenu(), subject: subject, subject_group: subject_group, subject_info: subject_info })

}
const getSubjectDetail = async (req, res) => {
    function addWeeksToDate(dateString, weeks) {
        let date = new Date(dateString);
        date.setDate(date.getDate() + weeks * 7);
        return date.toISOString();
    }
    var [subject, e] = await pool.execute(`select * FROM subject `)
    var [subject_group, er] = await pool.execute(`select * FROM subject_group `)
    var [subject_info, err] = await pool.execute(`select * FROM subject_info where idSj ='${req.params.id}' `)
    var [clas, er] = await pool.execute(`select * FROM class where idsubject ='${req.params.id}' `)


    var [img, err] = await pool.execute(`select * FROM subject where id ='${subject_info[0].idSj}' `)

    if (subject_info.length > 0) {
        var content = Buffer.from(subject_info[0].content).toString('utf-8');

    }
    if (clas.length > 0) {

        var result = await Promise.all(clas.map(async e => {


            console.log(e);
            var [clas_info, ere] = await pool.execute(`select * FROM class_info where id_class ='${e.id}' `)
            e['clas_info'] = clas_info
            e.date = convertMySQLDateToInputDate(e.date)
            e.dateend = convertMySQLDateToInputDate(addWeeksToDate(e.date, 14));
            return e
        }))
    }
    console.log(clas);

    res.render("subject/subjectDeatail.ejs", { clas: clas, data: await getMenu(), subject: subject, subject_group: subject_group, subject_info: subject_info[0], content: content, img: img[0].img })

}



export {
    editDetail, getSubject, getSubjectDetail,
    updateSubject, setSubject, delSubject, getSubjectInfobyid, addDetail, getSubjectbyid
}
