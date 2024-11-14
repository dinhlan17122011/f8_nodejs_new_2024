const mongoose = require('mongoose');

// Kết nối MongoDB

function  data (params) {
  mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Kết nối MongoDB thành công!'))
    .catch((err) => console.log('Kết nối MongoDB thất bại:', err));
  
}

module.exports = data
