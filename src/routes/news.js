import express from 'express'
const router = express.Router();
import multer from 'multer';
import { getNews, setNews, updateNews, delNews, getQLNoti, updateNoti, setQLNoti, delNoti } from '../controllers/newController.js';
import { upload } from '../controllers/multer.js';


router.get('/', getNews)
router.post('/', upload.single('img'), setNews)
router.post('/edit', upload.single('img'), updateNews)
router.post('/del', delNews)
router.get('/noti', getQLNoti)
router.post('/noti/add', setQLNoti)
router.post('/noti/edit', updateNoti)
router.post('/noti/del', delNoti)



export default router