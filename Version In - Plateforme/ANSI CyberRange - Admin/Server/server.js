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
  origin: "http://localhost:3001"
 // origin: "http://localhost:3000"

};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ANSI CyberRange." });
});
require("./routes/User.routes.js")(app);
require("./routes/Cours.routes.js")(app);
require("./routes/Inscription.routes.js")(app);
require("./routes/Notif.routes.js")(app);
require("./routes/Ressources.routes.js")(app);
require("./Routes/Utilisation.routes.js")(app);
require("./Routes/Questions.routes.js")(app);
require("./Routes/Files.routes.js")(app);
var sanitize = require("sanitize-filename");

const multer = require('multer');
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public')
  },
  filename: (req, file, cb) => {
    var filename = file.originalname;

      cb(null, Date.now() + '-' + filename)
  }

})

;


const upload = multer({storage,  limits: {
  fileSize: 100000000000 // max file size 1MB = 1000000 bytes
},
fileFilter(req, file, cb) {
  var filename = file.originalname;

  if (!filename.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|iso|ova)$/)) {
    return cb(
      new Error(
        'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
      )
    );
  }
  cb(undefined, true); // continue with upload
}}).array('file');


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
        console.log("only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format");
          return res.status(500).json(err)
      }

      return res.status(200).send(req.files)
  })
});

// Retrieve all Tutorials

  // set port, listen for requests
const PORT = process.env.PORT || 8081;
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
