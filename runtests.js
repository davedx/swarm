var exec = require('child_process').exec;
var fs = require("fs");

/**
 * This script is just used for setup (and teardown if necessary) before the tests are run.
 * Put anything you want in here, as long as the exec call to jasmine sticks around it'll work.
 */
var config = JSON.parse(fs.readFileSync('config.json'));
if(config.test_db) {
	exec('mysql -u'+config.test_db.username+' -p'+config.test_db.password+' '+config.test_db.db+' < '+config.test_db.data,
		function(err, stdout, stderr) {
			console.log('Database reset. Starting tests');
			go();
		});
} else {
	go();
}

/**
 * Run the tests.
 */
function go() {
	exec('jasmine-node tests/swarm.spec.js',
		function(err, stdout, stderr) {
		if(err)
			console.log('Errors: '+err);

		console.log(stdout);
	});
}
