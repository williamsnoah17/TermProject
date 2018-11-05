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

	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

	}).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;

  	window.alert("Error : " + errorMessage);

  // ...
	});

}

function logout() {
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		document.location.href = "index.html";
  	}).catch(function(error) {
  		// An error happened.
  		var errorMessage = error.message;
  		window.alert("Error : " + errorMessage);
  	});

  }

  function createAccount() {

  	var email = document.getElementById("new_email_field").value;
  	var password = document.getElementById("new_password_field").value;

  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
 		 // ...
 	 window.alert("Error : " + errorMessage);
	});
  }