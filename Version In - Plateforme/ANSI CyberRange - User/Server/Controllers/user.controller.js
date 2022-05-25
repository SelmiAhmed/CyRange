const User = require("../Models/User.model.js");
require('dotenv').config()
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../Routes/jwt");

  // Retrieve all users from the database (with condition).
exports.findAll =  (req, res) => {
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
            message: "Error retrieving USER with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };
  exports.findUserbyMail = (req, res) => {
    User.getUserbyMail(req.params.mail, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with mail ${req.params.mail}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving USER with mail " + req.params.mail
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };

  exports.findOneByName = (req, res) => {
    const { Username, Password } = req.body;
    User.getUserbyName(Username, (err, data) => {
       console.log(data.recordset[0].Password);
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
                        message: `Not found User with username ${Username}.`,
                        error: "User Doesn't Exist" 

          });
        }     }
        else {
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





  exports.findOneByMail = (req, res) => {
    const { Email, Password } = req.body;
    User.getUserbyMail(Email, (err, data) => {
       //console.log(data.recordset[0].Password);
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
                        message: `Not found User with username ${Email}.`,
                        error: "User Doesn't Exist" 

          });
        }     }
        else {
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
        
              res.json("Authorized Login. Your Token is: "+accessToken);
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
    // Create a USER
    const { Username, Email, Password } = req.body;

    bcrypt.hash(Password, 10).then((hash) => {

    const user = new User({
      Username: Username,
      Email: Email,
      Password: hash,
     // Image: req.body.Image,
     // Role: req.body.Role
    });
    // Save USER in the database
    User.create(user, (err, data) => {
      if (err)
        res.send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data.recordset);
    });})
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
      } else res.status(200).send({ message: `User was deleted successfully!` });
    });
  };
  

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    User.updateById(
      req.params.id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  

  exports.create2 =  (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (_.isUndefined(username) || _.isUndefined(password)) {
    return throwFailed(res, 'Authentication failed. User not found.');
    }
    User
    .findOne({
    where: {username: username},
    })
    .then(function (user) {
    if (!user) {
    return throwFailed(res, 'Authentication failed. User not found.');
    }
    bcrypt.compare(password, user.password, function (errBcrypt, resBcrypt) {
    if (!resBcrypt) {
    return throwFailed(res, 'Authentication failed. Wrong password.');
    }
    bouncer.reset(req);
    return res.json({
    token: generateToken(username, user.id),
    });
    });
    });
    };











