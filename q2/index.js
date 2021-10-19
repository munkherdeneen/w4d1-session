const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const urlencodedParser = express.urlencoded({ extended: false });

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'salt for cookie signing',
}));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "css")));

app.get('/', (req, res) => {	
	const date = new Date();
	const hour = date.getHours();
	let resourceFile = path.join(__dirname, "/public", "night.html");
	
	if(6 <= hour && hour <= 18) {
		resourceFile = path.join(__dirname, "/public", "day.html");
	}
	
	res.sendFile(resourceFile);
});

app.get("/output", (req, res) => {
	
	const name = req.session["name"];
	const age = req.session["age"];
	
	if (!name) {
		name = "person";
	}
	if (!age) {
		age = "99";
	}
	
	res.send(`Welcome ${name} with age of ${age}`);
});

app.post("/result", urlencodedParser, (req, res, next) => {
	req.session['name'] = req.body.name;
	req.session['age'] = req.body.age;
	
	res.redirect(303, `/output`);
});

app.listen(3000);