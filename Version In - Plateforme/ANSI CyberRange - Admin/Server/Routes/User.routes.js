module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    router.post("/", users.create);
    router.delete("/:id", users.delete);
    router.delete("/", users.deleteALL);
    router.post("/authenticate/mail", users.findOneByMail);
    router.get("/stat/stat", users.findnombre);

    app.use('/api/users', router);
    
    
  };