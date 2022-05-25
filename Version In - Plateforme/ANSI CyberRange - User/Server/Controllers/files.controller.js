const File = require("../Models/Files.model.js");

  // Retrieve all Cours from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    File.getAllFiles(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cours."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Cours by the id:
 exports.findOne = (req, res) => {
    File.getFilebyIDTraining(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found File with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving File with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };
  exports.findOnebyName = (req, res) => {
    File.getFilebyName(req.params.Name, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found File with NAME ${req.params.Name}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving File with NAME " + req.params.Name
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
    const file = new File({
      //IDCours: req.body.IDCours,
      Name: req.body.Name,
      Size: req.body.Size,
      Path: req.body.Path,
      IDTraining: req.body.IDTraining
    });
    // Save Tutorial in the database
    File.create(file, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the File."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    File.remove(req.params.idtraining, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found file with id ${req.params.idtraining}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete file with id " + req.params.idtraining
          });
        }
      } else res.status(201).send({ message: `file was deleted successfully!` });
    });
  };

