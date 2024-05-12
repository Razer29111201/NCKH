import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';
import { setSubject, getSubject, getSubjectDetail, updateSubject, getSubjectbyid, editDetail, addDetail, delSubject, getSubjectInfobyid } from '../controllers/SubjectController.js';
router.get('/getSubjectInfobyid', getSubjectInfobyid)
router.post('/getSubjectbyid', getSubjectbyid)
router.post('/add', upload.single('img'), setSubject)
router.post('/update', upload.single('img'), updateSubject)
router.post('/del', delSubject)
router.post('/addDetail', upload.single('img'), addDetail)
router.post('/editDetail', upload.single('img'), editDetail)
router.get('/', getSubject)
router.get('/:id', getSubjectDetail)



export default router