import express from 'express'
const router = express.Router();
import { setUser, checkLogin, getRegister } from '../controllers/userController.js';


router.post('/', setUser)
router.get('/re', getRegister)
router.get('/checkLogin', checkLogin)




export default router