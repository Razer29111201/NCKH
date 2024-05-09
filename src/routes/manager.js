import express from 'express'
const router = express.Router();
import { getHomeAdmin, setsidebar, getNews, getQLteacher, getQLUser, getQLnews_a, getQLMenu, getQLSubject, getQLintro, setAllAdmin, getAddNews, getNewsgroup, getQLbanner } from '../controllers/managerController.js';



router.get('/', getHomeAdmin)
router.get('/sidebar', setsidebar)
router.get('/1', getQLUser)
router.get('/2', getNews)
router.get('/2/:id', getNews)
router.get('/3', getQLteacher)
router.get('/4', getQLMenu)
router.get('/5', getQLnews_a)
router.get('/6', getQLSubject)
router.get('/7', getQLintro)
router.get('/add_news', getAddNews)
router.get('/news_group', getNewsgroup)
router.post('/setAllAdmin', setAllAdmin)
router.get('/banner', getQLbanner)


export default router