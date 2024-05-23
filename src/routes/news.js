import express from 'express'
const router = express.Router();
import multer from 'multer';
router.get('/', getNews)
import { getNews, getNewsDetail, event, getNewsAPI, updategroup, delgroup, setNews, updateNews, delNews, getQLNoti, updateNoti, setQLNoti, delNoti, geteditNews, setQLgroup, setQLbanner, updatebanner, delbanner, accept } from '../controllers/newController.js';
import { upload } from '../controllers/multer.js';


router.get('/', getNews)
router.get('/event', event)
router.post('/search', getNewsAPI)
router.get('/newsDetail:id', getNewsDetail)
router.post('/', upload.single('img'), setNews)
router.post('/edit', upload.single('img'), updateNews)
router.get('/editnews/:id', geteditNews)
router.post('/del', delNews)
router.get('/noti', getQLNoti)
router.post('/noti/add', setQLNoti)
router.post('/noti/edit', updateNoti)
router.post('/noti/del', delNoti)
router.post('/group/add', setQLgroup)
router.post('/group/edit', updategroup)
router.post('/group/del', delgroup)
router.post('/banner/add', upload.single('img'), setQLbanner)
router.post('/banner/edit', upload.single('img'), updatebanner)
router.post('/banner/del', delbanner)
router.post('/accept', accept)

export default router