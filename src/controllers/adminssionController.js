
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
import axios from "axios";
const now = new Date();

const getadminssions = async (req, res) => {
    res.render('admissions.ejs', { data: await getMenu() })
}
const getQLadminssions = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `news_adminssions`')

    res.render('QL_news_a.ejs', { data: await getMenu(), data: data })
}
const setQLadminssions = (req, res) => {
    // console.log(req.body, req.files.diploma_image[0]);
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
    console.log(data);
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
}
const updateQLadminssions = async (req, res) => {
    var originalString = req.file.path;

    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);

    const date = now.toLocaleDateString();
    var parts = date.split("/");
    var convertedDate = parts[0] + "-" + parts[1] + "-" + parts[2];
    console.log(convertedDate);
    var thumb = req.file.path.split('\\').splice(2).join('/') || result
    var [data] = await pool.execute(`UPDATE news_adminssions SET title='${req.body.title}',content='${req.body.editor}',thumb='${thumb}',date='${convertedDate}' WHERE id='${req.body.id}'`)
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
    var originalString = req.file.path;

    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    const date = now.toLocaleDateString();

    var parts = date.split("/");
    var convertedDate = parts[0] + "-" + parts[1] + "-" + parts[2];
    console.log(convertedDate);

    var thumb = req.file.path.split('\\').splice(2).join('/') || result
    console.log(req.body, req.file, thumb);

    var [data, er] = await pool.execute(`INSERT INTO news_adminssions( title, content, thumb, date) VALUES ('${req.body.title}','${req.body.editor}','${thumb}','${convertedDate}')`)
    if (data) {
        res.redirect('/admin/5')
    }
    else {
        res.json(lỗi)
    }

}

export {
    getadminssions, setQLadminssions, getQLadminssions, addQLadminssions
    , updateQLadminssions, delQLadminssions
}