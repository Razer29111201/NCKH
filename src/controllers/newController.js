
import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
import jwt from "jsonwebtoken";
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const now = new Date();

const idlast = async (req, res) => {

    const [news, er] = await pool.execute('SELECT * FROM news')
    const id = news.pop().id
    return id
}
const iduser = (req) => {
    if (req.cookies.acc) {
        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });

        return id


    }
}
const getNews = async (req, res) => {
    const [news_group, er] = await pool.execute(`SELECT * FROM newsgroup`)
    const q = req.query.q
    console.log(q);
    if (q) {
        const [news, err] = await pool.execute(`SELECT * FROM news where idgroup = ${q}  ORDER BY id DESC;`)

        res.render('news/news.ejs', { news: news, data: await getMenu(), news_group: news_group })
    }
    else {
        const [news, err] = await pool.execute(`SELECT * FROM news ORDER BY id DESC;`)
        res.render('news/news.ejs', { news: news, data: await getMenu(), news_group: news_group })
    }

}
const getNewsDetail = async (req, res) => {
    const id = req.params.id

    const [news, err] = await pool.execute(`SELECT * FROM news WHERE id = "${id}"`)

    res.render('news/news_detail.ejs', { news: news[0], data: await getMenu() })

}
const geteditNews = async (req, res) => {

    const id = req.params.id
    const [newsgroup, err] = await pool.execute('SELECT * FROM newsgroup')
    await pool.execute(`SELECT * FROM news where id = '${id}' `)
        .then(reso => {
            const data = reso[0][0]
            res.render('news/edit_news.ejs', { news: data, news_group: newsgroup })
        })

}
const setNews = async (req, res) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    const id = await idlast() + 1
    var title = req.body.title
    var tomtat = req.body.summary
    var content = req.body.content
    const date = now.toLocaleDateString();


    const mysqlDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');

    const newsgroup = req.body.select
    await pool.execute(`INSERT INTO notification( title, link, type, time, iduser, status) VALUES ('${title}','/admin/2/${id}','1','${mysqlDateTimeString}','${iduser(req)}','0')`)
    const [data, err] = await pool.execute(`INSERT INTO news(title, tomtat, content, date, author, idcmt, idgroup,thumb_news,status) values ('${title}','${tomtat}','${content}','${date}','${1}','${0}','${newsgroup}','${imageUrl}','1')`)


    res.redirect('/admin/2')

}
const updateNews = async (req, res) => {

    try {
        const fileData = await readFileAsync(req.file.path);

        // Chuyển đổi dữ liệu nhị phân thành base64
        const imageData = fileData.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${imageData}`;


        const id = req.body.id;
        const title = req.body.title;
        const tomtat = req.body.summary;
        const content = req.body.content;
        const date = new Date().toLocaleDateString(); // Sử dụng new Date() thay vì now
        const mysqlDateTimeString = new Date().toISOString().slice(0, 19).replace('T', ' '); // Sử dụng new Date() thay vì now
        const newsgroup = req.body.select;

        // Thực hiện các truy vấn SQL
        await pool.execute(`INSERT INTO notification( title, link, type, time, iduser, status) VALUES ('${title}','/admin/2/${id}','2','${mysqlDateTimeString}','${iduser(req)}','0')`);
        const [result, _] = await pool.execute(`UPDATE news SET title='${title}',tomtat='${tomtat}',content='${content}',date='${date}',author='${1}',idcmt='${0}',idgroup='${newsgroup}',thumb_news = '${imageData}', status='0' WHERE id = ${id}`);

        res.redirect('/admin/2');
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).send('Internal Server Error');
    }

}
const delNews = async (req, res) => {
    var id = req.body.id
    const [data, err] = await pool.execute(`SELECT * FROM news WHERE id = '${id}'`)
    const news = data[0]
    const mysqlDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');
    await pool.execute(`INSERT INTO notification( title, link, type, time, iduser, status) VALUES ('${news.title}','#','3','${mysqlDateTimeString}','${iduser(req)}','0')`)

    await pool.execute(`DELETE FROM news WHERE id = '${id}'`)
    try {


        res.redirect('/admin/2')
    } catch (error) {

    }


}
const getQLNoti = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM `notification`')

    res.json(data)
}
const delNoti = async (req, res) => {
    var id = req.body.id
    const [data, er] = await pool.execute(`DELETE FROM notification WHERE id ='${id}' `)

    if (data) {
        res.redirect('/admin/1')
    }


}
const setQLNoti = async (req, res) => {

    var id = req.body.id
    var title = req.body.title
    var content = req.body.editor
    const date = now.toLocaleDateString();

    await pool.execute(`INSERT INTO notification( title, content, date) values ('${title}','${content}','${date}')`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/admin/1')
        })
        .catch(error => {
            // Xử lý lỗi
            console.error('There was a problem with the fetch operation:', error);
        });





}
const updateNoti = async (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var content = req.body.editor
    const date = now.toLocaleDateString();

    const [data, er] = await pool.execute(`UPDATE notification SET title='${title}',content='${content}',date='${date}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/1')
    }

}
const setintroduce = async (req, res) => {

    var content = req.body.content
    var title = req.body.title
    var tomtat = req.body.tomtat
    const [data, er] = await pool.execute(`INSERT INTO introduce(title,tomtat, content) VALUES ('${title}','${tomtat}','${content}')`)
    if (data) {
        res.redirect('/admin/7')
    }

}
const getintroduce = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM introduce')

    res.render('introduce.ejs', { introduce: data[0], data: await getMenu() })

}
const updateintroduce = async (req, res) => {
    var id = req.body.id

    var content = req.body.editor


    const [data, er] = await pool.execute(`UPDATE introduce SET content='${content}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/7')
    }
}
const delintroduce = async (req, res) => {
    var id = req.body.id


    const [data, er] = await pool.execute(`DELETE FROM introduce WHERE id ='${id}'`)

    if (data) {
        res.redirect('/admin/7')
    }
}

const delgroup = async (req, res) => {
    var id = req.body.id
    const [data, er] = await pool.execute(`DELETE FROM newsgroup WHERE  id ='${id}' `)
    if (data) {
        res.redirect('/admin/news_group')
    }


}
const setQLgroup = async (req, res) => {

    var title = req.body.name
    var idng = req.body.idgr
    await pool.execute(`INSERT INTO newsgroup(name, idng) VALUES ('${title}','${idng}')`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/admin/news_group')
        })
        .catch(error => {
            // Xử lý lỗi
            console.error('There was a problem with the fetch operation:', error);
        });





}
const updategroup = async (req, res) => {
    var id = req.body.id
    var title = req.body.name
    var idng = req.body.idgr


    const [data, er] = await pool.execute(`UPDATE newsgroup SET name='${title}',idng='${idng}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/news_group')
    }

}

const delbanner = async (req, res) => {
    var id = req.body.id
    const [data, er] = await pool.execute(`DELETE FROM banner WHERE  id ='${id}' `)
    if (data) {
        res.redirect('/admin/news_group')
    }


}
const setQLbanner = async (req, res) => {
    var originalString = req.file.path;
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result
    const title = req.body.title;
    const link = req.body.link;
    const mysqlDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');
    await pool.execute(`INSERT INTO banner( image, title, link, date) VALUES ('${file}','${title}','${link}','${mysqlDateTimeString}')`)
        .then(data => {
            // Xử lý dữ liệu
            res.redirect('/admin/banner')
        })
        .catch(error => {
            // Xử lý lỗi
            console.error('There was a problem with the fetch operation:', error);
        });





}
const updatebanner = async (req, res) => {
    var id = req.body.id
    var originalString = req.file.path;
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result
    const title = req.body.title;
    const link = req.body.link;
    const mysqlDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');


    const [data, er] = await pool.execute(`UPDATE banner SET image='${file}',title='${title}',link='${link}',date='${mysqlDateTimeString}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/banner')
    }

}
const accept = async (req, res) => {
    var id = req.body.id
    const title = req.body.title
    const mysqlDateTimeString = now.toISOString().slice(0, 19).replace('T', ' ');
    await pool.execute(`INSERT INTO notification( title,type,link,time,iduser,status) VALUES ('${title}','10','/admin/2//${id}','${mysqlDateTimeString}','${iduser(req)}','0')`)
    await pool.execute(`UPDATE news SET status = 0 WHERE id ='${id}' `)
        .then(r => {
            res.redirect('/admin/2')

        })



}


export {
    getNews, getNewsDetail, setNews, updateNews, delNews, geteditNews, updategroup, delgroup, setQLgroup, setQLbanner, updatebanner, delbanner
    , getQLNoti, delNoti, updateNoti, setQLNoti, getintroduce, setintroduce, updateintroduce, delintroduce, accept

}