const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const log4js = require("log4js");

const models = require('./models');

const app = express();

/*****Socket.io*****/
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const env = require('dotenv');

//Log configuration
log4js.configure({
  appenders: { MPD: { type: "file", filename: "log_server.log" } },
  categories: { default: { appenders: ["MPD"], level: "error" } }
});
const logger = log4js.getLogger("MPD");
logger.error("Log starting");


//Initial config
env.config();

const socket = require('./sockets.js')(io);

/*var path = require('path');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ma-petite-draft-client/public', 'index.html'));
});*/

//allow cross-origin requests
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*const test = [
	{id:1, name: 'test1'},
	{id:2, name: 'test2'},
	{id:3, name: 'test3'}
];*/

const api = require('./routes/api');
app.use('/api', api);

/*app.get('/api/test', function(request, response) {
	response.send(test);
});*/
/*app.get('/', function (request, response){
	response.sendFile('../ma-petite-draft-client/public/index.html');
})*/


//Heroku deployement
if(process.env.NODE_ENV === 'production') {
	console.log(`Heroku deployement`);
	//Static folder
	app.use(express.static(__dirname + '/build-front/'));
	//Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/build-front/index.html'));
}else {
	console.log(`Local development`);
	var path = require('path');
	app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, '../ma-petite-draft-client/public', 'index.html'));
	});
	//Static folder
	/*app.use(express.static(path.join(__dirname, '..','ma-petite-draft-client/public')));
	app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, '../ma-petite-draft-client/public', 'index.html'));
	});*/
}

models.sequelize.sync().then(function () {
	console.log(`model sequelize sync`);
	//Socket listen
	server.listen(process.env.PORT, () => {
		console.log(`server is working on port ${process.env.PORT}`);
	});
});

module.exports = app;
