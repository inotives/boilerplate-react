var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var nodemon = require('gulp-nodemon');


gulp.task('build', function(){
  return gulp.src('src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
})

gulp.task('serve', function(done){
  nodemon({
    exec: './node_modules/.bin/babel-node ./server.js',
    watch: ['server.js'],
    ext: 'js html'
  });
})

gulp.task('default', ['build'], function(){
  gulp.start(['serve']);
});
