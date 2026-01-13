import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'

const router = express.Router();

// this route is used to register a new user
router.post('/register', registerUser);

// this route is used to login a user
router.post("/login", loginUser);

export default router; 
