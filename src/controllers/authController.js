const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Hiển thị form đăng ký
exports.getRegisterForm = (req, res) => {
    res.render('register');
};

// Xử lý đăng ký người dùng
exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Kiểm tra nếu thiếu thông tin đăng ký
        if (!username || !password || !email) {
            return res.status(400).send('Vui lòng điền đầy đủ thông tin');
        }

        // Kiểm tra nếu email hoặc username đã tồn tại trong cơ sở dữ liệu
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send('Tên người dùng hoặc email đã tồn tại');
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({ username, email, password: hashedPassword });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();
        
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng ký');
    }
};

// Hiển thị form đăng nhập
exports.getLoginForm = (req, res) => {
    res.render('login');
};

// Xử lý đăng nhập người dùng
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ username });

        if (user) {
            // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Lưu thông tin người dùng vào session
                req.session.user = user;
                
                // Đăng nhập thành công, chuyển tới trang chủ
                res.redirect('/home'); // Điều hướng đến trang chủ
            } else {
                // Nếu mật khẩu không đúng
                res.status(401).send('Mật khẩu không đúng');
            }
        } else {
            // Nếu không tìm thấy người dùng
            res.status(404).send('Tên người dùng không tồn tại');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng nhập');
    }
};
