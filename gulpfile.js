import path from "path";
import {fileURLToPath} from "url";
import gulp from "gulp";
import vinylPaths from "vinyl-paths";
import {deleteAsync as del} from "del";
import eslint from "gulp-eslint-new";
import gulpIf from "gulp-if";
import mocha from "gulp-mocha";
import mochaConfig from "./mocha.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

gulp.task("clean", function () {
    const directories = [".serverless/", ".webpack/", ".dynamodb/", "coverage/", ".nyc_output/", "build/"].map(directory => path.join(__dirname, directory));

    return gulp.src(directories, {allowEmpty: true})
        .pipe(vinylPaths(del));
});

function isFixed(file) {
    return file.eslint && file.eslint.fixed;
}

gulp.task("eslint", function () {
    return gulp.src(["**/*.js", "!node_modules/**"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failAfterError());
});

gulp.task("lint", gulp.parallel(["eslint"]));

gulp.task("test.unit", () => {
    const runMocha = mocha.default || mocha;

    return gulp.src("test/unit/**/*.js", {read: false})
        .pipe(runMocha(mochaConfig));
});

gulp.task("test.integration", () => {
    const runMocha = mocha.default || mocha;

    return gulp.src("test/integration/**/*.js", {read: false})
        .pipe(runMocha(mochaConfig));
});

gulp.task("test", gulp.parallel(["test.unit", "test.integration"]));
