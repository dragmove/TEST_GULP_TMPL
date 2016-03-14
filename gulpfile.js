var gulp = require('gulp'),
	// connect = require('gulp-connect'),
	// jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	// uglify = require('gulp-uglify'),
	// watch = require('gulp-watch'),
	rename = require('gulp-rename'),

	dateFormat = require('dateformat'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),


	template  = require('gulp-template-compile'),
	path = require('gulp-path'),

	insert = require('gulp-insert');



gulp.task('connect', function() {
	plugins.connect.server({
		root: './',
		port: 8080,
		livereload: false
	});
});

gulp.task('lint', function() {
	return gulp.src('js/src/**/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('concat', function() {
	return gulp.src(['js/src/util.js', 'js/src/object.js'])
		.pipe(plugins.concat('BUILD_FILE_NAME.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('custom-backup', function() {
	var date = new Date(),
		prefix = dateFormat(date, 'yyyymmdd-HH-MM'),
		dir = 'backup/' + dateFormat(date, 'yyyy') + '/' + dateFormat(date, 'mmdd');
	
	return gulp.src('build/BUILD_FILE_NAME.js')
		.pipe( plugins.rename({prefix: prefix + '_'}) )
		.pipe( gulp.dest(dir) );
});

gulp.task('uglify', function() {
	return gulp.src('build/*')
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('build'));
});

/*
 * use tasks
 */
gulp.task('watch', function() {
	gulp.watch(['js/**/*.js'], ['lint']);
});

gulp.task('build', plugins.sequence('lint', 'concat', 'custom-backup', 'uglify') );


/*
 * test tasks
 */
gulp.task('tmpl', function() {
	gulp.src('template/**/*.tmpl.html')
		.pipe( concat('tmpl.js') )
		.pipe( insert.prepend( '(function(){\n    if(!window.nc) window.nc = {};\n    if(!nc.PROJECT_NAME) nc.PROJECT_NAME = {};\n' ) )
		.pipe( insert.append( '\n    nc.PROJECT_NAME.tmpl = tmpl;\n}());\n' ) )
		.pipe( gulp.dest('js/template') );
	
		//.pipe(plugins.insert.prepend('ohohoh'));
});

gulp.task('templates', function() {
	return gulp.src('template/**/*.html')
      .pipe( template() )
      .pipe( concat('tmpl.js') )
      .pipe(gulp.dest('js/template/')); //Output folder
});