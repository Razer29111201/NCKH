import express from 'express'
const router = express.Router();
import { getHomeAdmin, getMenuu, setsidebar, getNews, getQLteacher, getQLnoti, getQLnews_a, getQLMenu, getQLSubject } from '../controllers/managerController.js';



router.get('/', getHomeAdmin)
router.get('/sidebar', setsidebar)
router.get('/1', getQLnoti)
router.get('/2', getNews)
router.get('/3', getQLteacher)
router.get('/4', getQLMenu)
router.get('/5', getQLnews_a)
router.get('/6', getQLSubject)
router.get('/a', getMenuu)

export default router