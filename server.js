//require express
var express = require('express');
var app = express();
var bluetooth = require('node-bluetooth');
var db=require('./db/dbConnection');
var session =require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
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
			res.send('doneeee')
		}
	})
})
//turn on the lights
app.get('/on',(req,res)=>{
	connect.write(new Buffer('1', 'utf-8'),function(){});
	res.send('on')
})

//turn off the lights 
app.get('/off',(req,res)=>{
	connect.write(new Buffer('0', 'utf-8'),function(){});
	res.send('off')
})
//signup user
app.post('/signup',(req,res)=>{
	console.log("comming data =======>", req.body.user)
	//checck if user allready exist  
	var sql="select * from user1 where name='"+req.body.user.username+"';";
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
		//else insert it into database
		var sql="insert into user1 (name,passward) values ('"+req.body.user.username+"',"+req.body.user.password+");";
		db.query(sql,function(err,result){
			if(err){
				throw err
			}
			res.status(200);
			return res.send(JSON.stringify("inserted"));
		})
		
	})
});
//login user 
app.post('login',(req,res)=>{
	console.log("hiiiiiii")
	//check if username exist
	var sql="select * from user1 where name='"+req.body.user.username+"';"
	db.query(sql,(err,result)=>{
		if(err)
			throw err
		if(result.length){
			//check password
			if(result[0].passward=req.body.user.password){
				//create session 
				req.session.username=result[0].username;
				req.session.password=result[0].password;
				return res.send(JSON("done"));
			}else{
				return res.send(JSON.stringify("not exist"));
			}

		}else{
			return res.send(JSON.stringify("not exist"));
		}
	})
})
//specify port number
var port = process.env.PORT||8000;
//run the server 
app.listen(port,(err) =>{
	if(err)
		throw err
	console.log('listening on 8000')
})

