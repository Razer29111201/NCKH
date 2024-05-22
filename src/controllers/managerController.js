import pool from "../configs/connetDB.js"
import jwt from "jsonwebtoken";
import { getMenu } from "./homepageController.js"
const user = async (req) => {

    if (req.cookies.acc) {
        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        var [data, err] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
        return data[0]
    }
    else {
        console.log("Chưa đăng nhập");

    }

}


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
    console.log(await user(req));
    var [dataa, errrr] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
    var role = dataa[0].role
    if (role == 1) {
        res.render('news/QL_news.ejs', { username: await user(req), noti: noti, data_banner: await sidebar_admin(), newsgroup: data, teacher: teacher, news: newsactive, unnews: news, sidebar: sidebar, data: await getMenu(), id: id_sendnoti, role: 1 })
    }
    res.render('news/QL_news.ejs', { username: await user(req), noti: noti, newsgroup: data, data_banner: await sidebar_admin(), teacher: teacher, news: newsactive, unnews: news, sidebar: sidebar, data: await getMenu(), id: id_sendnoti, role: 0 })



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

    res.render('teacher/QL_teacher.ejs', { username: await user(req), teacher: teacher, birthdate: birthdate, sidebar: sidebar, gt: gt })
}
const getQLUser = async (req, res) => {
    var birthdate = []
    var sidebar_ = await sidebar_admin()
    const [usere, ere] = await pool.execute('SELECT * FROM `user`')
    usere.forEach(e => {
        var isoDateString = e.birth;
        var date = new Date(isoDateString);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        var year = date.getFullYear();
        birthdate.push((day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year)
    })
    console.log(await user(req));

    res.render('user/QL_user.ejs', { username: await user(req), user: usere, birthdate: birthdate, data_banner: await sidebar_admin() })
}
const getQLnews_a = async (req, res) => {
    var [data] = await pool.execute('SELECT * FROM `news_adminssions`')


    res.render('tuyensinh/QL_tuyensinh.ejs', { news: data })
}
const getCouse = async (req, res) => {
    var [couse, err] = await pool.execute('SELECT * FROM `hocvien`')

    res.render('couse/QL_hocvien.ejs', { username: await user(req), couse: couse, data: await getMenu() })
}
const getMenuu = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    res.render('QL_Menu.ejs', { username: await user(req), newsgroup: data, news: news, data_banner: await sidebar_admin(), data: await getMenu() })
}
const setsidebar = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    res.json(sidebar)
}
const getQLSubject = async (req, res) => {

    const [data, er] = await pool.execute('SELECT * FROM `subject`')
    const [subject_group, err] = await pool.execute('SELECT * FROM `subject_group`')
    res.render('subject/QL_subject.ejs', { username: await user(req), subject_group: subject_group, subject: data, data: await getMenu() })

}
const getQLintro = async (req, res) => {

    const [sidebar, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')
    const [introduce, er] = await pool.execute('SELECT * FROM `introduce` ORDER BY id DESC')
    res.render('QL_introduce.ejs', { username: await user(req), introduce: introduce[0], sidebar: sidebar, data_banner: await sidebar_admin(), data: await getMenu() })

}
const setAllAdmin = async (req, res) => {


    const [news, ere] = await pool.execute(`SELECT * FROM news WHERE date BETWEEN '${req.body.firTime}' AND '${req.body.lastTime}';`)

    if (news) {

        res.json({ sidebar: news })
    }


}

const getAddNews = async (req, res) => {
    const [news_group, ere] = await pool.execute('SELECT * FROM `newsgroup`')
    res.render('news/add_news.ejs', { username: await user(req), news_group: news_group })



}
const getNewsgroup = async (req, res) => {


    const [news_group, ere] = await pool.execute('SELECT * FROM `newsgroup`')

    res.render('news/QL_group.ejs', { username: await user(req), data: news_group })

}
const getQLbanner = async (req, res) => {


    const [banner, ere] = await pool.execute('SELECT * FROM `banner`')

    res.render('news/QL_Banner.ejs', { username: await user(req), data: banner })

}
const sidebar_admin = async (req, res) => {


    const [banner, ere] = await pool.execute('SELECT * FROM `sidebar_admin`')

    return banner

}

export {
    getHomeAdmin, sidebar_admin, getQLintro, getMenuu, setsidebar, getQLteacher, getNews, getQLUser, getCouse, getQLnews_a, getQLSubject, setAllAdmin, getAddNews, getNewsgroup, getQLbanner

}