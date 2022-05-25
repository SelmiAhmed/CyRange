module.exports = app => {
    const inscription = require("../controllers/inscription.controller.js");
    var router = require("express").Router();
    router.get("/", inscription.findAll);
    router.get("/:id", inscription.findOne);
    router.get("/ins/:id", inscription.findNombre);
    router.get("/a/b/c/:IdUser", inscription.findbest);
    router.put("/:id/:idc", inscription.update);

    router.post("/", inscription.create);
    router.delete("/:IdUser/:IdCours", inscription.delete);
    router.delete("/", inscription.deleteALL);

    app.use('/api/inscription', router);
    
    
  };