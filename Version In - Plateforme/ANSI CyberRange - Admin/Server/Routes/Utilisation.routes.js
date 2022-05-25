module.exports = app => {
    const Utilisation = require("../controllers/Utilisation.controller.js");
    var router = require("express").Router();
    router.get("/", Utilisation.findAll);
    router.get("/:id", Utilisation.findOne);
    router.post("/", Utilisation.create);
    router.delete("/:IdCours/:IdRes", Utilisation.delete);
    router.delete("/:IdCours", Utilisation.deleteAll);

    app.use('/api/utilisation', router);
    
    
  };