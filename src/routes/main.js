import express from 'express'
import news from './news.js'
import manager from './manager.js'
import teacher from './teacher.js'
import admissions from './admissions.js'
import user from './user.js'
import introduce from './introduce.js'
import menu from './menu.js'
import subject from './subject.js'
import { getHomePage, getNotification } from '../controllers/homepageController.js'
import { checkrole } from '../controllers/userController.js'
const requestCounter = {};

// Hàm middleware để kiểm tra và giới hạn số lượng yêu cầu
const limitRequests = (req, res, next) => {
    const ip = req.ip; // Lấy địa chỉ IP của người dùng gửi yêu cầu

    // Kiểm tra xem IP đã gửi bao nhiêu yêu cầu trong khoảng thời gian
    if (!requestCounter[ip]) {
        requestCounter[ip] = 1; // Nếu không có thì gán là 1
    } else {
        requestCounter[ip]++; // Nếu có thì tăng lên 1
    }

    const maxRequests = 100; // Giới hạn số lượng yêu cầu
    const requestLimitExceeded = requestCounter[ip] > maxRequests;

    if (requestLimitExceeded) {
        res.status(429).send('Too many requests'); // Trả về lỗi 429 nếu vượt quá giới hạn
    } else {
        next(); // Cho phép tiếp tục xử lý yêu cầu
    }
};

const route = express.Router()

const initRouter = (app) => {

    app.get('/notification/:id', getNotification)
    app.get('/', getHomePage)

    app.use('/tuyensinh', admissions)
    app.use('/introduce', introduce)
    app.use('/teacher', teacher)
    app.use('/menu', menu)
    app.use('/subject', subject)
    app.use('/admin', checkrole, manager)
    app.use('/user', user)
    app.use('/news', news)
    return app.use('/', limitRequests, route)
}
export default initRouter