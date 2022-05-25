module.exports = app => {
    const cours = require("../controllers/cours.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", cours.findAll);
    router.get("/:id", cours.findOne);
    router.get("/train/:NomCours", cours.findOnebyName);
    router.get("/stat/stat", cours.findnombre);
    router.get("/a/att", cours.findnombretype);
    router.get("/a/pen", cours.findnombretype2);
    router.get("/a/def", cours.findnombretype3);

    router.get("/stat/last", cours.findlastid);

    router.post("/", cours.create);
    router.delete("/:id", cours.delete);
    router.delete("/", cours.deleteALL);
    router.put("/:idtraining", cours.update);

    app.use('/api/cours', router);
    
    
  };