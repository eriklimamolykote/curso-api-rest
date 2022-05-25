module.exports = {
    test: {
        client: 'pg',
        version: '12.10',
        connection: {
            host: 'localhost',
            user: 'erik',
            password: 'callus',
            database: 'barriga',
        },
        migrations: { directory: 'src/migrations' },
        seeds: { directory: 'src/seeds' },
    },
    prod: {
        client: 'pg',
        version: '12.10',
        connection: {
            host: 'localhost',
            user: 'erik',
            password: 'callus',
            database: 'seubarriga',
        },
        migrations: { directory: 'src/migrations' },
    },
};
