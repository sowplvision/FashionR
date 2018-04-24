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
	}());
	
	$(document).ready(function(){
		const emailInput = document.getElementById('emailLog');
		const passInput = document.getElementById('passwordLog');
		const emailRegInput = document.getElementById('emailReg');
		const passwordReg = document.getElementById('passwordReg');
		const passwordCheck = document.getElementById('passwordCheck');
		const btnLogIn = document.getElementById('login');
		const btnGoogleLogIn = document.getElementById('googleLogIn');
		const btnFBLogIn = document.getElementById('facebookLogIn');
		const btnRegis = document.getElementById('register');
		const logout = document.getElementById('logout');
	  
		btnLogIn.addEventListener('click', function() {
			const email = emailInput.value;
			const passwd = passInput.value;
			const auth = firebase.auth();
			const promise = auth.signInWithEmailAndPassword(email, passwd);
			promise.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
				});
			
		});
	  
		btnRegis.addEventListener('click', function() {

			const emailReg = emailRegInput.value;
			const passwdReg1 = passwordReg.value;
			const passwdReg2 = passwordCheck.value;

			if(passwdReg1 === passwdReg2){
				const auth = firebase.auth();
				const promise = auth.createUserWithEmailAndPassword(emailReg, passwdReg1);
				promise.catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					alert("Error: "+errorMessage);
					});
				promise.then(function(){
					$.mobile.changePage('#loggedInPage');
				});
	  
			}else{
				Alert("Hasła się różnią");		
			}
	  
			
		});

		btnGoogleLogIn.addEventListener('click', function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				var user = result.user;
				console.log(user);
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
				});
		});

		btnFBLogIn.addEventListener('click', function() {
			var provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithPopup(provider).then(function(result) {
				var user = result.user;
				console.log(user);
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
		});
	});	  
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser){
				$.mobile.changePage('#loggedInPage');
			}else{
				$.mobile.changePage('#logInPage');
			}
		});
	  
		logout.addEventListener('click', function(){
			firebase.auth().signOut();
		});
	  });