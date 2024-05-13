import pool from "../configs/connetDB.js"
import fs from 'fs';
const getMenu = async () => {
    const [dataMenu, ex] = await pool.execute('SELECT * FROM `menu`')
    return dataMenu
}
const getHomePage = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM `user` ORDER BY id DESC;')
    const [news, er] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC;')
    var result = []
    news.forEach(e => {
        var a = `data:image/jpeg;base64,${e.thumb_news}`;
        result.push(a)
    })

    const [banner, erer] = await pool.execute('SELECT * FROM `banner` ORDER BY id DESC;')
    const [news_adminssions, erere] = await pool.execute('SELECT * FROM `news_adminssions` ORDER BY id DESC;')

    const [notification, e] = await pool.execute('SELECT * FROM `notification`')


    res.render("index.ejs", { data: await getMenu(), news: news, noti: notification, result: result, banner: banner, news_adminssions: news_adminssions })
}
const getNotification = async (req, res) => {
    var id = req.params.id
    const [notification, e] = await pool.execute(`SELECT * FROM notification where id = ${id} `)
    res.render('notification', { data: await getMenu(), noti: notification[0] })
}
const test = async (req, res) => {
    res.render('test')
}
const testa = async (req, res) => {


    fs.readFile(req.file.path, (err, data) => {
        if (err) {

            return res.status(500).send('Internal Server Error');
        }



        // Thực hiện truy vấn SQL để chèn dữ liệu nhị phân vào cơ sở dữ liệu
        const imageData = data.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${imageData}`;

        // Hiển thị hình ảnh trong thẻ img
        res.send(`<img src="${imageUrl}" alt="Image" />`);
    })

}


export {
    getHomePage, getNotification,
    getMenu, test, testa
}