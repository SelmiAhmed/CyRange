module.exports = app => {
  require('dotenv').config()
  const bcrypt = require("bcrypt");
  const cookieParser = require("cookie-parser");
  const { createTokens, validateToken } = require("./jwt");
  
  app.use(cookieParser());
    const users = require("../controllers/user.controller.js");
    const User = require("../Models/User.model.js");

    var router = require("express").Router();
    const tokenVerifier = require('./token-verifier')//token verifier file
    const bouncer = require('jsonwebtoken')
 
    // Retrieve all Tutorials
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.get("/user/:mail", users.findUserbyMail);

    router.post("/", users.create);
    router.delete("/:id", users.delete);
    router.put("/:id", users.update);
    router.post("/authenticate", users.findOneByName);
    router.post("/authenticate/mail", users.findOneByMail);

   
    
    router.post("/register", (req, res) => {
      const { Username, Email, Password } = req.body;
      bcrypt.hash(Password, 10).then((hash) => {
        User.create({
          Username: Username,
          Email: Email,
          Password: hash,
        },)
          .then((err,data) => {
            if (err) {
              res.status(400).json({ error: err });
            }

           else res.send(data);
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({ error: err });
            }
          });
      });
    });
    
    router.post("/login", async (req, res) => {
      const { Username, Password } = req.body;
    
      const user = await users.findOneByName();/* ,(err,data)=>{
       if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with username ${req.body.Username}.`
            });
          } }
        else {
  
        res.status(201).send(data.recordset);}
      });
     
     if (!user) {
      res.status(201).send(user.recordset);
      res.status(400).json({  error: "User Doesn't Exist" });
      }*/
    const dbPassword = user.Password;
    bcrypt.compare(Password, dbPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username and Password Combination!" });
      } else {
        const accessToken = createTokens(user);
  
        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
          secure: true

        });
  
        res.json("LOGGED IN");
      }
    });

    });
    router.get("/profile", validateToken, (req, res) => {
      res.json("LOGGED IN","profile");
    });
    
    app.use('/api/users',router);
    
    
  };