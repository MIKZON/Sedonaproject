"use strict";

var
    gulp = require("gulp"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    minify = require("gulp-csso"),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    run = require("run-sequence"),
    posthtml = require("gulp-posthtml"),
    server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img/min"));
});

gulp.task("compress", function () {
    return gulp.src("source/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(posthtml())
        .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**/*.{js,min.js}"
    ], {
      base: "source"
    })
        .pipe(gulp.dest("build"))
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("build", function (done) {
    run(
        "clean",
        "copy",
        "compress",
        "style",
        "html",
        done
    );
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
});
