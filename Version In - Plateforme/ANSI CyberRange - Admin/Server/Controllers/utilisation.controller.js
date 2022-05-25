const Utilisation = require("../Models/Utilisation.model.js");

  // Retrieve all users from the database (with condition).
exports.findAll =  (req, res) => {
    const id = req.query.id;
    Utilisation.getResUtilise(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Utilisation."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Utilisation by the id:
 exports.findOne = (req, res) => {
    Utilisation.getMachineUseParCours(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Utilisation with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Utilisation with id " + req.params.id
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
    const utilisation = new Utilisation({
      IdCours: req.body.IdCours,
      IdRes: req.body.IdRes,
      DateUtil: req.body.DateUtil,
      Performance: req.body.Performance
    });
    // Save Tutorial in the database
    Utilisation.create(utilisation, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Utilisation."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Utilisation.remove(req.params.IdCours,req.params.IdRes, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Utilisation with id ${req.params.IdRes}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Utilisation with id " + req.params.IdRes
          });
        }
      } else res.status(201).send({ message: `Utilisation was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    Utilisation.removeAll(req.params.IdCours, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Utilisation with id ${req.params.IdCours}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Utilisation with id " + req.params.IdCours
          });
        }
      } 
      else res.status(201).send({ message: `Utilisation was deleted successfully!` });
    });
  };
  

