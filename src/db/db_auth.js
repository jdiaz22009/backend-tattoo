module.exports = {
    db: {
        database: process.env.DB_NAME || 'auth',
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || '',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        db: process.env.DBAUTHMONGO || 'mongodb+srv://admin:d3v3l0p3r@cluster0-dfj8d.mongodb.net/tatto-auth?retryWrites=true&w=majority',
    },
    server: {
        port: process.env.PORT || 3001,
        env: process.env.ENVIROMENT || 'dev'
    },
}