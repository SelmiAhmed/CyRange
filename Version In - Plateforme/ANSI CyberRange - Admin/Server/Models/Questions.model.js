const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const Question = function(question) {
  this.Contenu = question.Contenu;
  this.Reponse = question.Reponse;
  this.Options = question.Options;
  this.TypeQ = question.TypeQ;
  this.Hint = question.Hint;
  this.Score = question.Score;
  this.IDTraining = question.IDTraining;


};
Question.getAll = (id, result) => {
    let query = "SELECT * FROM Questions";
    sql.query(query, (err, res) => {
      if (err) {
     //   console.log("error: ", err);
        result(null, err);
        return;
      }
    //  console.log("Questions: ", res);
      result(null, res);
    });
  };
  
  Question.getAllQuestions = async (id, result) => {
  let query = "SELECT * FROM Questions";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Questions: ", res);
    result(null, res);
  });
};
Question.getQuestionsbyID = async (id, result) => {
  let query = `SELECT * FROM Questions WHERE IDTraining = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Questions: ", res);
    result(null, res);
  });
};








Question.create = async (newQuestion, result) => {

  let query = `INSERT INTO Questions (Contenu,Reponse,Options,TypeQ,Hint,Score,IDTraining) VALUES `;
  if (newQuestion) {
    //query += `('SQLIN','XYZ',"NULL","ATTACKS","FACILE",${2},${10})"`;

   query += `('${newQuestion.Contenu}','${newQuestion.Reponse}','${newQuestion.Options}','${newQuestion.TypeQ}','${newQuestion.Hint}',${newQuestion.Score},${newQuestion.IDTraining})`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request().query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created Question: ", {newQuestion });
    result(null, {newQuestion });
  });
};
 
Question.remove = async (id, result) => {
  
  let query = (`DELETE FROM Questions WHERE IDQuestion = ${id}`);
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
   // console.log("deleted Question with id: ", id);
    result(null, res);
  });
};
Question.removeAll = async (IDTraining, result) => {
  
  let query = (`DELETE FROM Questions WHERE IDTraining = ${IDTraining}`);
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
  //  console.log("deleted Question with id: ", IDTraining);
    result(null, res);
  });
};
Question.updateById = async (id, question, result) => {
  let query = `UPDATE Questions SET Contenu = '${question.Contenu}', Reponse = '${question.Reponse}', Options = '${question.Options}',  TypeQ = '${question.TypeQ}', Hint = '${question.Hint}', Score = ${question.Score}, IDTraining = ${question.IDTraining} WHERE IDQuestion = ${id}`;


  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
      if (err) {
      //  console.log("error: ", err);
        result(null, err);
        return;
      }
       if (res.affectedRows == 0) {
        // not found question with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //  console.log("updated Questions: ", { id: id, ...question });
      result(null, { id: id, ...question });
    }
  );
};


module.exports = Question; 
