const User = require("../Models/User.model.js");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../Routes/jwt");



  // Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    User.getAllUsers(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single USER by the id:
 exports.findOne = (req, res) => {
    User.getUserbyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };

  exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `User was deleted successfully!` });
    });
  };

  exports.deleteALL = (req, res) => {
    User.removeALL(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `User was deleted successfully!` });
    });
  };
  exports.findOneByMail = (req, res) => {
    const { Email, Password } = req.body;
    User.getUserbyMail(Email, (err, data) => {
     //  console.log(data.recordset[0].Password);
      if (err) {
          res.status(400).send({
                        message: `Not found User with username ${Email}.`,
                        error: "User Doesn't Exist" 

          });
        }    
      else if (data) {
        console.log(data.recordset[0].Password);
         const dbPassword = data.recordset[0].Password;
         // var match = false
         bcrypt.compare(Password, dbPassword).then((match) => {
           console.log(match);
          if (!match) {
                res
                .status(400)
                .json({ error: "Wrong Username and Password Combination!" });
            } 
            else {
              const accessToken = createTokens(data);
              console.log(accessToken);
              res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
              });
        
              res.json("LOGGED IN");
            }
      
        });
          //else res.status(201).send(data.recordset);
    }
    });
  };
  exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Tutorial
    const user = new User({
      ID: req.body.id,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: req.body.Password,
      Image: req.body.Image,
      Role: req.body.Role
    });
    // Save Tutorial in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.findnombre = (req, res) => {
    User.nombre( (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with NAME .`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with NAME " 
          });
        }
      }       else res.status(201).send(data.recordset[0]);

    });
  };