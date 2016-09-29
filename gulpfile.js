var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');


gulp.task('build', function(){
  return gulp.src('src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
})




gulp.task('serve', function(done){
  // uncomment this if you wish to use nodemon to serve dev server
  // nodemon({
  //   exec: './node_modules/.bin/babel-node ./server.js',
  //   watch: ['server.js'],
  //   ext: 'js html'
  // });

  browserSync.init({
    server: ['dist', 'public'],
    port: 1122
  })

  gulp.watch('./dist/**/*').on('change', browserSync.reload)
})

gulp.task('default', ['build'], function(){
  gulp.start(['serve']);
});
