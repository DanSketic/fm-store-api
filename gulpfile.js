const { series } = require('gulp')
const fs = require('fs')
const path = require('path')
const YAML = require('yaml')
const rimraf = require('rimraf')

const plugins = fs.readdirSync('./data')

let finalData = {
  fm: {
    devVersion: '2.6.12',
    betaVersion: '2.6.12',
    stableVersion: '0.0.0',
  },
  list: [],
}

exports.default = series(
  function convertYAML(done) {
    plugins.forEach((plugin) => {
      const manifestYAML = fs.readFileSync(path.join('data', plugin, 'manifest.yaml'), 'UTF-8')
      const manifestJSON = YAML.parse(manifestYAML)
      finalData.list.push(manifestJSON)
    })
    done()
  },
  function createDataFile(done) {
    if (fs.existsSync('dist')) rimraf.sync('dist')
    fs.mkdirSync('dist')
    fs.writeFileSync('dist/data.json', JSON.stringify(finalData))
    done()
  }
)
