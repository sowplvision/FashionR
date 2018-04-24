(function() {
	const config = {
    		apiKey: "AIzaSyCZy2Z-MotDZQbzo6ZF0M15xKX6TiQXL8U",
    		authDomain: "fashionr-dad0c.firebaseapp.com",
    		databaseURL: "https://fashionr-dad0c.firebaseio.com",
    		projectId: "fashionr-dad0c",
    		storageBucket: "fashionr-dad0c.appspot.com",
    		messagingSenderId: "623115610733"
  		};
  	firebase.initializeApp(config);
	
	$("#login").click(function() {
		var email = $('#email').val();
		var password = $('#password').val();
		
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert("Error: "+errorMessage);
		});
	});
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
		$.mobile.changePage('#loggedInPage');
	
	} else {
		console.log('Nie zalogowano!');
	}
	});
	
}());


function login() {
	var email = $('#email').val();
	var password = $('#password').val();
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert("Error: "+errorMessage);
	});
	

}