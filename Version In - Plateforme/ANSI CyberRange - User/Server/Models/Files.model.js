const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const File = function(file) {
  this.Name = file.Name;
  this.Size = file.Size;
  this.Path = file.Path;
  this.IDTraining = file.IDTraining;


};
File.getAll = (id, result) => {
    let query = "SELECT * FROM Fichiers";
    sql.query(query, (err, res) => {
      if (err) {
      //  console.log("error: ", err);
        result(null, err);
        return;
      }
      //console.log("Files: ", res);
      result(null, res);
    });
  };
  
  File.getAllFiles = async (id, result) => {
  let query = "SELECT * FROM Fichiers";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Files: ", res);
    result(null, res);
  });
};
File.getFilebyID = async (id, result) => {
  let query = `SELECT * FROM Fichiers WHERE IDFile = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Files: ", res);
    result(null, res);
  });
};
File.getFilebyIDTraining = async (idtraining, result) => {
    let query = `SELECT * FROM Fichiers WHERE IDTraining = ${idtraining}`;
    const pool = await sql2.connect(config);
    const data = await pool.request() .query(query, (err, res) => {
      if (err) {
      //  console.log("error: ", err);
        result(null, err);
        return;
      }
     // console.log("Files: ", res);
      result(null, res);
    });
  };
  
File.getFilebyName = async (Name, result) => {
  let query = `SELECT * FROM Fichiers WHERE Name = `;
  query += `'${Name}'`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Files: ", res);
    result(null, res);
  });
};







File.create = async (newFile, result) => {

  let query = `INSERT INTO Fichiers (Name,Size,Path,IDTraining) VALUES `;
  if (newFile) {
    //query += `('SQLIN','XYZ','NULL','ATTACKS','FACILE',${2},${10},${0})`;

    query += `('${newFile.Name}','${newFile.Size}','','${newFile.IDTraining}')`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created FILE: ", {newFile });
    result(null, {newFile });
  });
};
 
File.remove = async (idtraining, result) => {
  
  let query = (`DELETE FROM Fichiers WHERE IDTraining = ${idtraining}`);
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
    console.log("deleted Files with id: ", idtraining);
    result(null, res);
  });
};



module.exports = File; 
