var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('html', function() {
	gulp.src('dev/*.html')
		.pipe(connect.reload());
})

gulp.task('css', function() {
   return gulp.src('dev/style/sass/main.scss')
         .pipe(sass({
            includePaths: ['dev\\style\\sass'].concat(neat)
         }))
         .pipe(autoprefixer('last 10 version'))
         .pipe(gulp.dest('dev/style/'))
         .pipe(connect.reload());;
});

gulp.task('server', function() {
	connect.server({root: 'dev', livereload:true});
});

gulp.task('watch', function() {
   gulp.watch('dev/style/sass/**/*.scss', ['css']);
   gulp.watch('dev/*.html', ['html']);
});

gulp.task('default', ['watch', 'server']);