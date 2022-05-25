const config = require('./DBConfig')
var sql = require('mssql/msnodesqlv8');  

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query('SELECT * from Users');
        console.log(users);
        return users;
    }
    catch(error) {
        console.log(error);
    }
}
/*function get() {
var conn = new sql.connect();
var request = new sql.Request(conn);  
conn.connect(config,function(err){
    if(err){
        console.log(err);
    }
    request.query('select * from Users',function(err,recordSet){
        if(err){
            console.log(err);
        }
    
        else {
            console.log(recordSet);
        }
        conn.close();

})
});
    
    }*/
      module.exports = {
        getUsers
      }