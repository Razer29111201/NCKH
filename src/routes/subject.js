import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';
import { setSubject, updateSubject, getSubjectbyid, addDetail, delSubject, getSubjectInfobyid } from '../controllers/SubjectController.js';
router.get('/getSubjectInfobyid', getSubjectInfobyid)
router.post('/getSubjectbyid', getSubjectbyid)
router.post('/add', setSubject)
router.post('/update', updateSubject)
router.post('/del', delSubject)
router.post('/addDetail', upload.single('img'), addDetail)



export default router