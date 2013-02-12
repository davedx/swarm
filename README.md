Swarm
=====

Swarm is a declarative BDD (Behaviour Driven Development) framework built on top of jasmine-node [1] and zombie.js [2].

I found jasmine was great for writing unit / functional / acceptance tests, but for BDD I really liked the style of writing scenarios and features as plain text in a declarative language - to me this is the essence of BDD, bridging the gap between non-technical stakeholders or analysts who know **what they want**, and developers, who know **how to test for it**.

At the moment it's just a prototype that allows primitive browser actions and testing the result.

Because of zombie, performing action inputs and testing outcomes is pretty complete already.

[1] https://github.com/mhevery/jasmine-node

[2] http://zombie.labnotes.org/

P.S. The next logical step in this process is, of course, a compiler that can generate the code to pass the tests...