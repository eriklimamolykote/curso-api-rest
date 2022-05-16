module.exports = ( app ) => {
    const findAll = ( req, res ) => {
        // app.db( 'users' ).select()
        app.services.user.findAll()
            .then( result => res.status( 200 ).json( result ) );
        
    };
    
    const create = async ( req, res ) => {
        // const result = await app.db( 'users' ).insert( req.body, '*' );
        const result = await app.services.user.save( req.body );
        res.status( 201 ).json( result[ 0 ] );
    };

    return { findAll, create };
};    