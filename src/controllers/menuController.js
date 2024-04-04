import pool from "../configs/connetDB.js"
import { getMenu } from "./homepageController.js"

const setMenu = async (req, res) => {
    var name = req.body.name
    var Link = req.body.Link

    await pool.execute(`INSERT INTO menu( name, link) VALUES ('${name}','${Link}')`)
        .then(ress => {
            res.redirect('/admin/4')
        })
        .catch(ex => {
            console.log(ex);
        })
}
const updateMenu = async (req, res) => {
    var name = req.body.name
    var Link = req.body.Link

    await pool.execute(`UPDATE menu SET name='${name}',link='${Link}' WHERE id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/4')
        })
        .catch(ex => {
            console.log(ex);
        })
}
const delMenu = async (req, res) => {
    const id = req.body.id
    await pool.execute(`DELETE FROM menu WHERE id='${id}'`)
        .then(ress => {
            res.redirect('/admin/4')
        })
        .catch(ex => {
            console.log(ex);
        })

}
export {
    delMenu, updateMenu, setMenu
}
