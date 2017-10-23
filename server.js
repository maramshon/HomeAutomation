//require express
var express = require('express');
var app = express();
var bluetooth = require('node-bluetooth');
var db=require('./db/dbConnection');
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



//scan in bluetooth 
app.get('/scan',(req,res) =>{
	const devices={
		addresses:[],
		names:[]
	};
	var device = new bluetooth.DeviceINQ();
	device
	.on('finisqhed', console.log.bind(console, 'finished'))
	.on('found',(address,name) =>{
		devices.addresses.push(address);
		devices.names.push(name);
		console.log("address is===> "+address+" the name is===> "+name)
	}).inquire();
	res.send(JSON.stringify(devices))
})

// connect to bluetooth device
var connect;
app.get('/connect',(req,res)=>{
	bluetooth.connect('98-d3-31-b3-12-a1',1,(err,connection)=>{
		if(err){
			throw err
		}else{
			console.log('connected')
			connect=connection
			//connection.write('1', 'utf-8');
			res.send(JSON.stringify('doneeee'))
		}
	})
})
//turn on the lights
app.get('/on',(req,res)=>{
	connect.write(new Buffer('1', 'utf-8'),function(){});
	res.send(JSON.stringify('on'))
})

//turn off the lights 
app.get('/off',(req,res)=>{
	connect.write(new Buffer('0', 'utf-8'),function(){});
	res.send(JSON.stringify('off'))
})
//signup user
app.post('/signup',(req,res)=>{
	console.log("comming data =======>", req.body.user)
	//checck if user allready exist  
	var sql="select * from user where name='"+req.body.user.username+"';";
	db.query(sql,function(err,result){
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
		var sql="insert into user (name,password) values ('"+req.body.user.username+"','"+hash+"');";
		db.query(sql,function(err,result){
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
	db.query(sql,(err,result)=>{
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
app.get('/user',(req,res) =>{
	return res.send(JSON.stringify(req.session.username))
})
//specify port number
var port = process.env.PORT||8000;
//run the server 
app.listen(port,(err) =>{
	if(err)
		throw err
	console.log('listening on 8000')
})