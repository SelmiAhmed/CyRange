module.exports = app => {
    const notif = require("../controllers/notif.controller.js");
    var router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", notif.findAll);
    router.get("/:id", notif.findOne);
    router.post("/", notif.create);
    router.delete("/:id", notif.delete);
    router.delete("/", notif.deleteALL);

    app.use('/api/notif', router);
    
    
  };