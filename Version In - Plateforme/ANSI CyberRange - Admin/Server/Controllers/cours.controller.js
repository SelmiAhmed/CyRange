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
  exports.findOnebyName = (req, res) => {
    Cours.getCoursbyName(req.params.NomCours, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with NAME ${req.params.NomCours}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Cours with NAME " + req.params.NomCours
          });
        }
      }       else res.status(201).send(data.recordset[0]);
    });
  };





  exports.findnombre = (req, res) => {
    Cours.nombre( (err, data) => {
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
  exports.findnombretype = (req, res) => {
    Cours.nombretype( (err, data) => {
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
      }       
      else res.status(201).send(data.recordset[0]);

    });
  };


  exports.findnombretype2 = (req, res) => {
    Cours.nombretype2( (err, data) => {
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
      }       
      else res.status(201).send(data.recordset[0]);

    });
  };
  exports.findnombretype3 = (req, res) => {
    Cours.nombretype3( (err, data) => {
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
      }       
      else res.status(201).send(data.recordset[0]);

    });
  };
  exports.findlastid = (req, res) => {
    Cours.lastid( (err, data) => {
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
    const cours = new Cours({
      //IDCours: req.body.IDCours,
      NomCours: req.body.NomCours,
      Description: req.body.Description,
      Image: req.body.Image,
      Categorie: req.body.Categorie,
      Type: req.body.Type,
      Temps: req.body.Temps,
      NbQuestions: req.body.NbQuestions,
      NbUsers: req.body.NbUsers
    });
    // Save Tutorial in the database
    Cours.create(cours, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cours."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Cours.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Cours with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Cours was deleted successfully!` });
    });
  };

  exports.deleteALL = (req, res) => {
    Cours.removeALL(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cours with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Cours with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Cours was deleted successfully!` });
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
    Cours.updateById(
      req.params.id,
      new Cours(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cours with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Cours with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  