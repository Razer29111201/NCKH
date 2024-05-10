import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';
import { getTeacheri, getaddTeacher,geteditTeacher, getQLTeacheri, setTeacheri, updateTeacheri, delTeacheri } from '../controllers/teacherContrpler.js';


router.get('/', getTeacheri)
router.get('/:id', getTeacheri)
router.get('/addTeacher', getaddTeacher)
router.get('/editTeacher/:id', geteditTeacher)
router.get('/QL', getQLTeacheri)
router.post('/add', upload.single('img'), setTeacheri)
router.post('/update', upload.single('img'), updateTeacheri)
router.post('/del', delTeacheri)





export default router
