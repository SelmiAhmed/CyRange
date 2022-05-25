const Notif = require("../Models/Notif.model.js");

  // Retrieve all users from the database (with condition).
exports.findAll =  (req, res) => {
    const id = req.query.id;
    Notif.getAllNotifs(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Notifs."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single USER by the id:
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
  

  exports.deleteALL = (req, res) => {
    Notif.removeALL(req.params.id, (err, data) => {
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
  

  