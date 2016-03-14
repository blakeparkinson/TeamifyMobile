var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var argv = require('yargs').argv;
var exec = require('gulp-exec');
var git = require('git-rev-sync');

var paths = {
  sass: ['./scss/**/*.scss'],
    preprocessing: {
        config: './preprocess/config.js',
        configxml: './preprocess/configxml.js'
    }
};


gulp.task('default', ['sass']);

/**
 * Run sass tasks
 */
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

/**
 * Watch Sass files and compile
 */
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});


/**
 * Preprocess files and serve in browser (default env is local)
 * @param {enum} env (dev | staging | production)
 */
gulp.task('serve', function () {

    var env = getEnvironment(argv);

    config(env);

    return gulp.src('*.js', {read: false})
        .pipe(exec('ionic serve'))

});


/**
 * Push to upstream branch and automatically deploy if on environment branch
 */
gulp.task('deploy', function () {

    var branch = git.branch();
    var env = getEnvironmentForBranch(branch);
    config(env);

    console.log('Pushing to branch:' + branch);
    return gulp.src('*.js', {read: false})
        .pipe(exec('git push'));

    if(branch == 'dev' || branch == 'staging' || branch == 'master'){
        console.log('Deploying to channel: branch');
         return gulp.src('*.js', {read: false})
         .pipe(exec('ionic upload --deploy=' + branch))
    }
    return;

});

/**
 * Preprocess files and emulate (default env is local)
 * @param {enum} env (dev | staging | production)
 */
gulp.task('emulate', function () {

    var env = getEnvironment(argv);
    var device = 'ios';
    var branch = git.branch();

    if(!branchMatchesEnvironment(branch, env)){
        console.log(gutil.colors.red('Branch does not match environment, aborting!'));
        return;
    }

    if(argv.android) {
    device = 'android';
    }

    config(env);

    return gulp.src('*.js', {read: false})
        .pipe(exec('ionic emulate ' + device))

});

function getEnvironmentForBranch(branch){


    if(branch == 'dev'){
            return 'dev';
    }
    if(branch == 'staging'){
            return 'staging';
    }
    if(branch == 'master'){
            return 'master';
    }

    return 'local';
}

function branchMatchesEnvironment(branch, env){
if(env == 'local'){
   if(branch == 'dev' || branch == 'staging' || branch == 'master'){
       return false;
   }
}
    if(env == 'dev'){
        if(branch !== 'dev'){
            return false;
        }
    }
    if(env == 'staging'){
        if(branch !== 'staging'){
            return false;
        }
    }
    if(env == 'production'){
        if(branch !== 'production'){
            return false;
        }
    }
return true;
}
/**
 * Preprocess files and run on specified device
 * @param {enum} env (dev | staging | production)
 */
gulp.task('run', function () {
    var env = getEnvironment(argv);

    if (env == 'local') {
        console.log('Cannot run in local env, specify with flag (dev | staging | production)');
        return;
    }

    var device = getDevice(argv);

    config(env);

    if (device = 'android') {
        return gulp.src('*.js', {read: false}).pipe(exec('ionic run ' + device));
    }

    else{
        console.log('ios');
        return gulp.src('*.js', {read: false})
            .pipe(exec('ionic build ios'))
    }

});



function getEnvironment(argv){
    var env;
    if(argv.dev){
        env = 'dev';
    }
    else if(argv.staging){
        env = 'staging';
    }
    else if(argv.production){
        env = 'production';
    }
    else{
        env = 'local'
    }

    return env;
}

function getDevice(argv){
    var device = 'ios';

    if(argv.android) {
        device = 'android';
    }
    return device;
}

function config(env) {

    console.log(env);
    //preprocess cordova xml file (for serving seperate app ids)
    console.log('creating cordova xml file for environment: ' + env);
    gulp.src(paths.preprocessing.configxml)
        .pipe(preprocess({context: { ENV: env, DEBUG: true}}))
        .pipe(rename('config.xml'))
        .pipe(gulp.dest('./'));

    //preprocess angular config module
    console.log('setting angular config variables for environment: ' + env);
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
