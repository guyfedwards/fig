const fs = require('fs')
const os = require('os')
const path = require('path')
const xdgBasedir = require('xdg-basedir')

const configDir = path.join(xdgBasedir.config || os.homeDir(), 'fig')

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir)
}

module.exports = {
  configDir: process.env.FIG_CONFIG_DIR || configDir
}
