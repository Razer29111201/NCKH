import pool from "../configs/connetDB.js"
const setSubject = async (req, res) => {

    await pool.execute(`INSERT INTO subject(name, id_sbjgroup) VALUES ('${req.body.name}','${req.body.group}')`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
        })


}
const updateSubject = async (req, res) => {

    await pool.execute(`UPDATE subject SET name='${req.body.name}',id_sbjgroup='${req.body.group}' WHERE id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
        })


}
const delSubject = async (req, res) => {

    await pool.execute(`DELETE FROM subject WHERE  id='${req.body.id}'`)
        .then(ress => {
            res.redirect('/admin/6')
        })
        .catch(ex => {
            console.log(ex);
        })


}






export {
    updateSubject, setSubject, delSubject,
}
