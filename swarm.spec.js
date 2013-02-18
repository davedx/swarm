var Browser = require("zombie");
var fs = require("fs");
var Swarm = require("./swarm");

var config = {
	"app_url": "http://dev.mywebapp.com/",
	"features": [ "navigation.feature", "localize.feature" ]
}

var browser = new Browser();

console.log('Running '+config.features.length);

config.features.forEach(function(v) {
	console.log(v);

	data = fs.readFileSync('tests/'+v, 'utf-8');

	var Parser = new Swarm.Parser(data);
	var tests = Parser.parse();

	var Runner = new Swarm.Runner(browser, config.app_url);
	Runner.run(tests);
});

