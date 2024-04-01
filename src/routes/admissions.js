import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';

import { getadminssions, getQLadminssions, setQLadminssions, addQLadminssions, updateQLadminssions, delQLadminssions } from '../controllers/adminssionController.js';


router.get('/form', getadminssions)
router.get('/', getQLadminssions)
router.post('/news/add', upload.single('img'), addQLadminssions)
router.post('/news/update', upload.single('img'), updateQLadminssions)
router.post('/news/del', delQLadminssions)
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