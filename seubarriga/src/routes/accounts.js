const res = require("express/lib/response");
const express = require( 'express' );

const RecursoIndevidoError = require( '../errors/RecursoIndevidoError' )

module.exports = ( app ) => {
    const router = express.Router();

    router.param( 'id', ( req, res, next ) => {
        app.services.account.find( { id: req.params.id } )
            .then( ( acc ) => {
                if ( acc.user_id != req.user.id) throw new RecursoIndevidoError();
                else next();
            }).catch( err => next( err ) );
    });

    // const create = ( req, res, next ) => {
    //     app.services.account.save( req.body )
    //         .then( ( result ) => {
    //             // if ( result.error ) return res.status( 400 ).json( result );
    //             return res.status( 201 ).json( result[ 0 ] );
    //     }).catch( err => next( err ) );
    // };

    router.post( '/',  ( req, res, next ) => {
        app.services.account.save( { ...req.body, user_id: req.user.id } )
            .then( ( result ) => {
                // if ( result.error ) return res.status( 400 ).json( result );
                return res.status( 201 ).json( result[ 0 ] );
        }).catch( err => next( err ) );
    });

    // const getAll = ( req, res, next ) => {
    //     app.services.account.findAll()
    //         .then( result => res.status( 200 ).json( result ) )
    //         .catch( err => next( err ) );
    //             // next(); 
    // };

    router.get( '/', ( req, res, next ) => {
        // app.services.account.findAll()
        app.services.account.findAll( req.user.id )
            .then( result => res.status( 200 ).json( result ) )
            .catch( err => next( err ) );
                // next(); 
    });

    // const get = ( req, res, next ) => {
    //     // console.log( req.body );
    //     // console.log( req.params );
    //     // console.log( req.query );
    //     app.services.account.find( { id: req.params.id } )
    //         .then( result => res.status( 200 ).json( result ) )
    //         .catch( err => next( err ) );
    // };

    // router.get( '/:id',  ( req, res, next ) => {
    //     // console.log( req.body );
    //     // console.log( req.params );
    //     // console.log( req.query );
    //     app.services.account.find( { id: req.params.id } )
    //         // .then( result => res.status( 200 ).json( result ) )
    //         .then( ( result ) => {
    //             if ( result.user_id != req.user.id )
    //                 return res.status( 403 ).json( { error: 'Este recurso não pertence ao usuário' } );
    //             return res.status( 200 ).json( result )
    //         })
    //         .catch( err => next( err ) );
    // });

    router.get( '/:id',  ( req, res, next ) => {
        app.services.account.find( { id: req.params.id } )
            .then( result => res.status( 200 ).json( result ) )
            .catch( err => next( err ) );
    });

    // const update = ( req, res, next ) => {
    //     app.services.account.update( req.params.id, req.body )
    //         .then( result => res.status( 200 ).json( result[ 0 ] ) )
    //         .catch( err => next( err ) );
    // };

    router.put( '/:id',  ( req, res, next ) => {
        app.services.account.update( req.params.id, req.body )
            .then( result => res.status( 200 ).json( result[ 0 ] ) )
            .catch( err => next( err ) );
    });

    // const remove = ( req, res, next ) => {
    //     app.services.account.remove( req.params.id )
    //         .then( () => res.status( 204 ).send() )
    //         .catch( err => next( err ) );
    // };

    router.delete( '/:id', ( req, res, next ) => {
        app.services.account.remove( req.params.id )
            .then( () => res.status( 204 ).send() )
            .catch( err => next( err ) );
    });

    // return { 
    //     create, getAll, get, update, remove,
    // };

    return router;
};
