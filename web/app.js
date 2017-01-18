const 
	pkg = require('./package.json'),
	program = require('commander'),
	express = require('express'),
	log = require('winston');

// Initialise logging.
require('./Logging').init();

var config = {
	web_port: 4004
};

// Fetch program parameters:
program
	.version(pkg.version)
	.option('-p, --port', `Web server port (${config.web_port}).`, parseInt)
	.parse(process.argv);

config.web_port = program.port || config.web_port;

log.info(config);

var app = express();

// Static files:
app.use(express.static('public'));
// Allow sending json bodies.
app.use(require('body-parser').json());

// Create controllers:
var controllers = {
	api: new (require('./controllers/ApiController'))(app)
};

// Register controllers:
Object.keys(controllers).forEach(function(key) {
	controllers[key].register(app);
});

// Listen:
var server = app.listen(config.web_port, () => {
	log.info(`App listening at http://${server.address().address}:${server.address().port}`);
});