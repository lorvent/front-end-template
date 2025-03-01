const path = require('path')
const { Transform } = require('stream')

const { sass } = require('@mr-hope/gulp-sass')
const CleanCSS = require('clean-css')
const csso = require('csso')
const { dest, src, watch } = require('gulp')
const gulpPostcss = require('gulp-postcss')
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpStylelint = require('gulp-stylelint')

const config = require('../../config')
const common = require('../common')
const ignore = require('../utils/ignore')
const pipeIf = require('../utils/pipe-if')

const srcPaths = path.posix.join(config.get('srcDir'), 'scss/**/*.scss')
const isDev = config.get('mode') !== 'production'
const cleanCss = new CleanCSS({
  level: 2,
})

function styles() {
  return src(srcPaths, {
    base: config.get('srcDir'),
  })
    .pipe(ignore())
    .pipe(
      gulpStylelint({
        reporters: [
          {
            formatter: 'string',
            console: true,
          },
        ],
      })
    )
    .pipe(pipeIf(isDev, gulpSourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpPostcss())
    .pipe(
      pipeIf(
        !isDev,
        new Transform({
          objectMode: true,
          transform(file, encoding, cb2) {
            const result = csso.minify(file.contents.toString(), {
              forceMediaMerge: true,
            })

            // eslint-disable-next-line no-param-reassign
            file.contents = Buffer.from(result.css)

            cb2(null, file)
          },
        })
      )
    )
    .pipe(
      pipeIf(
        !isDev,
        new Transform({
          objectMode: true,
          transform(file, encoding, cb2) {
            const result = cleanCss.minify(file.contents.toString())

            // eslint-disable-next-line no-param-reassign
            file.contents = Buffer.from(result.styles)

            cb2(null, file)
          },
        })
      )
    )
    .pipe(
      pipeIf(
        isDev,
        gulpSourcemaps.write({
          sourceRoot: `/${config.get('srcDir')}`,
        })
      )
    )
    .pipe(dest(path.join(config.get('distDir'), config.get('publicPath'))))
    .pipe(common.server.stream())
}

if (config.get('watch')) {
  watch(srcPaths, styles)
}

module.exports = styles
