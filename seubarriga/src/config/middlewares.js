const bodyParser = require( 'body-parser' );
const app = require('../app');

module.exports = ( app ) => {
    app.use( bodyParser.json() );
};