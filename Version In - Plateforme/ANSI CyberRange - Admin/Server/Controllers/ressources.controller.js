const Ressource = require("../Models/Ressources.model.js");

  // Retrieve all Ressource from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    Ressource.getAllRessource(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Ressource."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Ressource by the id:
 exports.findOne = (req, res) => {
    Ressource.getRessourcebyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ressource with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Ressource with id " + req.params.id
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
    const ressource = new Ressource({
      IDRes: req.body.IDRes,
      NomRes: req.body.NomRes,
      Description: req.body.Description,
      OS: req.body.OS,
      Size: req.body.Size
    });
    // Save Tutorial in the database
    Ressource.create(ressource, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Ressource."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Ressource.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ressource with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Ressource with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Ressource was deleted successfully!` });
    });
  };

  exports.deleteALL = (req, res) => {
    Ressource.removeALL(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ressource with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Ressource with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Ressource was deleted successfully!` });
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
    Ressource.updateById(
      req.params.id,
      new Ressource(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Ressource with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Ressource with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.findnombre = (req, res) => {
    Ressource.nombre( (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ressource with NAME .`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Ressource with NAME " 
          });
        }
      }       else res.status(201).send(data.recordset[0]);

    });
  };