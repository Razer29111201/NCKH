import e from "express";
import pool from "../configs/connetDB.js"
import jwt from "jsonwebtoken";
const setUser = async (req, res) => {
    var username = req.body.username
    var pass = req.body.password
    console.log(req.body);
    try {

        var [data, err] = await pool.execute(`SELECT * FROM user WHERE username = '${username}' AND password = '${pass}'`)


        var id = data[0].id
        var token = jwt.sign(id, 'shhhhh');
        var d = new Date();
        d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        res.cookie('acc', token, expires);
        res.redirect('/')
    }
    catch {
        res.status(401).send('Tên đăng nhập hoặc mật khẩu không đúng.');
    }




}

const checkLogin = async (req, res, next) => {
    if (req.cookies.acc) {
        var token = req.cookies.acc
        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });

        var [data, err] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
        res.json(data[0])
        next()

    }
    else {
        console.log("Chưa đăng nhập");
        next();
    }
}

const checkrole = async (req, res, next) => {
    var token = req.cookies.acc

    if (token) {

        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });

        var [data, err] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
        if (data[0].role == 1) {
            next()
        }
        else {
            res.json('Bạn Không Đủ Quyền')
        }
    }
    else {
        res.json('Bạn Không Đủ Quyền')
    }
}
const getRegister = async (req, res, next) => {
    res.render('register.ejs')
}


export {
    setUser, checkrole, checkLogin, getRegister
}