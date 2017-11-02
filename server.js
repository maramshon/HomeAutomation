var express = require('express');
var app = express();
var mysql = require('mysql');
var session =require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bcrypt=require("bcrypt-nodejs")
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', '*');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: "shhhhhhh",
    resave: false,
    saveUninitialized: true
}));



////////////////////////////

var http = require('http')
var socketio = require('socket.io');

var server = http.Server(app);
var websocket = socketio(server);

// var connection=require('./connection/connectionConnection');

server.listen(8000, () => console.log('listening on *:8000'));
websocket.on('connection', (socket) => {
  
  console.log("user connected ================================");

  var sql="select * from msgT;";
  connection.query(sql,function(err,result){
          if(err){
            throw err
        }
        console.log("query result =====>",result);
        websocket.emit('allDataBase', result);
  }) 

  socket.on('message', (message) => {
      // debugger;
      console.log('HHHHHHHHHH ========> ',message);
      if(!message){
        return 
      }
      var sql="insert into msgT (user,text,date) values ('"+message.user+"','"+message.text+"','"+message.date+"');";
            connection.query(sql,function(err,result){
                    if(err){
                        throw err
                    }
                })
      // websocket.emit('msg', message);
      var sql="select * from msgT;";
      connection.query(sql,function(err,result){
          if(err){
            throw err
        }
        console.log("query result =====>",result);
        websocket.emit('msg', result);
  }) 
  });

  socket.on('disconnect', function(){
       console.log('user disconnected');
   });
});
////////////////////////////
//database

var connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11201967',
    password: '4qTvU9Rc1T',
    database: 'sql11201967'
});

connection.connect(function(err) {
    if (err) {
        console.log('errrror');
    }
    // var sql3 =
    //  'CREATE TABLE msgT (id INT AUTO_INCREMENT PRIMARY KEY, user varchar (50), text varchar(200), date varchar(20));';
    //  connection.query(sql3, function(err, result){
    //    if (err){
    //      throw err;
    //    }
    //    console.log('CREATE Chat Box table in mysql');
    //  });
     console.log("connection connected")
     // var sql="drop table msgT;"
     // connection.query(sql, function(err, result) {
     //   if(err)
     //   console.log("err")
     // })
     // var sql =
     //        'CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), password varchar(255), email varchar(200), image varchar(255), api varchar(250))';
     //    connection.query(sql, function(err, result) {
     //        if (err) {
     //            throw err;
     //        }
     //        console.log('CREATE TABLE usre');
     //    });

    //   console.log("connected to connection")
        // var sql2 = 
        // 'CREATE TABLE components (id INT AUTO_INCREMENT PRIMARY KEY, component varchar (200))';
        // connection.query(sql2, function(err, result){
        //     if(err){
        //         throw err;
        //     }
        //     console.log('CREATE TABLE components');
        // });
    });



//signup user
app.post('/signup',(req,res)=>{
  console.log("comming data =======>", req.body.user)
  //checck if user allready exist  
  var sql="select * from user where name='"+req.body.user.username+"';";
  connection.query(sql,function(err,result){
    if(err){
      throw err
    }
    console.log("query result =====>",result);
    // if exist return exist 
    if(result.length){
      res.status(200)
      return res.send(JSON.stringify("exist"));
    }

    bcrypt.hash(req.body.user.password, null, null, function(err, hash){
    //else insert it into database
    var sql="insert into user (name,password,image) values ('"+req.body.user.username+"','"+hash+"','"+req.body.user.image+"');";
    connection.query(sql,function(err,result){
      if(err){
        throw err
      }
      res.status(200);
      return res.send(JSON.stringify("inserted"));
    })
    })
  })
});
//login user 
app.post('/login',(req,res)=>{
  console.log(req.body)
  //check if username exist
  var sql="select * from user where name='"+req.body.user.username+"';"
  connection.query(sql,(err,result)=>{
    console.log("the result is ====> ",result)
    if(err)
      console.log("errrrror")
    if(result.length){
      //check password
      console.log(req.body.user.password)
      console.log("resullllt",result[0].password)

      bcrypt.compare(req.body.user.password, result[0].password, function(err, hash){

      if(hash){
        //create session 
        req.session.username=result[0].name;
        req.session.password=result[0].password;
        console.log("the session is ===> ",req.session)
        return res.send(JSON.stringify("done"));
      }else{
        return res.send(JSON.stringify("not exist"));
      }
    })

    }else{
      return res.send(JSON.stringify("not exist"));
    }
  })
})
//ligout
app.get('/logout', function(req,res){
    req.session.destroy(function(err) {
      err ? console.log(err) : console.log('deleted')
      res.send(JSON.stringify("ended"))
      })
})
// return user info
app.get('/user',(req,res) =>{
  var sql="select * from user where name='"+req.session.username+"';"
  connection.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    return res.send(JSON.stringify(result[0]))
  })
  
})
//update the image in database
app.post('/SetNewImage',(req,res) =>{
  var name=req.body.user.name;
  var image=req.body.user.image;
  var sql="update user set image='"+image+"' where name='"+name+"';"
  connection.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    console.log("image updated");
    res.send();
  })
})
//update the user name in database 
app.post('/SetName',(req,res) =>{
  var name=req.body.user.name;
  var sql="update user set name='"+name+"' where name='"+req.session.username+"';"
  connection.query(sql,(err,result)=>{
    if(err){
      throw err;
    }
    console.log("usename updated");
    req.session.username=name
    res.send();
  })
})

//specify port number
// var port = process.env.PORT||8000;
// //run the server 
// app.listen(port,(err) =>{
//  if(err)
//    throw err
//  console.log('listening on 8000')
// })