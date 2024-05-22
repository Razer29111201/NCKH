import express from 'express'
import news from './news.js'
import manager from './manager.js'
import teacher from './teacher.js'
import admissions from './admissions.js'
import user from './user.js'
import introduce from './introduce.js'
import menu from './menu.js'
import couses from './couses.js'
import subject from './subject.js'
import { upload } from '../controllers/multer.js';
import { getHomePage, getNotification, test, testa } from '../controllers/homepageController.js'
import { checkrole } from '../controllers/userController.js'



const route = express.Router()

const initRouter = (app) => {

    app.get('/notification/:id', getNotification)
    app.get('/', getHomePage)
    app.get('/test', test)
    app.post('/test', upload.single('img'), testa)
    app.use('/couse', couses)
    app.use('/tuyensinh', admissions)
    app.use('/introduce', introduce)
    app.use('/teacher', teacher)
    app.use('/menu', menu)
    app.use('/subject', subject)
    app.use('/admin', checkrole, manager)
    app.use('/user', user)
    app.use('/news', news)
    return app.use('/', route)
}
export default initRouter