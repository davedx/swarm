var Browser = require("zombie");
var fs = require("fs");
var Swarm = require("./swarm");

var config = JSON.parse(fs.readFileSync('config.json'));

var browser = new Browser();

console.log('Running '+config.run.length);

config.run.forEach(function(v) {
	console.log('Feature: '+v);

	data = fs.readFileSync('tests/'+v, 'utf-8');

	var Parser = new Swarm.Parser(data);
	var tests = Parser.parse();

	var Runner = new Swarm.Runner(browser, config.app_url);
	Runner.run(tests);
});
