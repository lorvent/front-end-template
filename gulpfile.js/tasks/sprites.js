import path from 'path'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'

import config from '../../config'
import detectConflict from '../utils/detectConflict'

const $ = gulpLoadPlugins()
const isDev = config.get('mode') !== 'production'

export default function sprites() {
  return gulp
    .src(config.get('srcPaths.sprites'), {
      base: config.get('srcDir')
    })
    .pipe(
      $.svgSprite({
        shape: {
          id: {
            generator(name) {
              const destRelativeName = path.relative(
                path.join(
                  config.get('dir.assets'),
                  config.get('dir.images'),
                  config.get('dir.sprites')
                ),
                name
              )
              const directorySeparatedName = destRelativeName
                .split(path.sep)
                .join(this.separator)

              return path.basename(
                directorySeparatedName.replace(/\s+/g, this.whitespace),
                config.get('ext.sprites')
              )
            }
          },
          transform: [
            !isDev && {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { removeUnknownsAndDefaults: false },
                  { removeUselessDefs: false },
                  { cleanupIDs: false }
                ]
              }
            }
          ].filter(Boolean)
        },
        mode: {
          symbol: {
            dest: path.join(config.get('dir.assets'), config.get('dir.images')),
            sprite: 'sprite.symbol.svg'
          }
        }
      })
    )
    .pipe(detectConflict())
    .pipe(
      gulp.dest(path.join(config.get('distDir'), config.get('site.basePath')))
    )
}
