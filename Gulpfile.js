var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

gulp.task('html', function() {
  gulp.src('dev/**/*.html')
    .pipe(livereload());
});

gulp.task('template', function() {
  gulp.src('dev/**/index.jade')
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('dev'));
});

gulp.task('sass', function() {
   return gulp.src('dev/style/sass/main.scss')
         .pipe(sass({
            includePaths: ['dev\\style\\sass'].concat(neat)
         }))
         .pipe(autoprefixer('last 10 version'))
         .pipe(gulp.dest('dev/style/'))
         .pipe(livereload());
});

gulp.task('sass-saaacartfundraiser', function() {
   return gulp.src('dev/saaacartfundraiser/style/sass/main.scss')
         .pipe(sass())
         .pipe(autoprefixer('last 10 version'))
         .pipe(gulp.dest('dev/saaacartfundraiser/style/'))
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
   gulp.watch('dev/saaacartfundraiser/**/*.scss', ['sass-saaacartfundraiser']);
   gulp.watch('dev/**/*.html', ['html']);
   gulp.watch('dev/**/*.jade', ['template']);
});

gulp.task('default', ['watch', 'server']);
