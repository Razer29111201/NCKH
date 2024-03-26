import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js"

const getHomeAdmin = async (req, res) => {
    const [data, err] = await pool.execute('SELECT * FROM newsgroup')
    const [news, er] = await pool.execute('SELECT * FROM news')
    res.render('manager/manager.ejs', { newsgroup: data, news: news, data: await getMenu() })
}
export {
    getHomeAdmin
}