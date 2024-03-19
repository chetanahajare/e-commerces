import express from 'express';
import userController from '../controllers/usercontroller'
 
const router = express.Router();
 

router.post('/superAdmin/register', userController.registerUser);
 

router.post('/superAdmin/login', userController.loginUser);
 
export default router;
 