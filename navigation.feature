Given I am at the '1/1/EN-US' page
When I select 'FR-FR' from the 'Language' menu
Then the French language for the sheet should load:
title: Edit "Game Introduction" in French

Given I am at the '1/1/FR-FR' page
When I select 'German' from the 'Language' menu
Then the German language for the sheet should load:
title: Edit "Game Introduction" in German

Given I am at the '1/1/FR-FR' page
When I fill 'title' in the 'Search' field
Then the English language for the sheet should load:
title: Edit "Game Introduction" in English
