const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const Cours = function(cours) {
  this.NomCours = cours.NomCours;
  this.Description = cours.Description;
  this.Image = cours.Image;
  this.Categorie = cours.Categorie;
  this.Type = cours.Type;
  this.Temps = cours.Temps;
  this.NbQuestions = cours.NbQuestions;
  this.NbUsers = cours.NbUsers;


};
Cours.getAll = (id, result) => {
    let query = "SELECT * FROM Cours";
    sql.query(query, (err, res) => {
      if (err) {
       // console.log("error: ", err);
        result(null, err);
        return;
      }
     // console.log("Cours: ", res);
      result(null, res);
    });
  };
  
  Cours.getAllCours = async (id, result) => {
  let query = "SELECT * FROM Cours";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Cours: ", res);
    result(null, res);
  });
};
Cours.getCoursbyID = async (id, result) => {
  let query = `SELECT * FROM Cours WHERE IDCours = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours: ", res);
    result(null, res);
  });
};

Cours.getCoursbyName = async (NomCours, result) => {
  let query = `SELECT * FROM Cours WHERE NomCours = `;
  query += `'${NomCours}'`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours: ", res);
    result(null, res);
  });
};

Cours.nombre = async (result) => {
  let query = `SELECT Count(*) FROM Cours`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
    }
   // console.log("Cours: ", res);
    result(null, res);
  //  return res.toString();

  });
};
Cours.nombretype = async (result) => {
  let query = `SELECT COUNT(Categorie) FROM Cours WHERE Categorie =  `;
  let attack ="attack"
  query += `'${attack}'`;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
    }
   // console.log("Cours: ", res);
    result(null, res);
   // return res.toString();

  });
};

Cours.nombretype2 = async (result) => {
  let query = `SELECT COUNT(Categorie) FROM Cours WHERE Categorie =  `;
  let attack ="pentest"
  query += `'${attack}'`;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
    }
    //console.log("Cours: ", res);
    result(null, res);
   // return res.toString();

  });
};
Cours.nombretype3 = async (result) => {
  let query = `SELECT COUNT(Categorie) FROM Cours WHERE Categorie =  `;
  let attack ="defense"
  query += `'${attack}'`;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
    }
   // console.log("Cours: ", res);
    result(null, res);
   // return res.toString();

  });
};

Cours.lastid = async (result) => {
  let query = `SELECT TOP 1 IDCours FROM Cours ORDER BY IDCours DESC `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
    }
   // console.log("Cours: ", res);
    result(null, res);
    return res;

  });
};




Cours.create = async (newCours, result) => {

  let query = `INSERT INTO Cours (NomCours,Description,Image,Categorie,Type,Temps,NbQuestions,NbUsers) VALUES `;
  if (newCours) {
    //query += `('SQLIN','XYZ','NULL','ATTACKS','FACILE',${2},${10},${0})`;

    query += `('${newCours.NomCours}','${newCours.Description}','','${newCours.Categorie}','${newCours.Type}','${newCours.Temps}',${newCours.NbQuestions},${0})`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
  //  console.log("created Cours: ", {newCours });
    result(null, {newCours });
  });
};
 
Cours.remove = async (id, result) => {
  
  let query = (`DELETE FROM Cours WHERE IDCours = ${id}`);
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
   // console.log("deleted Cours with id: ", id);
    result(null, res);
  });
};
Cours.removeAll = async result => {
  let query = `DELETE * FROM Cours `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log(`deleted ${res.affectedRows} Cours`);
    result(null, res);
  });
};
Cours.updateById = async (id, cours, result) => {
  let query = `UPDATE Cours SET NomCours = '${cours.NomCours}', Description = '${cours.Description}', Image = 'Null', Categorie = '${cours.Categorie}', Type = '${cours.Type}', Temps = '${cours.Temps}', NbQuestions = ${cours.NbQuestions} WHERE IDCours = ${id}`;


  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
      if (err) {
    //    console.log("error: ", err);
        result(null, err);
        return;
      }
       if (res.affectedRows == 0) {
        // not found Cours with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //  console.log("updated Cours: ", { id: id, ...cours });
      result(null, { id: id, ...cours });
    }
  );
};


module.exports = Cours; 
