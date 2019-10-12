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
app.use(express.static("C:\Users\mayan\BTP\Documentations_And_Credentials\sample-images" ));
passport_config.config_passport(passport);

var dbMemoryMap = new Map();
var assignedTable = new Map();
var maxAssigned = 20;

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

	// ROUTES

	app.get("/", isLoggedIn, (req, res) => {

		if (assignedTable.has(req.user.username)) {
			// Has
		} else {
			assignedTable.set(req.user.username, {
				lids: [],
				labels: [],
				cur: 0
			});

			var c = 0;

			for (var [key, value] of dbMemoryMap) {
				if (value.isAssigned === false) {
					c++;
					assignedTable.get(req.user.username).lids.push(key);
					assignedTable.get(req.user.username).labels.push('');
					dbMemoryMap.set(key, {	
						isAssigned: true,
						isLabelled: false
					});
				}

				if (c === maxAssigned)
					break;
			}

			// console.log(assignedTable.get(req.user.username).lids);
		}
		
		// Main code here
		res.render('main/labeller',{
			user: req.user,
			cur: assignedTable.get(req.user.username).cur,
			lids: assignedTable.get(req.user.username).lids,
			labels: assignedTable.get(req.user.username).labels,
			prePath: '../../BTP/Documentations_And_Credentials/sample-images/'
		});
	});

	app.get("/prevClick", isLoggedIn, (req, res, next) => {
		var x = assignedTable.get(req.user.username).cur - 1;
		if (x == -1)
			 x = 0;
		 
		 assignedTable.get(req.user.username).cur = x;
		 res.redirect("/");
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