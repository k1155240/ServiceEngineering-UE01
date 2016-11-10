var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./src/app/main.jsx",
        debug: true
    }).transform(babelify, {presets: ["react"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("build/app"))
});

gulp.task("copyserver", function () {
    return gulp.src(["src/server/server.js", "src/server/mongo.js"])
        .pipe(gulp.dest("build/server"));
});

gulp.task("copyclient", ["bundle"], function () {
    return gulp.src(["src/app/index.html","src/app/lib/bootstrap-css/css/bootstrap.min.css", "src/app/lib/bootstrap-css/js/bootstrap.min.js","src/app/style.css"])
        .pipe(gulp.dest("build/app"));
});

gulp.task("copyfonts", function () {
    return gulp.src(["src/app/lib/bootstrap-css/fonts/*"]).pipe(gulp.dest("build/app/fonts"));
});


gulp.task("update",["copyclient", "copyserver"],function(){
   console.log("Update completed..."); 
});

gulp.task("updateClient",["copyclient"],function(){
   console.log("Update completed..."); 
});

gulp.task("updateServer",["copyserver"],function(){
   console.log("Update completed..."); 
});

gulp.task("watch", function(){
   gulp.watch(['src/app/**/*.jsx', 'src/app/style.css', 'src/app/index.html'], ['updateClient']);
   gulp.watch(['src/server/server.js', 'src/server/mongo.js'], ['updateServer']);
});

gulp.task("default",["copyserver", "copyclient", "copyfonts"],function(){
   console.log("Gulp completed..."); 
});
