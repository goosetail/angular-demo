var express = require( 'express' );
var router = express.Router();

require( './app' )( router );
require( './templates' )( router );

module.exports = router;