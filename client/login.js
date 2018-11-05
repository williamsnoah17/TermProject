firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.
    document.getElementById("in_div").style.display = "none";
    document.getElementById("out_div").style.display = "initial";
} else {
    // No user is signed in.
    document.getElementById("in_div").style.display = "initial";
    document.getElementById("out_div").style.display = "none";
}
});

function login() {

	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;

  	window.alert("Error : " + errorMessage);
  // ...
});

}