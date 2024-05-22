import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';
import { addHocVien, updateDate, updateTime, sethocvien, delCouse,add_Class_HocVien, editHocVien, QL_Couse_API, updatehocvien, delhocvien, addCouse, setCouse, QL_Couse,Couse } from '../controllers/cousesController.js';
router.get('/addHocVien', addHocVien)
router.get('/editHocVien/:id', editHocVien)
router.post('/sethocvien', sethocvien)
router.post('/updatehocvien', updatehocvien)
router.post('/delhocvien', delhocvien)
router.get('/QL_Couse', QL_Couse)
router.get('/addCouse', addCouse)
router.post('/addCouse', setCouse)
router.post('/delCouse', delCouse)
router.post('/QL_Couse_API', QL_Couse_API)
router.post('/updateDate', updateDate)
router.post('/updateTime', updateTime)
router.post('/add_Class_HocVien', add_Class_HocVien)
router.get('/', Couse)





export default router