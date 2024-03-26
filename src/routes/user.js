import express from 'express'
const router = express.Router();
import { setUser, checkLogin } from '../controllers/userController.js';


router.post('/', setUser)
router.get('/checkLogin', checkLogin)




export default router