const storeData = require('../dist/data.json')
const packageJSON = require('../package.json')

exports.apiVersion = () => {
  return {
    apiVersion: packageJSON.version,
    fm: storeData.fm,
  }
}
