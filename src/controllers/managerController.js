import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js"

const getHomeAdmin = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [news_adminssions, errrr] = await pool.execute('SELECT * FROM `news_adminssions`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [noti, r] = await pool.execute('SELECT * FROM notification')
    res.render('manager/manager.ejs', { noti: noti, news_a: news_adminssions, teacher: teacher, newsgroup: data, news: news, sidebar: sidebar, data: await getMenu() })
}
const getNews = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [noti, r] = await pool.execute('SELECT * FROM notification')
    console.log(sidebar);
    res.render('QL_news.ejs', { noti: noti, newsgroup: data, teacher: teacher, news: news, sidebar: sidebar, data: await getMenu() })
}
const getQLteacher = async (req, res) => {

    const [teacher, errr] = await pool.execute('SELECT * FROM `teacher`')
    const [gt, err] = await pool.execute('SELECT * FROM `teacher_group`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.render('QL_teacher.ejs', { teacher: teacher, sidebar: sidebar, gt: gt, data: await getMenu() })
}
const getQLnoti = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [noti, r] = await pool.execute('SELECT * FROM notification')
    res.render('QL_noti.ejs', { noti: noti, sidebar: sidebar, data: await getMenu() })
}
const getQLnews_a = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `news_adminssions`')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.render('QL_news_a.ejs', { sidebar: sidebar, news: data, data: await getMenu() })
}
const getQLMenu = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM menu')
    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    res.render('QL_Menu', { menu: data, sidebar: sidebar, data: await getMenu() })
}
const getMenuu = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    res.render('QL_Menu.ejs', { newsgroup: data, news: news, data: await getMenu() })
}
const setsidebar = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.json(sidebar)
}
const getQLSubject = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [data, er] = await pool.execute('SELECT * FROM `subject`')
    const [subject_group, err] = await pool.execute('SELECT * FROM `subject_group`')
    res.render('QL_Subject.ejs', { subject_group: subject_group, subject: data, sidebar: sidebar, data: await getMenu() })

}
const getQLintro = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [introduce, er] = await pool.execute('SELECT * FROM `introduce`')
    res.render('QL_introduce.ejs', { introduce: introduce, sidebar: sidebar, data: await getMenu() })

}
const setAllAdmin = async (req, res) => {

    console.log(req.body);
    const [news, ere] = await pool.execute(`SELECT * FROM news WHERE date BETWEEN '${req.body.firTime}' AND '${req.body.lastTime}';`)
    res.json({ sidebar: sidebar })

}
export {
    getHomeAdmin, getQLintro, getMenuu, setsidebar, getQLteacher, getNews, getQLnoti, getQLnews_a, getQLMenu, getQLSubject, setAllAdmin
}