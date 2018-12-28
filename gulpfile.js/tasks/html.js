import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import upath from 'upath'

import * as utils from '../utils'
import common from '../common'
import config from '../../config'

const $ = gulpLoadPlugins()
const isDev = common.env === 'development'

export default function html () {
  return gulp
    .src(common.srcPaths.html, {
      base: upath.join(config.srcDir, config.dir.pages)
    })
    .pipe($.if(isDev, $.plumber({
      errorHandler: $.notify.onError()
    })))
    .pipe($.filter(upath.join('**', `!(_)*${common.ext.html}`)))
    .pipe($.ejs(null, {
      root: upath.join(config.srcDir, config.dir.pages)
    }, {
      ext: '.html'
    }))
    .pipe($.htmlhint('.htmlhintrc'))
    .pipe($.htmlhint.reporter())
    .pipe($.htmlhint.failOnError({
      suppress: true
    }))
    .pipe($.if(!isDev, $.htmlmin({
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    })))
    .pipe(utils.detectConflict())
    .pipe(gulp.dest(upath.join(config.distDir, config.basePath)))
    .pipe($.if(config.gzip && !isDev, $.gzip()))
    .pipe($.if(config.gzip && !isDev, utils.detectConflict()))
    .pipe($.if(config.gzip && !isDev, gulp.dest(upath.join(config.distDir, config.basePath))))
    .pipe(common.server.stream())
}