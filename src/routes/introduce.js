import express from 'express'
import { getintroduce, setintroduce,updateintroduce,delintroduce } from '../controllers/newController.js';
const router = express.Router();

router.get('/', getintroduce)
router.post('/add', setintroduce)
router.post('/update', updateintroduce)
router.post('/de', delintroduce)




export default router