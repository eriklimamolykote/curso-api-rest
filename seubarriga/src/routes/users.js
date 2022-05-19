const express = require( 'express' );

module.exports = ( app ) => {
    const router = express.Router();

    // const findAll = ( req, res, next ) => {
    //     // app.db( 'users' ).select()
    //     app.services.user.findAll()
    //         .then( result => res.status( 200 ).json( result ) ) 
    //             // console.log( 'dentro do método' );
    //             // next();
    //         .catch( err => next( err ) );       
    // };

    router.get( '/', ( req, res, next ) => {
        app.services.user.findAll()
            .then( result => res.status( 200 ).json( result ) ) 
            .catch( err => next( err ) );       
    });
    
    // const create = async ( req, res, next ) => {
    //     try {
    //         const result = await app.services.user.save( req.body );
    //         return res.status( 201 ).json( result[ 0 ] );
    //     } catch ( err ) {
    //         // return res.status( 400 ).json( { error: err.message } );
    //         return next( err );

    //     }
    //     // const result = await app.db( 'users' ).insert( req.body, '*' );
    // };

    router.post( '/', async ( req, res, next ) => {
        try {
            const result = await app.services.user.save( req.body );
            return res.status( 201 ).json( result[ 0 ] );
        } catch ( err ) {
            return next( err );

        }
    });

    // return { findAll, create };
    return router;
};    