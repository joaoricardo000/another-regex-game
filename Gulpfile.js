var gulp = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip'),
    path = require('path'),
    csso = require('gulp-csso'),
    nodemon = require('gulp-nodemon'),
    templateCache = require('gulp-angular-templatecache'),
    argv = require('yargs').argv,
    shell = require('gulp-shell');

var outputFolder = "";
console.log(argv.d);
if (argv.d)
    outputFolder = argv.d;
else
    switch (argv._[0]) {
        case "build":
            outputFolder = './build/';
            break;
        case "build-ionic":
            outputFolder = './ionic/www/';
            break;
        default:
            outputFolder = "./dist/"
    }

var jslibs = [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-sanitize/angular-sanitize.min.js',
    './bower_components/angular-route/angular-route.min.js',
    './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
    './bower_components/cryptojs/lib/Crypto.js',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js'
];


gulp.task('server-mock', function () {
    return nodemon({
        script: './app-dev.js',
        ignore: ['*']
    });
});

gulp.task('browser-sync', function () {
    var browserSync = require('browser-sync');
    browserSync.init({
        files: [outputFolder + '**/*.*'],
        proxy: 'http://localhost:8000',
        port: 3000,
        notify: false,
        open: false
    });
});

gulp.task('less', function () {
    return gulp.src(['./src/less/all.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(outputFolder + 'css/'))
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest(outputFolder + 'js/'))
});

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*.*')
        .pipe(gulp.dest(outputFolder))
});

gulp.task('template-views', function () {
    return gulp.src(['./src/templates/views/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(outputFolder + 'templates/views/'))
});

gulp.task('libs', function () {
    return gulp.src(jslibs)
        .pipe(gulp.dest(outputFolder + 'js/libs/'))
});

gulp.task('wordsdb', function () {
    return gulp.src('./words-db/*')
        .pipe(gulp.dest(outputFolder + 'js/db/'))
});

gulp.task('build-templates', function () {
    gulp.src(['./src/assets/favicon.ico'])
        .pipe(gulp.dest(outputFolder + ''));
    return gulp.src(['./src/templates/index.jade'])
        .pipe(jade({
            pretty: false,
            locals: {
                isBuild: true,
                isBuildIonic: argv._[0] == "build-ionic",
                staticBaseUrl: "/"
            }
        }))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('build-templates-cache', function () {
    return gulp.src(['./src/templates/views/**/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(templateCache({
            module: 'RegexGame',
            root: "/static/templates/views/"
        }))
        .pipe(gulp.dest(outputFolder))
});

gulp.task('build-js', ['build-templates-cache'], function () {
    jslibs.push('./src/js/**/*.js');
    jslibs.push(outputFolder + 'templates.js');
    return gulp.src(jslibs)
        .pipe(concat('all.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(outputFolder + 'js/'))
});

gulp.task('build-css', function () {
    return gulp.src(['./src/less/all.less'])
        .pipe(plumber())
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest(outputFolder + 'css/'))
});

gulp.task('watch', function () {
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/templates/**/*.jade', ['template-views']);
    gulp.watch('./src/assets/*.*', ['assets']);
});

gulp.task('dist', ['assets', 'libs', 'js', 'less', 'wordsdb', 'template-views']);
gulp.task('dev', ['dist', 'watch', 'browser-sync']);
gulp.task('build', ['assets', 'build-js', 'build-css', 'wordsdb', 'template-views', 'build-templates']);
gulp.task('build-ionic', ['build']);
gulp.task('default', ['dev', 'server-mock']);