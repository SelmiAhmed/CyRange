const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  
const { randomInt } = require("crypto");

// constructor
const Notif = function(notif) {
  this.IDNotif = notif.IDNotif;
  this.Contenu = notif.Contenu;
  this.Statut = notif.Statut;
  this.DateNotif = notif.DateNotif;

};

Notif.getAllNotifs = async (id, result) => {
  let query = "SELECT * FROM Notifications";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Notifs: ", res);
    result(null, res);
  });
};
Notif.getNotifbyID = async (id, result) => {
  let query = `SELECT * FROM Notifications WHERE IDNotif = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Notif: ", res);
    result(null, res);
  });
};

 


Notif.remove = async (id, result) => {
  
  let query = `DELETE FROM Notifications WHERE IDNotif = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Notif with id: ", id);
    result(null, res);
  });
};

Notif.removeALL = async (id,result) => {
    let query = `DELETE FROM Notifications `;
    const pool = await sql2.connect(config);
    const data = await pool.request() .query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${result.affectedRows} Notifs`);
      result(null, res);
    });
  };
  














module.exports = Notif; 
