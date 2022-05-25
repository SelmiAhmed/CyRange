module.exports = app => {
    const cours = require("../controllers/cours.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", cours.findAll);
    router.get("/:id", cours.findOne);
    router.get("/name/:id", cours.findOneName);

    app.use('/api/cours', router);
    
    
  };