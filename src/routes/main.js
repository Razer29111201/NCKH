import express from 'express'
import news from './news.js'
import manager from './manager.js'
import teacher from './teacher.js'
import user from './user.js'
import { getHomePage, getNotification } from '../controllers/homepageController.js'
import { checkLogin } from '../controllers/userController.js'

const route = express.Router()

const initRouter = (app) => {

    app.get('/notification/:id', getNotification)

    app.get('/', getHomePage)
    app.use('/teacher', teacher)
    app.use('/admin', manager)
    app.use('/user', user)
    app.use('/news', news)
    return app.use('/', route)
}
export default initRouter