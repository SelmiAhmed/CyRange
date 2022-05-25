const config = { 
    server: 'DESKTOP-OLSE3HJ\\SQLEXPRESS',  //update me
    database: 'CyberRangeDB', 
    driver:'msnodesqlv8',
    port:1433,
    /*authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //update me
            password: 'your_password'  //update me
        }
    },*/
    options: {
        // If you are on Microsoft Azure, you need encryption:
       // encrypt: true,
       // database: 'your_database'  //update me

       trustedConnection:true,
       trustedServerCertificate:true,
    }
}
module.exports=config;