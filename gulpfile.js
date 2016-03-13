var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var shell = require('shelljs');
var preprocess = require('gulp-preprocess');
var argv = require('yargs').argv;


var paths = {
  sass: ['./scss/**/*.scss'],
    preprocessing: {
        config: './preprocess/config.js',
        configxml: './preprocess/configxml.js'
    }
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});


function validateEnvFlag(flag){
    if(!flag || (!(flag == 'local' || flag == 'dev' || flag == 'staging' || flag == 'production'))){
        console.log('invalid env flag (local | dev | staging | production), aborting!');
        return false;
    }
    return true;
}
/**
 * Preprocess files and run on specified device
 * @param {enum} env (dev | staging | production)
 */
gulp.task('serve', function () {
    if(!validateEnvFlag(argv.env)){
        return;
    }
    config(argv.env);

    return gulp.src('*.js', {read: false})
        .pipe(shell([
            'ionic serve'
        ], {
            templateData: {
                f: function (s) {
                    return s.replace(/$/, '.bak')
                }
            }
        }))

});



gulp.task('config', function () {
    if(!validateEnvFlag(argv.env)){
        return;
    }

    //preprocess cordova xml file (for serving seperate app ids)
    console.log('creating cordova xml file');
    gulp.src(paths.preprocessing.configxml)
        .pipe(preprocess({context: { ENV: argv.env, DEBUG: true}}))
        .pipe(rename('config.xml'))
        .pipe(gulp.dest('./'));

});

function config(env) {
    console.log('setting config variables');

    //preprocess cordova xml file (for serving seperate app ids)
    console.log('creating cordova xml file');
    gulp.src(paths.preprocessing.configxml)
        .pipe(preprocess({context: { ENV: argv.env, DEBUG: true}}))
        .pipe(rename('config.xml'))
        .pipe(gulp.dest('./'));

    //preprocess angular config module
    console.log('setting angular config variables');
    /*
    gulp.src(paths.preprocessing.config).pipe(
        preprocess(
            {
                context: {
                    ENV: env,
                    DEBUG: true
                }
            })).pipe(gulp.dest('./www/js/app/core/'));
   */
}


gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
