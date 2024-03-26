import e from "express";
import pool from "../configs/connetDB.js"
import jwt from "jsonwebtoken";
const setUser = async (req, res) => {
    var username = req.body.login
    var pass = req.body.password
    const [data, er] = await pool.execute(`SELECT * FROM user WHERE username = '${username}' AND password = '${pass}'`)


    var id = data[0].id
    var token = jwt.sign(id, 'shhhhh');
    var d = new Date();
    d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();

    res.cookie('acc', token, expires);
    res.redirect('/')
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

export {
    setUser, checkrole, checkLogin
}