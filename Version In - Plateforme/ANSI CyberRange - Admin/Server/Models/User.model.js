const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const User = function(user) {
  this.ID = user.ID;
  this.Username = user.Username;
  this.Email = user.Email;
  this.Password = user.Password;
  this.Image = user.Image;
  this.Role = user.Role;

};
User.getAll = (id, result) => {
    let query = "SELECT * FROM Users";
    sql.query(query, (err, res) => {
      if (err) {
     //   console.log("error: ", err);
        result(null, err);
        return;
      }
    //  console.log("users: ", res);
      result(null, res);
    });
  };
  
User.getAllUsers = async (id, result) => {
  let query = "SELECT * FROM Users";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Users: ", res);
    result(null, res);
  });
};
User.getUserbyID = async (id, result) => {
  let query = `SELECT * FROM Users WHERE id = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Users: ", res);
    result(null, res);
  });
};

User.remove = async (id, result) => {
  
    let query = `DELETE FROM Users WHERE IdUser = ${id}`;
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
    //  console.log("deleted User with id: ", id);
      result(null, res);
    });
  };
  User.removeAll = async result => {
    let query = `DELETE * FROM Users `;
    const pool = await sql2.connect(config);
    const data = await pool.request() .query(query, (err, res) => {
      if (err) {
      //  console.log("error: ", err);
        result(null, err);
        return;
      }
     // console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
    

User.getUserbyMail = async (Email, result) => {
  let query = `SELECT * FROM Users WHERE Email = `;
  query += `'${Email}' and Role ='Admin'`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};


  User.create = async (newUser, result) => {

    let query = `INSERT INTO Users (ID,Username,Email,Password,Image,Role) VALUES `;
    let query2 =   "INSERT INTO Users "
    if (newUser) {
      query2 += `('${randomInt(1000000)}','${newUser.Username}','${newUser.Email}','${newUser.Password}','${newUser.Image}','${newUser.Role}')`;
    }
  
    const pool = await sql2.connect(config);
    const data = await pool.request() .query(query, (err, res) => {
      if (err) {
       // console.log("error: ", err);
        result(err, null);
        return;
      }
   //   console.log("created User: ", {newUser });
      result(null, {newUser });
    });
  };
   
  
  User.nombre = async (result) => {
    let query = `SELECT Count(*) FROM Users`;
    const pool = await sql2.connect(config);
    const data = await pool.request() .query(query, (err, res) => {
      if (err) {
     //   console.log("error: ", err);
        result(null, err);
      }
    //  console.log("Users: ", res);
      result(null, res);
    //  return res.toString();
  
    });
  };





module.exports = User; 
