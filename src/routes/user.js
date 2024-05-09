import express from 'express'
const router = express.Router();
import { upload } from '../controllers/multer.js';
import { getavt, setUser, setavt,del_ql, edit_ql,change_role, checkLogin, getRegister, getUser, getInfo, editprofile, setresgister, updateAvt, getresgister, doublecheck } from '../controllers/userController.js';


router.post('/', setUser)
router.post('/user', getUser)
router.get('/re', getRegister)
router.get('/checkLogin', checkLogin)
router.get('/info_user', getInfo)
router.post('/editprofile', editprofile)
router.post('/avt', upload.single('img'), updateAvt)
router.get('/register', getresgister)
router.post('/register', setresgister)
router.post('/doublecheck', doublecheck)
router.get('/avt_user/:q', getavt)
router.post('/img', upload.single('img'), setavt)
router.post('/change_role', change_role)
router.post('/edit_ql', edit_ql)
router.post('/del_ql', del_ql)


export default router