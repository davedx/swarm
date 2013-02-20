Given I am at the '1/1/1/keys/1' page
When I fill 'test123*' in the 'key_name' field
Then I click the 'Update' button
Then the key_name field should NOT update:
#errors li: Invalid key name: may only contain a-z and _.

Given I am at the '1/1/1/keys/1' page
When I fill 'html_hithere' in the 'key_name' field
Then I click the 'Update' button
Then the key_name field should update:
input[name=key_name]: html_hithere

Given I am at the '1/1/1/keys/1' page
When I fill 'the_hobbit_title' in the 'key_name' field
Then I click the 'Update' button
Then the key_name field should update:
input[name=key_name]: the_hobbit_title

Given I am at the '1/1/1/keys/1' page
When I fill 'The Hobbit Movie' in the 'key_value' field
Then I fill '6' in the 'constraints[minlen]' field
Then I fill '10' in the 'constraints[maxlen]' field
Then I fill 'The title of the game must be entered here.' in the 'key_help' field
Then I click the 'Update' button
Then the key fields should all update:
textarea[name=key_value]: The Hobbit Movie
input[name=constraints\[minlen\]]: 6
input[name=constraints\[maxlen\]]: 10
textarea[name=key_help]: The title of the game must be entered here.

Given I am at the '1/1/1/keys/1' page
When I fill 'The Hobbit' in the 'key_value' field
Then I fill '5' in the 'constraints[minlen]' field
Then I fill '20' in the 'constraints[maxlen]' field
Then I fill 'The title of the game must be entered here. Please consider this is a very high visibility string.' in the 'key_help' field
Then I click the 'Update' button
Then the key fields should all update:
textarea[name=key_value]: The Hobbit
input[name=constraints\[minlen\]]: 5
input[name=constraints\[maxlen\]]: 20
textarea[name=key_help]: The title of the game must be entered here. Please consider this is a very high visibility string.

Given I am at the '1/1/1/keys/new' page
When I fill 'dwarf_one_name' in the 'key_name' field
Then I fill 'Balin' in the 'key_value' field
Then I fill '4' in the 'constraints[minlen]' field
Then I fill '10' in the 'constraints[maxlen]' field
Then I fill 'Balin is one of the dwarves. His name will not usually be localized in most languages.' in the 'key_help' field
Then I click the 'Create' button
Then the key should be created and returned for further editing:
#messages li: Create successful: One record added.
input[name=key_name]: dwarf_one_name
textarea[name=key_value]: Balin
input[name=constraints\[minlen\]]: 4
input[name=constraints\[maxlen\]]: 10
textarea[name=key_help]: Balin is one of the dwarves. His name will not usually be localized in most languages.
