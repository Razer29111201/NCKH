import pool from "../configs/connetDB.js"

const getMenu = async () => {
    const [dataMenu, ex] = await pool.execute('SELECT * FROM `menu`')
    return dataMenu
}
const getHomePage = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM `user` ORDER BY id DESC;')
    const [news, er] = await pool.execute('SELECT * FROM `news` ORDER BY id DESC;')
    const [banner, erer] = await pool.execute('SELECT * FROM `banner` ORDER BY id DESC;')
    const [news_adminssions, erere] = await pool.execute('SELECT * FROM `news_adminssions` ORDER BY id DESC;')

    const [notification, e] = await pool.execute('SELECT * FROM `notification`')


    res.render("index.ejs", { data: await getMenu(), news: news, noti: notification, banner: banner, news_adminssions: news_adminssions })
}
const getNotification = async (req, res) => {
    var id = req.params.id
    const [notification, e] = await pool.execute(`SELECT * FROM notification where id = ${id} `)
    res.render('notification', { data: await getMenu(), noti: notification[0] })
}

export {
    getHomePage, getNotification,
    getMenu
}