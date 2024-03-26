import express from 'express'
const router = express.Router();
import { getNews, setNews, updateNews, delNews, getQLNoti, updateNoti, setQLNoti, delNoti } from '../controllers/newController.js';


router.get('/', getNews)
router.post('/', setNews)
router.post('/edit', updateNews)
router.post('/del', delNews)
router.get('/noti', getQLNoti)
router.post('/noti/add', setQLNoti)
router.post('/noti/edit', updateNoti)
router.post('/noti/del', delNoti)



export default router