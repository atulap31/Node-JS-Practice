import gulp from "gulp";
import concat from "gulp-concat";

// Task to concatenate files from src/files to dest/files/all.js
gulp.task("concat-files", function() {
  return gulp.src("src/files/**/*.{js,json,css,html}")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dest/files"));
});

// Default task
gulp.task("default", gulp.series("concat-files"));