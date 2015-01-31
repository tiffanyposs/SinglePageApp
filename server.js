var express = require('express');
var bodyParser = require('body-parser'); 
var cors = require('cors');
var sqlite3 = require('sqlite3').verbose();
var app = express();

var db = new sqlite3.Database("user_data.db")


app.use(cors());
app.use(bodyParser.json({extended: false}));



app.get('/', function(req, res){
	db.all("SELECT * FROM person", function(err, rows){
		if(err){throw err;}
		res.json(rows);
	});
});


//creates a pet
app.post('/person', function(req, res){
	var name = req.body.name;
	var hometown = req.body.hometown;
	var sign = req.body.sign;

	db.run("INSERT INTO person (name, hometown, sign) VALUES (?, ?, ?)", name, hometown, sign, function(err){
		if(err){ throw err; };
		// var id = this.lastID;
		db.get("SELECT * FROM person WHERE id=1", function(err, row){
			if(err) { throw err; }
			res.json(row);
		});
	});
});


//this deletes a pet
app.delete('/person', function(req, res){
	db.run("DELETE FROM person WHERE id = 1", function(err){
		if(err) { throw err;}
		res.json();
	});
});


app.listen(3000);
console.log('listening on port 3000')