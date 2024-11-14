const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Bỏ mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', function(next) {
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
