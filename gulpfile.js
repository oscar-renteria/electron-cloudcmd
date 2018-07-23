var gulp = require('gulp');
var runSequence = require('run-sequence');
var rimraf = require('gulp-rimraf');

var outputDir = 'js';
gulp.task('clean', cb => { return gulp.src(outputDir).pipe(rimraf()); });

gulp.task('tsc', () => 
{
    var os = require('os');
    var platform = os.platform();
    var exec = require('child_process').exec;
    
    var command = 'node_modules/.bin/tsc -p .';
    if (platform === 'win32') command = '.\\node_modules\\.bin\\tsc.cmd -p .';

    exec(command, function (err, stdout, stderr) 
    {
        console.log(stdout);
        console.log(stderr);
        if (err) console.log(err.message);
    });
});

gulp.task('build', () => { runSequence('clean', 'tsc'); });