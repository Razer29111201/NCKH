import express from 'express'
const router = express.Router();
import { getTeacheri } from '../controllers/teacherContrpler.js';


router.get('/', getTeacheri)





export default router