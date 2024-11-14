const express = require('express');
const router = express.Router();

// Trang chủ - Kiểm tra nếu người dùng đã đăng nhập
router.get('/', (req, res) => {
    const isLoggedIn = req.session.user ? true : false; // Kiểm tra nếu người dùng đã đăng nhập
    res.render('home_page', { isLoggedIn: isLoggedIn }); // Truyền biến isLoggedIn vào view
});

module.exports = router;
