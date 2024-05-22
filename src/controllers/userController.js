import e from "express";
import pool from "../configs/connetDB.js"
import jwt from "jsonwebtoken";
import { getMenu } from "./homepageController.js";
import fs from 'fs';
import util from 'util';
const readFileAsync = util.promisify(fs.readFile);
const setUser = async (req, res) => {
    var username = req.body.username
    var pass = req.body.password

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
const getInfo = async (req, res) => {
    var token = req.cookies.acc
    if (token) {

        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });

        var [info, err] = await pool.execute(`SELECT * FROM user where id = ${id}`)
        var token = jwt.sign(info[0].id, 'shhhhh');
        const chuoi = info[0].address
        const mangChuoi = chuoi.split(" - ");

        const xa = mangChuoi[0];
        const huyen = mangChuoi[1];
        const tinh = mangChuoi[2];


        var isoDateString = info[0].birth;
        var date = new Date(isoDateString);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        var year = date.getFullYear();
        var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;

        res.render("user/info_user.ejs", { xa: xa, huyen: huyen, tinh: tinh, info: info[0], birth: formattedDate, data: await getMenu(), id: token })
    }
    else {
        res.redirect('/')
    }

}


const getUser = async (req, res, next) => {
    const id = req.body.id
    var [data, err] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
    res.json(data)
}

const checkrole = async (req, res, next) => {
    var token = req.cookies.acc

    if (token) {

        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });

        var [data, err] = await pool.execute('SELECT * FROM user WHERE id = ?', [id])
        if (data[0].role == 1 || data[0].role) {
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

const editprofile = async (req, res, next) => {
    var fullName = req.body.name;
    var lastName;
    var firstName;
    var lastSpaceIndex = fullName.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) { // Kiểm tra xem có dấu cách trong chuỗi không
        lastName = fullName.substring(lastSpaceIndex + 1); // Lấy phần cuối cùng
        firstName = fullName.substring(0, lastSpaceIndex); // Lấy phần đầu tiên từ đầu đến trước dấu cách cuối cùng
    } else {
        // Trường hợp không có dấu cách trong chuỗi
        lastName = fullName;
        firstName = ""; // Nếu không có phần đầu tiên, có thể gán bằng chuỗi rỗng
    }
    // date
    const dateString = req.body.date;
    const [day, month, year] = dateString.split("-");

    const date = `${year}-${month}-${day} 00:00:00`;
    // id
    var id = jwt.verify(req.body.id, 'shhhhh', function (err, decoded) {
        return decoded
    });
    //sdt
    var sdt
    const inputString = req.body.sdt;
    const spaceIndex = inputString.indexOf(" ");
    if (spaceIndex !== -1) {
        sdt = inputString.substring(spaceIndex + 1);
    } else {
        sdt = req.body.sdt
    }

    const email = req.body.email;
    const address = req.body.address;
    await pool.execute(`UPDATE user SET subname='${firstName}',name='${lastName}',sdt='${sdt}',email='${email}',birth='${date}',address='${address}' WHERE id='${id}'`).then(re => {
        res.redirect('/user/info_user')
    })
}

const updateAvt = async (req, res, next) => {
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    var token = req.cookies.acc

    if (token) {

        var id = jwt.verify(token, 'shhhhh', function (err, decoded) {
            return decoded
        });
        await pool.execute(`UPDATE user SET avt='${imageUrl}' WHERE id='${id}'`)
            .then(re => {
                res.redirect('/user/info_user')
            })
    }
}
const getresgister = async (req, res, next) => {
    res.render('user/register.ejs', {})
}
const setresgister = async (req, res, next) => {



    var fullName = req.body.name;
    var lastName;
    var firstName;
    var lastSpaceIndex = fullName.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
        lastName = fullName.substring(lastSpaceIndex + 1);
        firstName = fullName.substring(0, lastSpaceIndex);

    } else {

        lastName = fullName;
        firstName = "";
    }
    const dateString = req.body.date

    const [year, month, day] = dateString.split("-");

    const date = `${year}-${month}-${day} 00:00:00`;

    var sdt = req.body.nber
    const user = req.body.user;
    const email = req.body.email;
    const address = req.body.ward + "-" + req.body.district + " - " + req.body.province;
    const sex = req.body.sex;
    const password = req.body.pass;
    var [reuslt, err] = await pool.execute(`INSERT INTO user( subname, name, username, password, gender, sdt, email, birth, address, role, status) VALUES ('${firstName}','${lastName}','${user}','${password}','${sex}','${sdt}','${email}','${date}','${address}','${0}','${0}')`)

    res.redirect(`/user/avt_user/${reuslt.insertId}`)



}



const doublecheck = async (req, res, next) => {

    var name = req.body.name
    const [count, e] = await pool.execute(`SELECT COUNT(*) AS count FROM user WHERE username = '${name}';`)
    if (count[0].count === 1) {
        res.json(1)
    }
    if (count[0].count === 0) {
        res.json(0)
    }
}
const getavt = async (req, res, next) => {

    res.render('user/avt_register.ejs', { id: req.params.q })

}
const setavt = async (req, res, next) => {
    const id = req.body.id
    const fileData = await readFileAsync(req.file.path);

    // Chuyển đổi dữ liệu nhị phân thành base64
    const imageData = fileData.toString('base64');
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    await pool.execute(`UPDATE user SET avt='${imageUrl}' WHERE id='${id}'`)
        .then(re => {
            res.redirect('/user/info_user')
        })
}
const change_role = async (req, res, next) => {
    const id = req.body.id
    const role = req.body.roleid


    await pool.execute(`UPDATE user SET role='${role}' WHERE id='${id}'`)
        .then(re => {
            res.redirect('/admin/1')
        })
}
const edit_ql = async (req, res, next) => {
    console.log(req.body);
    var fullName = req.body.name;
    var lastName;
    var firstName;
    var lastSpaceIndex = fullName.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
        lastName = fullName.substring(lastSpaceIndex + 1);
        firstName = fullName.substring(0, lastSpaceIndex);

    } else {

        lastName = fullName;
        firstName = "";
    }
    const dateString = req.body.date

    const [year, month, day] = dateString.split("-");
    const id = req.body.id
    const user = req.body.user
    const nber = req.body.nber
    const email = req.body.email
    const date = `${year}-${month}-${day} 00:00:00`;
    await pool.execute(`UPDATE user SET subname='${firstName}',name='${lastName}',username='${user}',sdt='${nber}',email='${email}',birth='${date}' WHERE id='${id}'`)
        .then(re => {
            res.redirect('/admin/1')
        })
}
const del_ql = async (req, res, next) => {
    const id = req.body.id

    await pool.execute(`DELETE FROM user WHERE  id='${id}'`)
        .then(re => {
            res.redirect('/admin/1')
        })
}
export {
    getresgister, doublecheck, setresgister, getavt, setavt, change_role, edit_ql, del_ql,
    setUser, checkrole, checkLogin, getRegister, getUser, getInfo, editprofile, updateAvt
}