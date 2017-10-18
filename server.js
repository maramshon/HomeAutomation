//require express 
var express =require('express');
var app=express();
var bluetooth = require('node-bluetooth');

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
	console.log('hiiii')
	connect.write(new Buffer('1', 'utf-8'),function(){});
	res.send('hiiioii')

})

//specify port number
var port = process.env.PORT||8000;
//run the server 
app.listen(port,(err) =>{
	if(err)
		throw err
	console.log('listening on 8080')
})