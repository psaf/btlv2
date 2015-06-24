var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('html', function() {
	gulp.src('dev/**/*.html')
		.pipe(livereload());
})

gulp.task('sass', function() {
   return gulp.src('dev/style/sass/main.scss')
         .pipe(sass({
            includePaths: ['dev\\style\\sass'].concat(neat)
         }))
         .pipe(autoprefixer('last 10 version'))
         .pipe(gulp.dest('dev/style/'))
         .pipe(livereload());
});

gulp.task('css', function() {
   return gulp.src('dev/**/*.css')
         .pipe(livereload());
})

gulp.task('server', function() {
	connect.server({root: 'dev'});
});

gulp.task('watch', function() {
   livereload.listen();
   gulp.watch('dev/style/sass/**/*.scss', ['sass']);
   gulp.watch('dev/saacartfundraiser/**/*.css', ['css']);
   gulp.watch('dev/**/*.html', ['html']);
});

gulp.task('default', ['watch', 'server']);