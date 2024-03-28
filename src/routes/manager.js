import express from 'express'
const router = express.Router();
import { getHomeAdmin,getMenuu } from '../controllers/managerController.js';
import { checkrole } from '../controllers/userController.js';


router.get('/', checkrole, getHomeAdmin)
router.get('/a',  getMenuu)

export default router