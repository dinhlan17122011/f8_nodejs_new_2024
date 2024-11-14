const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Tạo tác vụ Sass
gulp.task('sass', function () {
  return gulp.src('public/scss/**/*.scss')  // Đọc các tệp SCSS
    .pipe(sass().on('error', sass.logError)) // Biên dịch SCSS thành CSS
    .pipe(gulp.dest('public/css'));  // Lưu tệp CSS vào thư mục css
});

// Tạo tác vụ theo dõi (watch)
gulp.task('watch', function () {
  gulp.watch('public/scss/**/*.scss', gulp.series('sass'));  // Theo dõi thay đổi trong SCSS
});

// Chạy tác vụ mặc định
gulp.task('default', gulp.series('sass', 'watch'));
