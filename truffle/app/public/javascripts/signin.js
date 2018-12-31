//signin.js

window.onload = function() {
  	$("form").submit(login);
}

function login() {
	return $("#username").val() != "" && $("#password").val() != "";
}