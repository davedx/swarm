Given I am at the '1/1/2' page
When I fill 'Le petit Hobbit' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should update:
textarea[name=key_the_hobbit_title]: Le petit Hobbit

Given I am at the '1/1/2' page
When I fill 'Le forte Hobbit' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should update:
textarea[name=key_the_hobbit_title]: Le forte Hobbit

Given I am at the '1/1/2' page
When I fill 'www.google.com' in the 'key_the_hobbit_link' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_link field should NOT update:
#errors li: Link not in correct format: must begin with http:, https: or mailto:

Given I am at the '1/1/2' page
When I fill 'http://www.google.com' in the 'key_the_hobbit_link' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_link field should update to http://www.google.com:
textarea[name=key_the_hobbit_link]: http://www.google.com
#messages li: Localization succeeded: 1 key updated.

Given I am at the '1/1/2' page
When I fill 'http://www.thehobbit.co.fr' in the 'key_the_hobbit_link' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_link field should update to http://www.thehobbit.co.fr:
textarea[name=key_the_hobbit_link]: http://www.thehobbit.co.fr
#messages li: Localization succeeded: 1 key updated.

Given I am at the '1/1/4' page
When I fill '金魚' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title should update to the correct unicode value 金魚:
textarea[name=key_the_hobbit_title]: 金魚
#messages li: Localization succeeded: 1 key updated.
