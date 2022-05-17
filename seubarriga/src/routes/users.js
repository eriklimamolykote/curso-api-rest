module.exports = ( app ) => {
    const findAll = ( req, res, next ) => {
        // app.db( 'users' ).select()
        app.services.user.findAll()
            .then( result => res.status( 200 ).json( result ) ) 
                // console.log( 'dentro do método' );
                // next();
            .catch( err => next( err ) );       
    };
    
    const create = async ( req, res, next ) => {
        try {
            const result = await app.services.user.save( req.body );
            return res.status( 201 ).json( result[ 0 ] );
        } catch ( err ) {
            // return res.status( 400 ).json( { error: err.message } );
            return next( err );

        }
        // const result = await app.db( 'users' ).insert( req.body, '*' );
    };

    return { findAll, create };
};    