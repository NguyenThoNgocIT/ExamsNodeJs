// routes/auth.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
// Hiển thị trang đăng ký
router.get('/register', (req, res) => {
  res.render('register'); // Render view register.ejs
});

// Route đăng ký tài khoản
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kiểm tra email đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email đã tồn tại!' });
    }

    // Tạo người dùng mới
    user = new User({
      name,
      email,
      password,
    });

    // Lưu người dùng vào database
    await user.save();

    // Tạo token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(201).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});
// Hiển thị trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login'); // Render view login.ejs
});

// Route đăng nhập tài khoản
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra người dùng tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại!' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai mật khẩu!' });
    }

    // Tạo token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

export default router;
