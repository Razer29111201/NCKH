import pool from "../configs/connetDB.js"

const getMenu = async () => {
    const [dataMenu, ex] = await pool.execute('SELECT * FROM `menu`')
    return dataMenu
}
const getHomePage = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM `user`')

    const [notification, e] = await pool.execute('SELECT * FROM `notification`')


    res.render("index.ejs", { data: await getMenu(), noti: notification })
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