module.exports = app => {
    const questions = require("../controllers/questions.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", questions.findAll);
    router.get("/:id", questions.findOne);
    router.post("/", questions.create);
    router.delete("/:id", questions.delete);
    router.delete("/training/:IDTraining", questions.deleteAll);
    router.put("/:id", questions.update);

    app.use('/api/questions', router);
    
    
  };