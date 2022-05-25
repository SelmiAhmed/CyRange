module.exports = app => {
    const questions = require("../controllers/questions.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", questions.findAll);
    router.get("/:id", questions.findOne);
    router.get("/train/:id", questions.findOneQ);

    router.post("/", questions.create);
    router.delete("/:id", questions.delete);
    router.delete("/", questions.deleteALL);
    router.put("/:id", questions.update);

    app.use('/api/questions', router);
    
    
  };