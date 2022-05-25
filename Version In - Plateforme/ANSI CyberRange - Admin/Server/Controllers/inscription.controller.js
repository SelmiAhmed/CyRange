const Inscription = require("../Models/Inscription.model.js");

  // Retrieve all users from the database (with condition).
exports.findAll =  (req, res) => {
    const id = req.query.id;
    Inscription.getCoursInscrit(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Inscription."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Inscription by the id:
 exports.findOne = (req, res) => {
    Inscription.getCoursInscritParUser(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inscription with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Inscription with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };
  

  
  exports.delete = (req, res) => {
    Inscription.removeuser(req.params.IdUser, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inscription with id ${req.params.IdUser}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Inscription with id " + req.params.IdUser
          });
        }
      } else res.status(201).send({ message: `Inscription was deleted successfully!` });
    });
  };

  exports.delete2 = (req, res) => {
    Inscription.removetrain(req.params.IdTraining, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inscription with id ${req.params.IdTraining}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Inscription with id " + req.params.IdTraining
          });
        }
      } else res.status(201).send({ message: `Inscription was deleted successfully!` });
    });
  };
