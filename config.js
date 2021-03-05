const config = require('./config-schema')

/**
 * For available configurations, see config-schema.js
 */
config.load({
  srcDir: 'src',
})

config.validate({
  allowed: 'strict',
})

module.exports = config
