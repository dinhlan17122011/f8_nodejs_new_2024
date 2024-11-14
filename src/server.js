const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/home');
const data = require('./config/db');

const app = express();

// Set up EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cấu hình express-session
app.use(session({
  secret: 'secret-key', // Chìa khóa bí mật cho mã hóa session
  resave: false,
  saveUninitialized: true
}));

// Cấu hình các route
app.use('/courses', courseRoutes);
app.use('/', authRoutes);
app.use('/home', homeRoutes);  // Thêm route cho trang chủ

data();

// Khởi động server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
