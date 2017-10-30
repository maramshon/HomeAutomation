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
			res.send(JSON.stringify('doneeee'));
		}
	})
})

// handle motion sensor
app.get('/motion',(req,res) =>{
	var buf= new Buffer('d', 'utf-8')
	var x="dd";
	console.log("motion")
	connect.write(new Buffer(buf),function(){
		connect.on('data', (buffer) => {
		   
		console.log("hiiiiiii")
		//console.log(buffer)
		buf=buffer.toString('utf-8')
     console.log(buffer.toString('utf-8'));
    // console.log(str.split('/n', 0, 2))
    // x=buffer.toString();
    // res.set('Content-Type', 'text/plain');
    // res.status(200);
    // return res.send(JSON.stringify("ffff"))
    
    // //return res.send(JSON.stringify(x))
    // //console.log("the x is===> ",x)
  });
	});
	//setTimeout(function(){}, 2000);
	
	//setTimeout(function(){return res.send(JSON.stringify(x))}, 2000);
 	//return res.send();
 setTimeout(function(){
 	console.log("hhhhhhh",buf.toString("utf-8")); 
 	return res.json(buf.toString("utf-8"))
 }, 1000);

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
		var sql="insert into user (name,password,image) values ('"+req.body.user.username+"','"+hash+"','"+req.body.user.image+"');";
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
// return user info
app.get('/user',(req,res) =>{
	var sql="select * from user where name='"+req.session.username+"';"
	db.query(sql,(err,result)=>{
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
	db.query(sql,(err,result)=>{
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
	db.query(sql,(err,result)=>{
		if(err){
			throw err;
		}
		console.log("usename updated");
		req.session.username=name
		res.send();
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