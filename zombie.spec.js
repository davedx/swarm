var Browser = require("zombie");
var fs = require("fs");
var Swarm = require("./swarm");

var app_url = "http://dev.gamelocalizer.com/";
var browser = new Browser();

data = fs.readFileSync('tests/navigation.feature', 'utf-8');

var Parser = new Swarm.Parser(data);
var tests = Parser.parse();

var Runner = new Swarm.Runner(browser, app_url);
Runner.run(tests);
