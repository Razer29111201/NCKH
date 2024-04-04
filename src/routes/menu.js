import express from 'express'
const router = express.Router();

import { delMenu, updateMenu, setMenu } from '../controllers/menuController.js';

router.post('/add', setMenu)

router.post('/update', updateMenu)

router.post('/del', delMenu)


export default router