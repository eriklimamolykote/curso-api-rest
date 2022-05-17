// const bodyParser = require( 'body-parser' );
// app.use( bodyParser.json() );

const app = require( 'express' )();
const consign = require( 'consign' );
const knex = require( 'knex' );
const knexfile = require( '../knexfile' );
// const knexLogger = require( 'knex-logger' );

// TODO criar chaveamento dinâmico
app.db = knex( knexfile.test );

// app.get( '/users', ( req, res, next ) => {
//     // res.status( 200 ).send( 'Crackeado por Molykote!' );
//     console.log( 'Passei aqui' );
//     next();
// });

// app.use( knexLogger( app.db ) );

consign( { cwd: 'src', verbose: false } )
    .include( './config/middlewares.js' )
    .then( './services' )
    .then( './routes' )
    .then( './config/routes.js' )
    .into( app );

app.get( '/', ( req, res ) => {
    res.status( 200 ).send();
});

// app.use( ( req, res ) => {
//     // console.log( 'e aqui tb' );
//     res.status( 404 ).send( 'Não conheço essa requisição' );
// });

// app.db.on( 'query', ( query ) => {
//     console.log( { sql: query.sql, bindings: query.bindings ? query.bindings.join( ',' ) : '' } );
// }).on( 'query-response', response => console.log( response ) )
//     .on( 'error', error => console.log( error ) );

app.use( ( err, req, res, next ) => {
    const { name, message, stack } = err;

    if ( name === 'ValidationError' ) res.status( 400 ).json( { error: message } );
    else res.status( 500 ).json( { name, message, stack } );
    next( err );
});

module.exports = app;
