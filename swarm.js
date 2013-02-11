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
		var action_select_exp = /(When I) (select) '([^']+)' (from the) '([^']+)' (menu)/;
		var outcome_exp = /(Then the) (.+)/;
		var outcome_data_exp = /([^:]+): (.+)/;
		var a = null;
		var test = { "state": [], "action": null, "outcome": {} };
		do {
			var line = this.lines[this.i++];
			if(line == '' || line === undefined) {
				done = true;
			}
			else if((a = line.match(state_location_exp)) !== null) {
				test.state[a[4]] = a[3];
			} else if((a = line.match(action_select_exp)) !== null) {
				var x = a[5];
				var y = a[3];
				test.action = function(browser, fn) {
					browser.select(x, y, fn);
				};
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

this.Runner = function(browser, router, base_url) {
	this.browser = browser;
	this.base_url = base_url;

	this.run = function(tests) {

		for(var i=0; i<tests.length; i++) {
			describe('Test '+i, function() {
				(function(n) {
					it(tests[n].outcome.description, function() {
						// set state:
						var url = router(tests[n].state);
						browser.visit(url, function(err) {
							// do action:
							expect(browser.success).toBe(true);
							expect(browser.query('select[name=Language]')).toBeDefined();

							if(browser.query('select')) {
								tests[n].action(browser, function() {
									expect(browser.success).toBe(true);
									//console.log('expecting '+tests[n].outcome.text);
									expect(browser.text('.'+tests[n].outcome.class)).toContain(tests[n].outcome.text);
									asyncSpecDone();
								});
							} else {
								asyncSpecDone();
							}
						});
						asyncSpecWait();
					});
				})(i);
			});
		}
	}
}
