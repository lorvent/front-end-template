import Fiber from 'fibers'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import sass from 'sass'
import upath from 'upath'

import common from '../common'
import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = process.env.NODE_ENV !== 'production'

$.sass.compiler = sass

export default function styles() {
  return gulp
    .src(config.get('srcPaths.styles'), {
      base: config.get('srcDir')
    })
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.postcss())
    .pipe(
      $.sass({
        fiber: Fiber
      })
    )
    .pipe(
      $.if(
        isDev,
        $.sourcemaps.write({
          sourceRoot: `/${config.get('srcDir')}`
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.csso({
          forceMediaMerge: true
        })
      )
    )
    .pipe(
      $.if(
        !isDev,
        $.cleanCss({
          level: 2,
          rebase: false
        })
      )
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(upath.join(config.get('distDir'), config.get('site.basePath')))
    )
    .pipe($.if(config.get('gzip') && !isDev, common.gzipChannel()))
    .pipe($.if(isDev, common.server.stream()))
}
