import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js"
function removeVietnameseTones(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    return str;
}
function abbreviateName(fullName) {
    fullName = fullName.toLowerCase();
    const words = fullName.split(' ');

    const lastName = words.pop();
    const initials = words.map(word => word.charAt(0));

    const abbreviatedName = lastName + initials.join('');
    return removeVietnameseTones(abbreviatedName);
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

const getQL_HocVien = async (req, res) => {

}
const addHocVien = (req, res) => {
    res.render('couse/addHocVien.ejs')
}
const sethocvien = async (req, res) => {
    const { name, gender, sdt, summary, province, district, ward } = req.body;
    const dateString = summary;
    const [day, month, year] = dateString.split("-");
    const date = `${day}-${month}-${year} `;
    const abbreviatedName = abbreviateName(name)
    const address = ward + "-" + district + "-" + province
    async function checkCodeExists(code) {
        const [rows, fields] = await pool.execute('SELECT `code` FROM `hocvien` WHERE `code` = ?', [code]);
        return rows.length > 0;
    }
    async function generateUniqueCode(baseCode) {
        let code = baseCode;
        let counter = 1;

        while (await checkCodeExists(code)) {
            code = baseCode + counter;
            counter++;
        }

        return code;
    }

    async function handleFormSubmission(name) {
        const abbreviatedName = abbreviateName(name);


        const uniqueCode = await generateUniqueCode(abbreviatedName);

        return uniqueCode


    }

    const name_code = await handleFormSubmission(name);
    await pool.execute(`INSERT INTO hocvien(name, gender, code, birth, address,sdt) VALUES ('${name}','${gender}','${name_code}','${date}','${address}','${sdt}')`)
    res.redirect('/admin/4')
}
const editHocVien = async (req, res) => {
    var id = req.params.id
    if (id) {
        const [rows, fields] = await pool.execute(`SELECT * FROM hocvien WHERE id = '${id}'`);
        if (rows) {
            console.log(rows[0].birth);
            var addres = rows[0].address.split('-')
            var date = rows[0].birth
            var time = convertMySQLDateToInputDate(date)
            res.render('couse/editHocVien.ejs', { row: rows[0], address: addres, time: time })

        }
    }
}
const updatehocvien = async (req, res) => {
    const { id, name, gender, sdt, summary, province, district, ward } = req.body;
    const dateString = summary;
    const [day, month, year] = dateString.split("-");
    const date = `${day}-${month}-${year} `;
    const abbreviatedName = abbreviateName(name)
    const address = ward + "-" + district + "-" + province
    async function checkCodeExists(code) {
        const [rows, fields] = await pool.execute('SELECT `code` FROM `hocvien` WHERE `code` = ?', [code]);
        return rows.length > 0;
    }
    async function generateUniqueCode(baseCode) {
        let code = baseCode;
        let counter = 1;

        while (await checkCodeExists(code)) {
            code = baseCode + counter;
            counter++;
        }

        return code;
    }

    async function handleFormSubmission(name) {
        const abbreviatedName = abbreviateName(name);


        const uniqueCode = await generateUniqueCode(abbreviatedName);

        return uniqueCode


    }

    const name_code = await handleFormSubmission(name);

    const [rows, fields] = await pool.execute(`UPDATE hocvien SET name='${name}',gender='${gender}',code='${name_code}',birth='${date}',address='${address}',sdt='${sdt}' WHERE id='${id}'`);
    res.redirect('/admin/4')
}
const delhocvien = async (req, res) => {
    var id = req.body.id
    if (id) {
        const [rows, fields] = await pool.execute(`DELETE FROM hocvien WHERE id = '${id}'`);
        res.redirect('/admin/4')
    }
}
const QL_Couse = async (req, res) => {
    const [hocvien, e] = await pool.execute(`SELECT * FROM hocvien`);
    const [clas, fiel] = await pool.execute(`SELECT * FROM class`);
    var class_info = await Promise.all(clas.map(async item => {
        const startDate = item.date;
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const next14Weeks = [];
        for (let i = 0; i < 14; i++) {
            const nextWeekStartDate = new Date(new Date(startDate).getTime() + (i) * oneWeek);

            next14Weeks.push(nextWeekStartDate.toISOString().slice(0, 10));
        }
        item['date_next'] = next14Weeks

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


    res.render('couse/QL_couse.ejs', { class_info: class_info, hocvien: hocvien })
}
const QL_Couse_API = async (req, res) => {

    if (req.body.id) {

        const [clas, fiel] = await pool.execute(`SELECT * FROM class where id = '${req.body.id}'`);
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
            console.log(item.date + "d");
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            const next14Weeks = [];
            for (let i = 0; i < 14; i++) {
                const nextWeekStartDate = new Date(new Date(startDate).getTime() + (i) * oneWeek);
                console.log(nextWeekStartDate);
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


        res.json(class_info)
    }
}
const addCouse = async (req, res) => {
    const [subject, fields] = await pool.execute(`SELECT * FROM subject`);
    const [teacher, er] = await pool.execute(`SELECT * FROM teacher`);
    const result = await Promise.all(subject.map(async e => {
        const [subject_info, er] = await pool.execute(`SELECT * FROM subject_info WHERE idSJ = '${e.id}'`);
        e['info'] = subject_info[0]
        return e
    }))

    res.render('couse/addCouse.ejs', { result: result, teacher: teacher })
}
const setCouse = async (req, res) => {
    const { idsubject, idteacher, date_start, time, number } = req.body
    await pool.execute(` INSERT INTO class( idsubject, idTeacher, date, soluong, time,status) VALUES ('${idsubject}','${idteacher}','${date_start}','${number}','${time}','Pending')`);
}
function formatDateForMySQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
const updateTime = async (req, res) => {
    const { id, time } = req.body
    await pool.execute(` UPDATE class SET time='${time}' WHERE id='${id}'`);
    res.redirect('/couse/QL_Couse')
}
const updateDate = async (req, res) => {
    const { id, date } = req.body
    const selectedDate = new Date(date);
    const mysqlDate = formatDateForMySQL(selectedDate);
    await pool.execute(`UPDATE class SET date='${mysqlDate}' WHERE id='${id}' `);
    res.redirect('/couse/QL_Couse')
}
const add_Class_HocVien = async (req, res) => {
    console.log(req.body);
    const { clas, hocvien } = req.body
    await pool.execute(`INSERT INTO class_info( id_class, id_hocvien, status) VALUES ('${clas}','${hocvien}','0') `);

}
const delCouse = async (req, res) => {
    console.log(req.body);
    const { id } = req.body
    await pool.execute(`DELETE FROM class_info WHERE id_class ='${id}'`);
    await pool.execute(`DELETE FROM class WHERE id ='${id}'`);
    res.json('thành công')

}
const Couse = async (req, res) => {
    const [clas, fiel] = await pool.execute(`SELECT * FROM class`);
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
    res.render('couse/couse', { class_info: displayedItems  , data: await getMenu(), totalPages: totalPages, currentPage: page })

}
export {
    delCouse, add_Class_HocVien, addHocVien, sethocvien, editHocVien, updatehocvien, delhocvien, addCouse, setCouse, QL_Couse, QL_Couse_API, updateTime, updateDate, Couse

}