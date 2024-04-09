import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js";
const now = new Date();

const getNews = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')

    res.render('admin.ejs', { newsgroup: data, news: news, data: await getMenu() })
}
const setNews = async (req, res) => {
    var title = req.body.title
    var tomtat = req.body.tomtat
    var content = req.body.editor
    const date = now.toLocaleDateString();
    var originalString = req.file.path;
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result


    const newsgroup = req.body.newsgroup
    const [data, err] = await pool.execute(`INSERT INTO news(title, tomtat, content, date, author, idcmt, idgroup,thumb_news) values ('${title}','${tomtat}','${content}','${date}','${1}','${0}','${newsgroup}','${file}')`)


    res.redirect('/admin/2')

}
const updateNews = async (req, res) => {

    var originalString = req.file.path;

    // Tìm vị trí của chuỗi "src/public/"
    var startIndex = originalString.indexOf("src/public/") + "src/public/".length;

    // Cắt chuỗi từ vị trí đó đến hết
    var result = originalString.substring(startIndex);
    var file = req.file.path.split('\\').splice(2).join('/') || result
    var id = req.body.id
    var title = req.body.title
    var tomtat = req.body.tomtat
    var content = req.body.editor
    const date = now.toLocaleDateString();
    const newsgroup = req.body.newsgroup
    const [data, err] = await pool.execute(`UPDATE news SET title='${title}',tomtat='${tomtat}',content='${content}',date='${date}',author='${1}',idcmt='${0}',idgroup='${newsgroup}',thumb_news = '${file}' WHERE id = ${id}`)


    res.redirect('/admin/2')
    thumb_news
}
const delNews = async (req, res) => {
    var id = req.body.id

    const [data, err] = await pool.execute(`DELETE FROM news  WHERE id = ${id}`)


    res.redirect('/admin/2')

}
const getQLNoti = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM notification')


    res.render('QL_noti', { data: data })

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


    var content = req.body.editor


    const [data, er] = await pool.execute(`INSERT INTO introduce( content) VALUES ('${content}')`)

    if (data) {
        res.redirect('/admin/7')
    }

}
const getintroduce = async (req, res) => {
    const [data, er] = await pool.execute('SELECT * FROM introduce')
    res.render('introduce.ejs', { introduce: data, data: await getMenu() })

}
const updateintroduce = async (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var content = req.body.editor
    const date = now.toLocaleDateString();

    const [data, er] = await pool.execute(`UPDATE notification SET title='${title}',content='${content}',date='${date}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/7')
    }
}
const delintroduce = async (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var content = req.body.editor
    const date = now.toLocaleDateString();

    const [data, er] = await pool.execute(`UPDATE notification SET title='${title}',content='${content}',date='${date}' WHERE id='${id}'`)

    if (data) {
        res.redirect('/admin/7')
    }
}
export {
    getNews, setNews, updateNews, delNews,
    getQLNoti, delNoti, updateNoti, setQLNoti, getintroduce, setintroduce, updateintroduce, delintroduce
}