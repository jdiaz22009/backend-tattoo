module.exports = {
    db: {
        database: process.env.DB_NAME || 'plumber',
        username: process.env.DB_USER || '',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        db: 'mongodb://localhost/plumber_auth',
    },
    server: {
        port: process.env.AUTHPORT || 3001,
        env: process.env.ENVIROMENT || 'dev'
    },
}