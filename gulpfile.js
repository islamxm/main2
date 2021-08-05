let project_folder = "dist";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*"
    },
    clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp');
let gulp = require('gulp');   //Сам Gulp.js
let browsersync = require('browser-sync').create();         // Плагин для автоматического обновления
const fileinclude = require('gulp-file-include');           // Плагин для шаблонизации html и js
let del = require('del');                                   // Плагин для удаления лищних файлов
let scss = require('gulp-sass')(require('sass'));           // Компиляция SASS/SCSS
let autoprefixer = require('gulp-autoprefixer');            // Вендорные префиксы
let group_media = require('gulp-group-css-media-queries');  // Группировщик медиа выражений
let clean_css = require('gulp-clean-css');                  // Clean
let rename = require('gulp-rename');                        // Переименование файлов на ходу
let uglify = require('gulp-uglify-es').default;             // Сжатие JS файлов
const imagemin = require('gulp-imagemin');                  // Для сжатия картинок
let sprite = require('gulp-svg-sprite');                    // Для создания спрайта из svg 
// const svgSprite = require('gulp-svg-sprite');




function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false 
    });
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                browsers: ["last 25 versions"],
                cascade: true,
                flexbox: true,
                
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        // .pipe(uglify())
        .pipe(
            rename({
                extname: ".js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}


function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {
                    removeViewBox: true
                }
            ]
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream());
}

gulp.task('svgSprite', function() {
    return gulp.src([source_folder + '/img/*.svg'])
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../icons/icons.svg",  //sprite filename
                        example: true
                    }
                },
            })
        )
        .pipe(dest(path.build.img))
})

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.fonts], fonts); 
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;