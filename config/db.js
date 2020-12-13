const sql = require('mssql');
const config = require('config');



module.exports = () => {
    const dbConfig = {
        user:config.get('DBuser'),
        password:config.get('DBpassword'),
        server:config.get('DBserver'),
        database:config.get('DBdatabase')
    }
    
    
    sql.connect(dbConfig)
    .then(pool => {
        if(pool.connecting){
            console.log('db connecting')
        }
        if(pool.connected){
            console.log('db is connected');
        }

        return pool;
    }).catch((err) => {
        console.log('faild to open the connection to the database....');
    })
}
