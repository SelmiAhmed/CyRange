module.exports = app => {
    const inscription = require("../controllers/inscription.controller.js");
    var router = require("express").Router();
    router.get("/", inscription.findAll);
    router.get("/:id", inscription.findOne);
    router.delete("/user/:IdUser", inscription.delete);
    router.delete("/training/:IdTraining", inscription.delete2);

    app.use('/api/inscription', router);
    
    
  };