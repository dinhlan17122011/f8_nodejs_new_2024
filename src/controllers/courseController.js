const Course = require('../models/Course');

// Thêm khóa học
exports.getAddCourse = (req, res) => {
  res.render('addCourse'); // Hiển thị form để thêm khóa học
};

// courseController.js

exports.getAddCourse = (req, res) => {
  const isLoggedIn = req.session.user ? true : false;  // Kiểm tra người dùng đã đăng nhập
  res.render('addCourse', { isLoggedIn: isLoggedIn });  // Truyền isLoggedIn vào view
};


exports.addCourse = async (req, res) => {
  const { name, instructor, start_date } = req.body;

  // Kiểm tra dữ liệu từ form
  if (!name || !instructor || !start_date) {
    return res.status(400).send('Vui lòng điền đầy đủ thông tin');
  }

  try {
    // Tạo mới khóa học
    const newCourse = new Course({ name, instructor, start_date });
    await newCourse.save();

    // Sau khi thêm khóa học thành công, chuyển hướng đến trang quản lý khóa học
    res.redirect('/courses'); // Trang quản lý khóa học
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi thêm khóa học');
  }
};

exports.getEditCourse = async (req, res) => {
  const courseId = req.params.id;  // Lấy id từ URL
  try {
    const course = await Course.findById(courseId);  // Tìm khóa học theo id
    if (!course) {
      return res.status(404).send('Khóa học không tồn tại');
    }
    res.render('editCourse', { course });  // Render view với thông tin khóa học
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lấy thông tin khóa học');
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;  // Lấy ID của khóa học từ URL
  const { name, instructor, start_date } = req.body;  // Lấy dữ liệu từ form chỉnh sửa

  try {
    // Cập nhật khóa học trong cơ sở dữ liệu
    await Course.findByIdAndUpdate(courseId, { name, instructor, start_date });

    // Sau khi cập nhật thành công, chuyển hướng về trang quản lý khóa học
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi cập nhật khóa học');
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Lấy tất cả khóa học từ cơ sở dữ liệu
    const isLoggedIn = req.session.user ? true : false; // Kiểm tra người dùng đã đăng nhập
    res.render('manage-courses', { courses, isLoggedIn }); // Truyền danh sách khóa học và trạng thái đăng nhập vào view
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi lấy danh sách khóa học');
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    await Course.findByIdAndDelete(courseId);
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi xóa khóa học');
  }
};
