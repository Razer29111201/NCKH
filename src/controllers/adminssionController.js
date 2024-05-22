
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
import axios from "axios";
const now = new Date();
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
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
const convertImgtoBase64 = async (file) => {
    var fileData = await readFileAsync(file);
    var imageData = fileData.toString('base64');
    return `data:image/jpeg;base64,${imageData}`;
}

const adminssions = async (req, res) => {
    var [data_gr, e] = await pool.execute('SELECT * FROM `adminssions_gr`')

    if (req.query.q) {
        var [data, er] = await pool.execute(`SELECT * FROM news_adminssions where role= '${req.query.q}'`)
        res.render('tuyensinh/tuyensinh.ejs', { data: await getMenu(), news: data, news_group: data_gr })

    }
    else {
        var [data, er] = await pool.execute('SELECT * FROM `news_adminssions`')
        res.render('tuyensinh/tuyensinh.ejs', { data: await getMenu(), news: data, news_group: data_gr })
    }
}
const getadminssions = async (req, res) => {
    var id = req.query.id
    var [subject, err] = await pool.execute('SELECT * FROM `subject`')
    res.render('admissions.ejs', { data: await getMenu(), subject: subject, id: id })
}
const getaddadminssions = async (req, res) => {

    var [data] = await pool.execute('SELECT * FROM `adminssions_gr`')
    res.render('tuyensinh/add_news_tuyensinh.ejs', { data: data })
}
const geteditadminssions = async (req, res) => {
    var id = req.params.id
    if (id) {
        var [news, err] = await pool.execute(`SELECT * FROM news_adminssions where id='${id}'`)

        var [data] = await pool.execute('SELECT * FROM `adminssions_gr`')
        res.render('tuyensinh/edit_news_tuyensinh.ejs', { data: data, news: news[0] })
    }

}
const getQLadminssions = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `news_adminssions`')

    res.render('QL_news_a.ejs', { data: await getMenu(), data: data })
}
const group_news = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `adminssions_gr`')

    res.render('tuyensinh/tuyensinh_gr.ejs', { data: data })
}
const setQLadminssions = async (req, res) => {
    console.log(req.body, req.files);
    // var payment_proof = req.files.payment_proof[0].path.split('\\').splice(2).join('/')
    // var id_image = req.files.id_image[0].path.split('\\').splice(2).join('/')
    // var diploma_image = req.files.diploma_image[0].path.split('\\').splice(2).join('/')
    const data = {
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        cccd: req.body.id_card,
        email: req.body.email,
        hometown: req.body.ward + " " + req.body.district + " " + req.body.province,
        course: req.body.course
    }

    const img = await convertImgtoBase64(req.files.payment_proof[0].path)
    const img2 = await convertImgtoBase64(req.files.id_image[0].path)
    const img3 = await convertImgtoBase64(req.files.diploma_image[0].path)
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxLzvIhTEAY6USnv9QSuRu7yf4RJBYaU2MbOpIpAqhtVZ3noLjMHSnsuj_usDBq2u7SPQ/exec';


    axios.get(scriptUrl, {
        params: data
    })
        .then(response => {
            console.log('Data pushed to Google Sheets successfully!');
        })
        .catch(error => {
            console.error('Error pushing data to Google Sheets:', error);
        });
    res.send()
}
const updateQLadminssions = async (req, res) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;

    const date = now.toLocaleDateString();
    var parts = date.split("/");
    var convertedDate = parts[0] + "-" + parts[1] + "-" + parts[2];


    var [data] = await pool.execute(`UPDATE news_adminssions SET title='${req.body.title}',content='${req.body.content}',thumb='${imageUrl}',date='${convertedDate}',role='${req.body.role}}' WHERE id='${req.body.id}'`)
    if (data) {
        res.redirect('/admin/5')
    }
    else {
        res.json(lỗi)
    }

}
const delQLadminssions = async (req, res) => {
    var [data] = await pool.execute(`DELETE FROM news_adminssions WHERE  id = '${req.body.id}'`)

    if (data) {
        res.redirect('/admin/5')
    }
    else {
        res.json(lỗi)
    }
}
const addQLadminssions = async (req, res) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    const date = now.toLocaleDateString();

    var parts = date.split("/");
    var convertedDate = parts[0] + "-" + parts[1] + "-" + parts[2];




    var [data, er] = await pool.execute(`INSERT INTO news_adminssions( title, content, thumb, date,role) VALUES ('${req.body.title}','${req.body.content}','${imageUrl}','${convertedDate}','${req.body.category}')`)
    if (data) {
        res.redirect('/admin/5')
    }
    else {
        res.json("lỗi")
    }

}
const addgroup = async (req, res) => {
    var title = req.body.name
    var originalString = req.file.path;
    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result

    await pool.execute(`INSERT INTO adminssions_gr(name, img) VALUES ('${title}','${file}')`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/tuyensinh/group_news')
        })
        .catch(error => {
            // Xử lý lỗi
            console.error('There was a problem with the fetch operation:', error);
        });

}
const updategroup = async (req, res) => {
    var title = req.body.name
    var id = req.body.id
    var originalString = req.file.path;
    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result

    await pool.execute(`UPDATE adminssions_gr SET name='${name}',img='${file}' WHERE id='${id}'`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/tuyensinh/group_news')
        })
        .catch(error => {
            // Xử lý lỗi
            console.error('There was a problem with the fetch operation:', error);
        });

}
const delgroup = async (req, res) => {


    await pool.execute(`Delete from adminssions_gr  WHERE id='${req.body.id}'`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/tuyensinh/group_news')
        })
        .catch(error => {
            // Xử lý lỗi

        });

}
const getDetail = async (req, res) => {
    if (req.params.id) {

        var [data, er] = await pool.execute(`SELECT * FROM news_adminssions WHERE id='${req.params.id}'`)

        res.render('tuyensinh/tuyensinh_detail.ejs', { news: data[0], data: await getMenu() })

    }


}
const getClassDetail = async (req, res) => {
    if (req.body.id) {

        var [data, er] = await pool.execute(`SELECT * FROM class WHERE idsubject='${req.body.id}'`)
        var result = await Promise.all(data.map(async e => {
            var [data, er] = await pool.execute(`SELECT * FROM teacher WHERE id='${e.idTeacher}'`)
            var [data1, er] = await pool.execute(`SELECT * FROM subject WHERE id='${e.idsubject}'`)
            e.date = convertMySQLDateToInputDate(e.date)
            e['teacher'] = data[0]
            e['subject'] = data1[0]
            return e
        }))
        res.json(result);

    }


}



export {
    addgroup, getClassDetail, updategroup, delgroup, getadminssions, setQLadminssions, getQLadminssions, addQLadminssions, geteditadminssions
    , updateQLadminssions, delQLadminssions, getaddadminssions, group_news, getDetail, adminssions
}