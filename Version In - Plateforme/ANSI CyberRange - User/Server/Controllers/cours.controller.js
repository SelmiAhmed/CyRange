const Cours = require("../Models/Cours.model.js");

  // Retrieve all Cours from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    Cours.getAllCours(id, (err, data) => {
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
    Cours.getCoursbyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cours with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };

  exports.findOneName = (req, res) => {
    Cours.getCoursNamebyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cours with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset[0]);

    });
  };