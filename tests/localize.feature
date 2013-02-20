Given I am at the '1/1/2' page
When I fill '#DAVE00' in the 'key_weird_color_setting' field
Then I click the 'Finished editing' button
Then the key_weird_color_setting field should NOT update:
#errors li: Invalid color string: must be a valid HTML hexadecimal color.

Given I am at the '1/1/2' page
When I fill '#FFFFFF' in the 'key_weird_color_setting' field
Then I click the 'Finished editing' button
Then the key_weird_color_setting field should update:
input[name=key_weird_color_setting]: #FFFFFF

Given I am at the '1/1/2' page
When I fill '#ff0000' in the 'key_weird_color_setting' field
Then I click the 'Finished editing' button
Then the key_weird_color_setting field should update:
input[name=key_weird_color_setting]: #ff0000

Given I am at the '1/1/2' page
When I uncheck the 'checkbox-key_website_christmas_snow_enabled' box
Then I click the 'Finished editing' button
Then the checkbox-key_website_christmas_snow_enabled should update to unchecked
input[name=checkbox-key_website_christmas_snow_enabled]: unchecked
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/2' page
When I check the 'checkbox-key_website_christmas_snow_enabled' box
Then I click the 'Finished editing' button
Then the checkbox-key_website_christmas_snow_enabled should update to checked
input[name=checkbox-key_website_christmas_snow_enabled]: checked
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/2' page
When I fill '2013-12-24' in the 'key_release_date' field
Then I click the 'Finished editing' button
Then the key_release_date should update to 2013-12-24
input[name=key_release_date]: 2013-12-24
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/2' page
When I fill '2014-01-01' in the 'key_release_date' field
Then I click the 'Finished editing' button
Then the key_release_date should update to 2014-01-01
input[name=key_release_date]: 2014-01-01
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/2' page
When I fill '2014-02-31' in the 'key_release_date' field
Then I click the 'Finished editing' button
Then the key_release_date should NOT update
#errors li: Invalid date

Given I am at the '1/1/2' page
When I fill 'Le' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should NOT update:
#errors li: Invalid text: must be at least 5 characters long.

Given I am at the '1/1/2' page
When I fill 'Le petit Hobbit is a very small Hobbit who does not come from Paris' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should NOT update:
#errors li: Invalid text: must be no more than than 20 characters long.

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
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/2' page
When I fill 'http://www.thehobbit.co.fr' in the 'key_the_hobbit_link' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_link field should update to http://www.thehobbit.co.fr:
textarea[name=key_the_hobbit_link]: http://www.thehobbit.co.fr
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/4' page
When I fill '金魚 HOBBIT' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should update to the correct unicode value 金魚 HOBBIT:
textarea[name=key_the_hobbit_title]: 金魚 HOBBIT
#messages li: Update succeeded: 1 record changed.

Given I am at the '1/1/4' page
When I fill '金魚' in the 'key_the_hobbit_title' field
Then I click the 'Finished editing' button
Then the key_the_hobbit_title field should update to the correct unicode value 金魚:
textarea[name=key_the_hobbit_title]: 金魚
#messages li: Update succeeded: 1 record changed.
