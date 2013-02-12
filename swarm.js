this.Parser = function(text) {
	this.text = text;
	this.tests = [];
	this.lines = [];
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
		var outcome_exp = /(Then the) (.+)/;
		var outcome_data_exp = /([^:]+): (.+)/;
		var a = null;
		var test = { "state": [], "action": [], "outcome": {} };
		do {
			var line = this.lines[this.i++];
			if(line == '' || line === undefined) {
				done = true;
			}
			else if((a = line.match(state_location_exp)) !== null) {
				test.state[a[4]] = a[3];
			} else if((a = line.match(action_input_exp)) !== null) {
				test.action.push({ "fn": a[2], "params": [ a[5], a[3] ]});
			} else if((a = line.match(outcome_exp)) !== null) {
				test.outcome.description = a[2];
			} else if((a = line.match(outcome_data_exp)) !== null) {
				test.outcome.class = a[1];
				test.outcome.text = a[2];
			}
		} while(!done);
		if(test.outcome.text !== undefined) {
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
							expect(browser.success).toBe(true);

							var params = tests[n].action[0]["params"];
							var fn = tests[n].action[0]["fn"];
							//console.log('fn: '+fn+' params: '+params);
							params.push(function() {
								//console.log('browser text = '+browser.text('.'+tests[n].outcome.class));
								expect(browser.success).toBe(true);
								expect(browser.text('.'+tests[n].outcome.class)).toContain(tests[n].outcome.text);
								asyncSpecDone();
							});
							browser[fn].apply(browser, params);
						});
						asyncSpecWait();
					});
				})(i);
			});
		}
	}
}
