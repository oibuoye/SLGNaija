const config = require('config');

module.exports = function(){    
if (!config.get('db')) {
    console.log('Fatal error! db is not defined');
    process.exit();
  }

}