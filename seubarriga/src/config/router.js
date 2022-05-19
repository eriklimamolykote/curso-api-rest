const express = require( 'express' );

module.exports = ( app ) => {
    app.use( '/auth', app.routes.auth  );
    const protectedRouter = express.Router();

    // app.use( '/users', app.routes.users  );
    // app.use( '/users', app.config.passport.authenticate(), app.routes.users );
    protectedRouter.use( '/users', app.routes.users );
    // app.use( '/accounts', app.routes.accounts  );
    // app.use( '/accounts', app.config.passport.authenticate(), app.routes.accounts );
    protectedRouter.use( '/accounts', app.routes.accounts );
    protectedRouter.use( '/transactions', app.routes.transactions );

    app.use( '/v1', app.config.passport.authenticate(), protectedRouter );

    app.get( '/v2/users', ( req, res ) => res.status( 200 ). send( 'V2 no ar' ) );
    app.use( '/v2', protectedRouter );
};