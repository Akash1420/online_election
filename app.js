const http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const { parse } = require('querystring');
const bodyParser=require('body-parser');
var express=require('express');
const app=express();
app.use(express.static('./'))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var name,age,vote,gender,region,aadhar;
var bjp=0;
var congress=0;
var bsp=0;
var aap=0;

app.post("/cast_vote", function (req, res) {
    
	name=req.body.name;
    age=req.body.age;
    vote=req.body.candidate;
	gender=req.body.gender;
	region=req.body.search_categories;
	aadhar=req.body.aadhar;
	console.log(name);
    console.log(age);
    console.log(vote);
	console.log(region);
	console.log(gender);
	if(vote=="BJP")
	{
		bjp=bjp+1;
	}
	else if(vote=="Congress")
	{
		congress=congress+1;
	}
	else if(vote=="BSP")
	{
		bsp=bsp+1;
	}
	else
	{
		aap=aap+1;
	}
	res.sendFile('voted.html', {root: __dirname });
	
	
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { Name: name, Age: age , Gender: gender , Aadhar:aadhar,Vote:vote,Region:region };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

});




	
app.listen(8080);