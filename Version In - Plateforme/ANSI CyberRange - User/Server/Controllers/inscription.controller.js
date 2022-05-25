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
  exports.findNombre = (req, res) => {
    Inscription.getNCoursInscritParUser(req.params.id, (err, data) => {
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
      }       else res.status(201).send(data.recordset[0]);

    });
  };
  exports.findbest = (req, res) => {
    Inscription.best(req.params.IdUser, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with NAME .`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cours with NAME " 
          });
        }
      }       else res.status(201).send(data.recordset[0]);

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
    const inscription = new Inscription({
      IdUser: req.body.IdUser,
      IdCours: req.body.IdCours,
      Date: req.body.Date,
      Score: req.body.Score,
      NomTraining: req.body.NomTraining

    });
    // Save Tutorial in the database
    Inscription.create(inscription, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Inscription."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Inscription.remove(req.params.IdUser,req.params.IdCours, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inscription with id ${req.params.IdCours}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Inscription with id " + req.params.IdCours
          });
        }
      } else res.status(201).send({ message: `Inscription was deleted successfully!` });
    });
  };
  
  exports.deleteALL = (req, res) => {
    Inscription.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all inscrits."
        });
      else res.status(200).send({ message: `All inscrits were deleted successfully!` });
    });
  };


  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Inscription.updateById(
      req.params.id,
      req.params.idc,
      new Inscription(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Inscription with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };