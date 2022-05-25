module.exports = app => {
    const ressources = require("../controllers/ressources.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", ressources.findAll);
    router.get("/:id", ressources.findOne);
    router.post("/", ressources.create);
    router.delete("/:id", ressources.delete);
    router.delete("/", ressources.deleteALL);
    router.put("/:id", ressources.update);
    router.get("/stat/stat", ressources.findnombre);

    app.use('/api/ressources', router);
    
    
  };