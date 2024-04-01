import express from 'express'
const router = express.Router();
import { getHomeAdmin, getMenuu, setsidebar, getQLteacher, getQLnoti, getQLnews_a, getQLMenu } from '../controllers/managerController.js';
import { checkrole } from '../controllers/userController.js';


router.get('/', checkrole, getHomeAdmin)
router.get('/sidebar', setsidebar)
router.get('/1', getQLnoti)
router.get('/2', getQLnews_a)
router.get('/3', getQLMenu)
router.get('/4', getQLteacher)
router.get('/a', getMenuu)

export default router