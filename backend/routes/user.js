import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { generateToken } from '../utils/jwt.js';
import { login, registerUser, logout, getSubmissions, addSubmission, updateSubmission, deleteSubmission } from '../controller/user.js';

const router = Router();

router.post('/register', (req, res, next) => {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
});

router.post('/login',login);
router.get('/logout', logout);
router.get('/submissions', getSubmissions);
router.post('/addsubmission', addSubmission);
router.put('/updatesubmission/:id', updateSubmission);
router.delete('/deletesubmission/:id', deleteSubmission);

export default router;
