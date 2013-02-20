Swarm
=====

Swarm is a declarative BDD (Behaviour Driven Development) framework built on top of node.js, jasmine-node [1] and zombie.js [2].

I found jasmine was great for writing unit / functional / acceptance tests, but for BDD I really liked the style of writing scenarios and features as plain text in a declarative language - to me this is the essence of BDD, bridging the gap between non-technical stakeholders or analysts who know **what they want**, and developers, who know **how to test for it**.

Using zombie, performing action inputs and testing outcomes is pretty complete already.

Installation
------------

	sudo npm install jasmine-node -g
	npm install zombie

Example usage
-------------

In person.feature:

	Given I am at the 'company/1/person/3/edit' page
	When I fill 'http://www.google.com' in the 'URL' field
	Then I click the 'Update' button
	Then the URL field should update:
	input[name=URL]: http://www.google.com
	#messages li: Updated person successfully.

Edit config.json and update the parameters. I use test_db to run an sql script that resets the database to a known state before each test run. 'features' contains an array of test feature definitions (see e.g. localize.feature). 'run' defines which feature tests will be run. (I'm currently trying to get this in as a command line argument, watch this space).

To run the tests:

	node runtests.js

Test authoring and configuration will improve. An intelligent front-end for writing tests that can be used easily by stakeholders would be great, hey?

[1] https://github.com/mhevery/jasmine-node

[2] http://zombie.labnotes.org/

P.S. The next logical step in this process is, of course, a compiler that can generate the code to pass the tests...
