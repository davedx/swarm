var htmlHelper = require('./htmlHelper.js');

this.Parser = function(text) {
	this.text = text;
	this.tests = [];
	this.lines = [];
	this.map = { click: 'pressButton', check: 'check', uncheck: 'uncheck' }
	this.i = 0;

	this.parse = function() {
		this.lines = this.text.split(/\n/);
		do {} while(this.parseBlock());
		return this.tests;
	}

	this.parseBlock = function() {
		var done = false;
		var state_location_exp = /(Given|And) (I am at the) '([^']+)' (.+)/;
		var action_input_exp = /(When I|Then I) (select|fill) '([^']+)' (from the|in the) '([^']+)' (menu|field)/;
		var click_input_exp = /(When I|Then I) (click|check|uncheck) the '([^']+)' (box|button)/;
		var outcome_exp = /(Then the) (.+)/;
		var outcome_data_exp = /([^:]+): (.+)/;
		var a = null;
		var test = { "state": [], "action": [], "outcome": {}, "match": [] };
		do {
			var line = this.lines[this.i++];
			if(line == '' || line === undefined) {
				done = true;
			}
			else if((a = line.match(state_location_exp)) !== null) {
				test.state[a[4]] = a[3];
			} else if((a = line.match(action_input_exp)) !== null) {
				test.action.push({ "fn": a[2], "params": [ a[5], a[3] ]});
			} else if((a = line.match(click_input_exp)) !== null) {
				// we need to map our DSL verbs to the correct zombie functions
				test.action.push({ "fn": this.map[a[2]], "params": [ a[3] ]});
			} else if((a = line.match(outcome_exp)) !== null) {
				test.outcome.description = a[2];
			} else if((a = line.match(outcome_data_exp)) !== null) {
				test.match.push({ "selector": a[1], "text": a[2] });
			} else {
				console.log('Compile error at line: '+line);
			}
		} while(!done);
		if(test.outcome.description !== undefined) {
			this.tests.push(test);
			return true;
		}
		return false;
	}
}

this.Runner = function(browser, base_url) {
	this.browser = browser;
	this.base_url = base_url;

	this.run = function(tests) {

		for(var i=0; i<tests.length; i++) {
			describe('Test '+i, function() {
				(function(n) {
					it(tests[n].outcome.description, function() {

						// go to page:
						var url = tests[n].state['page'];
						browser.visit(base_url+url, function(err) {

							for(var j=0; j<tests[n].action.length; j++) {

								var params = tests[n].action[j]["params"];
								var fn = tests[n].action[j]["fn"];

								if(j == tests[n].action.length-1) {
									params.push(function() {

										// test matches
										for(var k=0; k<tests[n].match.length; k++) {
											var selector = tests[n].match[k].selector;
											var text = tests[n].match[k].text;
											console.log('Testing: '+selector+" = "+text);

											var value = htmlHelper.getAnyValue(browser, selector);
											expect(value).toContain(text);
										}

										asyncSpecDone();
									});
								}
									browser[fn].apply(browser, params);
							}
						});
						asyncSpecWait();
					});
				})(i);
			});
		}
	}
}
