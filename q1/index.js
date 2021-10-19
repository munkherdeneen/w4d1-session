const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use('/css', express.static(path.join(__dirname, "css")));

app.get("/", (req, res, next) => {
	console.log('Cookies: ', req.cookies)
	res.render("form.ejs", {cookie: req.cookies	});
});

app.post("/addcookie", (req, res, next) => {
	res.cookie(req.body.cookiename, req.body.cookievalue);
	res.redirect(303, "/");
});

app.post("/remove", (req, res, next) => {
	if(req.cookies.rKey) res.clearCookie("rKey");
	res.redirect(303, "/");
});

app.listen(3000);