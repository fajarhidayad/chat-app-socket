import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController';
import User from '../models/User';

const router = Router();

// User Sign In
router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
});

export default router;
