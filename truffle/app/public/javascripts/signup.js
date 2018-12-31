window.onload = function() {
	$("form").submit(validate);
}

function validate() {
	if ($('#pw').val() == $('#cpw').val()) {
		return true;
	}
	return false;
}