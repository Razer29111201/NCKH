import pool from "../configs/connetDB.js"
import express from 'express'
import news from './news.js'
import manager from './manager.js'
import teacher from './teacher.js'
import admissions from './admissions.js'
import jwt from "jsonwebtoken";
import user from './user.js'
import introduce from './introduce.js'
import menu from './menu.js'
import couses from './couses.js'
import subject from './subject.js'
import { upload } from '../controllers/multer.js';
import { getHomePage, getNotification, test, testa } from '../controllers/homepageController.js'
import { checkrole } from '../controllers/userController.js'



const route = express.Router()
const username = async (req) => {

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
var checkr = async (req, res, next) => {
    res.locals.username = await username(req)
    next()
}

const initRouter = (app) => {


    app.use(checkr);

    // Định nghĩa các route
    route.get('/notification/:id', getNotification);
    route.get('/', getHomePage);
    route.get('/test', test);
    route.post('/test', upload.single('img'), testa);
    route.use('/couse', couses);
    route.use('/tuyensinh', admissions);
    route.use('/introduce', introduce);
    route.use('/teacher', teacher);
    route.use('/menu', menu);
    route.use('/subject', subject);
    route.use('/admin', checkrole, manager);
    route.use('/user', user);
    route.use('/news', news);

    // Sử dụng route object
    app.use('/', route);

    return app;
}
export default initRouter