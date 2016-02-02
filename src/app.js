// User Information App - Web Server

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
	var users = [];
	fs.readFile('./users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);

		response.render('index', {
			users: users
		});
	});
});

app.get('/users', function(request, response) {
	var users = [];
	fs.readFile('./users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);

		response.render('users', {
			users: users
		});
	});
});

app.get('/users/newusers', function(request, response) {
	response.render('newusers');
});

app.get('/users/search', function(request, response) {
	response.render('search');
})

app.post('/users/newusers', bodyParser.urlencoded({
	extended: true
}), function(request, response) {

	fs.readFile('./users.json', "utf-8", function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);
		firstname = request.body.firstname;
		lastname = request.body.lastname;
		email = request.body.email;

		newUser = {
			firstname: request.body.firstname,
			lastname: request.body.lastname,
			email: request.body.email
		};
		users.push(newUser);

		fs.writeFile('./users.json', JSON.stringify(users));
		response.redirect('/')
	});
});


app.post('/users/search', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	fs.readFile('users.json', 'utf-8', function(err, data) {
		if (err) {
			throw err;
		}
		users = JSON.parse(data);
		var results = [];
		for (i = 0; i < users.length; i++) {
			if (users[i].firstname === request.body.firstname || users[i].lastname === request.body.lastname) {
				results = results.concat(users[i]);
			}
		}
		response.render('searchresult', {
			results: results
		});
	});
});

var server = app.listen(3000, function() {
	console.log('UsersInfoApp listening on port: ' + server.address().port);
});