import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';

import { getadminssions,adminssions,addgroup,updategroup,delgroup,getDetail, geteditadminssions, group_news,getaddadminssions, getQLadminssions, setQLadminssions, addQLadminssions, updateQLadminssions, delQLadminssions } from '../controllers/adminssionController.js';

router.get('/', adminssions)
router.get('/?q', getadminssions)
router.get('/form', getadminssions)
router.get('/add_news_tuyensinh', getaddadminssions)
router.get('/group_news', group_news)
router.get('/:id', getDetail)
router.get('/edit_news_tuyensinh/:id', geteditadminssions)
router.get('/', getQLadminssions)
router.post('/news/add', upload.single('img'), addQLadminssions)
router.post('/news/update', upload.single('img'), updateQLadminssions)
router.post('/news/del', delQLadminssions)
router.post('/group/add', upload.single('img'), addgroup)
router.post('/group/update', upload.single('img'), updategroup)
router.post('/group/del', delgroup)
router.post('/add', upload.fields([
    { name: 'payment_proof', maxCount: 1 },
    {
        name: 'id_image', maxCount: 1
    }, {
        name: 'diploma_image', maxCount: 1
    }
]), setQLadminssions)

// , upload.single('diploma_image'), upload.single('payment_proof'),

export default router