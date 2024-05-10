import pool from "../configs/connetDB.js"
import jwt from "jsonwebtoken";
import { getMenu } from "./homepageController.js"

const getHomeAdmin = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [news_adminssions, errrr] = await pool.execute('SELECT * FROM `news_adminssions`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [noti, r] = await pool.execute('SELECT * FROM notification')
    res.render('manager/manager.ejs', { noti: noti, data_banner: await sidebar_admin(), news_a: news_adminssions, teacher: teacher, newsgroup: data, news: news, sidebar: sidebar, data: await getMenu() })
}
const getNews = async (req, res) => {
    const id_sendnoti = req.params.id
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [newsactive, e] = await pool.execute('SELECT * FROM news where status = 0')
    const [news, er] = await pool.execute('SELECT * FROM news where status = 1')
    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [noti, r] = await pool.execute('SELECT * FROM notification')
    var token = req.cookies.acc
    var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
        return decoded
    });

    var [dataa, errrr] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
    var role = dataa[0].role
    if (role == 1) {
        res.render('news/QL_news.ejs', { noti: noti, data_banner: await sidebar_admin(), newsgroup: data, teacher: teacher, news: newsactive, unnews: news, sidebar: sidebar, data: await getMenu(), id: id_sendnoti, role: 1 })
    }
    res.render('news/QL_news.ejs', { noti: noti, newsgroup: data, data_banner: await sidebar_admin(), teacher: teacher, news: newsactive, unnews: news, sidebar: sidebar, data: await getMenu(), id: id_sendnoti, role: 0 })



}
const getQLteacher = async (req, res) => {
    var birthdate = []
    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [gt, err] = await pool.execute('SELECT * FROM `teacher_group`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    teacher.forEach(e => {
        var isoDateString = e.brith;
        var date = new Date(isoDateString);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        var year = date.getFullYear();
        birthdate.push((day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year)
    })

    res.render('teacher/QL_teacher.ejs', { teacher: teacher, birthdate: birthdate, sidebar: sidebar, gt: gt })
}
const getQLUser = async (req, res) => {
    var birthdate = []
    var sidebar_ = await sidebar_admin()
    const [user, ere] = await pool.execute('SELECT * FROM `user`')
    user.forEach(e => {
        var isoDateString = e.birth;
        var date = new Date(isoDateString);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        var year = date.getFullYear();
        birthdate.push((day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year)
    })
    console.log(birthdate, birthdate[0]);

    res.render('user/QL_user.ejs', { user: user, birthdate: birthdate, data_banner: await sidebar_admin() })
}
const getQLnews_a = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `news_adminssions`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.render('QL_news_a.ejs', { sidebar: sidebar, news: data, data_banner: await sidebar_admin(), data: await getMenu() })
}
const getQLMenu = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM menu')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    res.render('QL_Menu', { menu: data, sidebar: sidebar, data_banner: await sidebar_admin(), data: await getMenu() })
}
const getMenuu = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    res.render('QL_Menu.ejs', { newsgroup: data, news: news, data_banner: await sidebar_admin(), data: await getMenu() })
}
const setsidebar = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.json(sidebar)
}
const getQLSubject = async (req, res) => {

    const [data, er] = await pool.execute('SELECT * FROM `subject`')
    const [subject_group, err] = await pool.execute('SELECT * FROM `subject_group`')
    res.render('subject/QL_subject.ejs', { subject_group: subject_group, subject: data, data: await getMenu() })

}
const getQLintro = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [introduce, er] = await pool.execute('SELECT * FROM `introduce`')
    res.render('QL_introduce.ejs', { introduce: introduce, sidebar: sidebar, data_banner: await sidebar_admin(), data: await getMenu() })

}
const setAllAdmin = async (req, res) => {

    console.log(req.body);
    const [news, ere] = await pool.execute(`SELECT * FROM news WHERE date BETWEEN '${req.body.firTime}' AND '${req.body.lastTime}';`)

    if (news) {

        res.json({ sidebar: news })
    }


}

const getAddNews = async (req, res) => {
    const [news_group, ere] = await pool.execute('SELECT * FROM `newsgroup`')
    res.render('news/add_news.ejs', { news_group: news_group })



}
const getNewsgroup = async (req, res) => {


    const [news_group, ere] = await pool.execute('SELECT * FROM `newsgroup`')

    res.render('news/QL_group.ejs', { data: news_group })

}
const getQLbanner = async (req, res) => {


    const [banner, ere] = await pool.execute('SELECT * FROM `banner`')

    res.render('news/QL_Banner.ejs', { data: banner })

}
const sidebar_admin = async (req, res) => {


    const [banner, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    return banner

}

export {
    getHomeAdmin, sidebar_admin, getQLintro, getMenuu, setsidebar, getQLteacher, getNews, getQLUser, getQLnews_a, getQLMenu, getQLSubject, setAllAdmin, getAddNews, getNewsgroup, getQLbanner

}