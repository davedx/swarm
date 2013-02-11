var Browser = require("zombie");
var fs = require("fs");
var Swarm = require("./swarm");

var app_url = "http://dev.gamelocalizer.com/";
var browser = new Browser();

//TODO: how to abstract this out???
var router = function(state) {
	var url = app_url + state.game.replace(/ /g, '-') + '/' + state.sheet.replace(/ /g, '-') + '/' + state.language.replace(/ /g, '-');
	return url;
}

data = fs.readFileSync('tests/navigation.feature', 'utf-8');

var Parser = new Swarm.Parser(data);
var tests = Parser.parse();

var Runner = new Swarm.Runner(browser, router, app_url);
Runner.run(tests);
