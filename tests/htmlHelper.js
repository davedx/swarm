/**
 * Gets "any sensible value" from a DOM and a CSS selector:
 * For <input type="text">, use the 'value' attribute
 * For <input type="checkbox">, use whether the 'checked' attribute is set (to 'checked')
 * For <textarea> and other containing elements, use the inner HTML content
 */
exports.getAnyValue = function(browser, selector) {
	var q = browser.query(selector);
	var actualValue = undefined;
	if(q && q._attributes) {

		var t = '';
		if(q._attributes['type'] !== undefined)
			t = q._attributes['type']._nodeValue;
		if(t === 'checkbox') {
			if(q._attributes['checked'] !== undefined && q._attributes['checked']._nodeValue == 'checked')
				actualValue = 'checked';
			else
				actualValue = 'unchecked';
		} else if(q._attributes['value'] !== undefined) {
			actualValue = q._attributes['value']._nodeValue;
		}
	}
	var actualText = browser.text(selector);
	if(actualText === '' && actualValue !== undefined)
		return actualValue;
	else
		return actualText;
}