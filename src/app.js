User Information App - Web Server

Create a Node.js application that is the beginning 
of a user management system. Your users are all saved 
in a "users.json" file, and you can currently do the following:
- search for users
- add new new users to your users file.
- get your starter file here: users.jsonIn een nieuw venster bekijken

Part 0
Create one route:
- route 1: renders a page that displays all your users.

Part 1
Create two more routes:
- route 2: renders a page that displays a form which is your search bar.
- route 3: takes in the post request from your form, then displays matching 
users on a new page.

Part 2
Create two more routes:
- route 4: renders a page with three forms on it (first name, last name, 
	and email) that allows you to add new users to the users.json file.
- route 5: takes in the post request from the 'create user' form, then 
adds the user to the users.json file. Once that is complete, redirects 
to the route that displays all your users (from part 0).



var express = require('express');
var fs = require('fs');

var app = express();

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}

		var parsedData = JSON.parse(data);
		console.log('Users: ' + parsedData.length);

		res.render('index', {countries: parsedData});
	});
});

var server = app.listen(3000, function () {
	console.log('Example app listening on port: ' + server.address().port);
});