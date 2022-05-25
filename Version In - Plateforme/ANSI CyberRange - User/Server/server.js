// server.js
/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const dbops = require('./DBOps');
/*app.use(bodyParser.urlencoded({ extended: false }));

// Set up home route
app.get('/', (req, res) => {
  res.send('This is the homepage');
});

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
dbops.getUsers().then(res => {
    console.log(res);
})*/

/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = { 
        server: 'DESKTOP-OLSE3HJ\\MSSQLSERVER01',  //update me
        database: 'Test'        /*authentication: {
            type: 'default',
            options: {
                userName: 'your_username', //update me
                password: 'your_password'  //update me
            }
        },
     
        }

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Users;', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});



*/





const express = require("express");
const cors = require("cors");
const dbops = require('./DBOps');
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./routes/User.routes.js")(app);
// Retrieve all Tutorials
require("./routes/Cours.routes.js")(app);
require("./routes/Inscription.routes.js")(app);
require("./routes/Notif.routes.js")(app);
require("./Routes/Questions.routes.js")(app);
require("./Routes/Files.routes.js")(app);

  // set port, listen for requests
 const PORT = process.env.PORT || 8080;
//const PORT = 3001;

var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*
// server.js
const csrfProtection = csrf({
  cookie: true
});
app.use(csrfProtection);
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
// App.js
useEffect(() => {
  const getCsrfToken = async () => {
    const { data } = await axios.get('/csrf-token');
    axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
   };
  getCsrfToken();
}, []);
npm i csurf
*/

