var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql2.freemysqlhosting.net',
    user: 'sql2200708',
    password: 'wS3*iZ6%',
    database: 'sql2200708'
});

connection.connect(function(err) {
    if (err) {
        console.log('errrror');
    }

    console.log("db connected")
     // var sql =
     //        'CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), password varchar(255), email varchar(200), image varchar(255), api varchar(250))';
     //    connection.query(sql, function(err, result) {
     //        if (err) {
     //            throw err;
     //        }
     //        console.log('CREATE TABLE usre');
     //    });

      // console.log("connected to db")
      //   var sql2 = 
      //   'CREATE TABLE components (id INT AUTO_INCREMENT PRIMARY KEY, component varchar (200))';
      //   connection.query(sql2, function(err, result){
      //       if(err){
      //           throw err;
      //       }
      //       console.log('CREATE TABLE components');
      //   });
    });
module.exports = connection;
