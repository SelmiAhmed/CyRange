const Question = require("../Models/Questions.model.js");

  // Retrieve all Question from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    Question.getAllQuestions(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Questions."
        });
      else res.status(201).send(data.recordset);
    });
  };
  //Find a single Question by the id:
 exports.findOne = (req, res) => {
    Question.getQuestionsbyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Question with id " + req.params.id
          });
        }
      }       else res.status(201).send(data.recordset);

    });
  };

  exports.findOneQ = (req, res) => {
    Question.getQuestionbyID(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Question with id " + req.params.id
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
    const question = new Question({
      Contenu: req.body.Contenu,
      Reponse: req.body.Reponse,
      Options: req.body.Options,
      TypeQ: req.body.TypeQ,
      Hint: req.body.Hint,
      Score: req.body.Score,
      IDTraining: req.body.IDTraining
    });
    // Save Tutorial in the database
    Question.create(question, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Question."
        });
      else res.send(data.recordset);
    });
  };
  

  exports.delete = (req, res) => {
    Question.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Question with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Question was deleted successfully!` });
    });
  };

  exports.deleteALL = (req, res) => {
    Question.removeALL(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Question with id " + req.params.id
          });
        }
      } else res.status(201).send({ message: `Question was deleted successfully!` });
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
    Question.updateById(
      req.params.id,
      new Question(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Question with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Question with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  