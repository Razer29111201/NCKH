import express from 'express'
const router = express.Router();
import { getHomeAdmin } from '../controllers/managerController.js';
import { checkrole } from '../controllers/userController.js';


router.get('/', checkrole, getHomeAdmin)
export default router