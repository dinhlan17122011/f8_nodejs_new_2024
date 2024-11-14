const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// Đăng ký
router.get('/register', authController.getRegisterForm);
// router.post('/register', authController.registerUser);

// Đăng nhập
router.get('/login', authController.getLoginForm);
// router.post('/login', authController.loginUser);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Trang chủ - Đăng xuất
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Không thể đăng xuất');
        }
        // Sau khi đăng xuất thành công, chuyển hướng về trang chủ hoặc trang đăng nhập
        res.redirect('/login'); // Hoặc chuyển hướng về trang chủ '/'
    });
});


module.exports = router;
