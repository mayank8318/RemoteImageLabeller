const  env_vars = require('./utils/constants.js') ;
const  express = require('express');
const body_parser = require('body-parser');
const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const  passport_config = require('./config/passport_config');
var flash = require('connect-flash');
var isLoggedIn = require("./middleware/isLoggedIn");

let user = require("./routes/user");
let {
	mysql
} = require('./db/mysql.js');

/* mysql.query("SELECT * FROM Images", (err, rows, fiels) => {
	if (err)
	throw err;

	console.log(rows);
}); */

var dbMemoryMap = new Map();
mysql.query("SELECT * FROM Images WHERE labelled_by is NULL", (err, rows, fields) => {
	if (err)
		throw err;

	for (var r in rows) {
		dbMemoryMap.set(rows[r].name, {
			isAssigned: false,
			isLabelled: false
		});
	}

	/* for (var [key, value] of dbMemoryMap) {
		console.log(key + ' = ' + value);
	}*/

	let app = express();
	app.use(body_parser.urlencoded({extended: false}));
	app.use(body_parser.json());
	app.use(logger('dev'));
	app.use(flash());
	app.use(require('express-session')({
		secret: env_vars.secretCode,
		resave: false,
		saveUninitialized: false,
		cookie: {_expires: 24 * 60 * 60 * 1000}
	}));

	app.use(passport.initialize());
	app.use(passport.session({}));

	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + "/public"));
	passport_config.config_passport(passport);
	// passport.use(new LocalStrategy())


	// ROUTES

	app.get("/", isLoggedIn, (req, res) => {
		// Main code here
		res.render('main/sample',{
			user: req.user
		});
	});

	app.use(user);

	//404
	app.use(function (req, res, next) {
		res.status(404);
		// respond with html page
		res.render('error/error_404', { url: req.url,user: req.user });
		// res.send("no");
		return;
	});
  

	const listenPort = process.env.PORT  || env_vars.PORT_NUMBER ;

	//server setup
	app.listen(listenPort, ()=>{
		console.log('The server is running at :', listenPort);
	});
});