const Notif = require("../Models/Notif.model.js");

  // Retrieve all Cours from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    Notif.getAllNotif(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Notif."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Cours by the id:
 exports.findOne = (req, res) => {
    Notif.getNotifbyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Notif with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Notif with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };


  exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Tutorial
    const notif = new Notif({
      //IDNotif: req.body.IDNotif,
      Contenu: req.body.Contenu,
      Statut: req.body.Statut,
      DateNotif: req.body.DateNotif
    });
    // Save Tutorial in the database
    Notif.create(notif, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Notif."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Notif.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Notif with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Notif with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Notif was deleted successfully!` });
    });
  };

  exports.deleteALL = (req, res) => {
    Notif.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all notifs."
        });
      else res.status(200).send({ message: `All notifs were deleted successfully!` });
    });
  };
  