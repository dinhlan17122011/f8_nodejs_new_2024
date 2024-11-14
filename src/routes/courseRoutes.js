const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route đăng ký khóa học mới
router.get('/add', courseController.getAddCourse);

// Thêm khóa học mới
router.post('/add', courseController.addCourse);

// Hiển thị danh sách khóa học
router.get('/edd', courseController.getCourses); // Trang quản lý khóa học

router.get('/edit/:id', courseController.getEditCourse);
// Route cho việc cập nhật khóa học
router.post('/edit/:id', courseController.updateCourse);


// Route xóa khóa học
router.get('/delete/:id', courseController.deleteCourse);

module.exports = router;
