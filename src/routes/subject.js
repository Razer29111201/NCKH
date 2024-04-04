import express from 'express'
const router = express.Router();

import { setSubject, updateSubject, delSubject } from '../controllers/SubjectController.js';

router.post('/add', setSubject)
router.post('/update', updateSubject)
router.post('/del', delSubject)


export default router