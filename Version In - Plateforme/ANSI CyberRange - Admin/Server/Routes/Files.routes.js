module.exports = app => {
    const file = require("../controllers/files.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", file.findAll);
    router.get("/:id", file.findOne);
    router.get("/file/:Name", file.findOnebyName);

    router.post("/", file.create);
    router.delete("/:IDTraining", file.delete);

    app.use('/api/files', router);
    
    
  };