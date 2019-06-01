module.exports = {
  db: {
    database: process.env.DB_NAME || 'auth',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    db: 'mongodb://localhost/tatto-guides',
},
server: {
    port: process.env.GUIDESPORT || 3002,
    env: process.env.ENVIROMENT || 'dev'
},
}