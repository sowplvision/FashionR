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
		var database = firebase.database();
		var firstLogin = false;
		var userID = 'empty';
		var userInfo = 'empty';
		var preferencesValue = null;
		const textInput = document.getElementById('firebaseText');
		const btnSubmit = document.getElementById('submit');
	  
		btnLogIn.addEventListener('click', function() {
			const email = emailInput.value;
			const passwd = passInput.value;
			const auth = firebase.auth();
			const connect = auth.signInWithEmailAndPassword(email, passwd);
			console.log("LOGOWANIE");
			console.log(connect);
			connect.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
				});
				/*firebase.onAuth(function(authData) {
					if (authData) {
						firebase.child('users').child(authData.uid).set({
							name: authData.google.displayName
						});*/
			
		});

		$('a.logout').click(function() {
			userID = 'empty';
			userInfo = 'empty';
			setPreferences = false;
			firebase.auth().signOut();
		});
	  
		btnRegis.addEventListener('click', function() {

			const emailReg = emailRegInput.value;
			const passwdReg1 = passwordReg.value;
			const passwdReg2 = passwordCheck.value;

			if(passwdReg1 === passwdReg2){
				const auth = firebase.auth();
				const connect = auth.createUserWithEmailAndPassword(emailReg, passwdReg1);
				
				connect.catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					alert("Error: "+errorMessage);
					});
					connect.then(function(){
					userInfo = {
						name: emailReg,
						favourites: 'empty',
						preferences: 'empty'
					}
					firstLogin = true;
				});
	  
			}else{
				Alert("Hasła się różnią");		
			}
	  
			
		});

		btnGoogleLogIn.addEventListener('click', function() {
			var provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(provider).then(function(result) {
				var token = result.credential.accessToken; 
				var user = result.user; 
				console.log("TOKEN: "+token); 
				console.log("USER"+user);
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
				});
		});

		btnFBLogIn.addEventListener('click', function() {
			var provider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithRedirect(provider).then(function(result) {
				var token = result.credential.accessToken; 
				var user = result.user; 
				console.log("TOKEN: "+token); 
				console.log("USER"+user);
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert("Error: "+errorMessage);
		});
	});	 

	btnSubmit.addEventListener('click', function() {
		var pref = textInput.value;
		if (preferencesValue == 'empty') {
			preferencesValue = pref;
		}
		else {
			preferencesValue = preferencesValue+", "+pref;
		}
		console.log(preferencesValue);
		var updates = {};
    	updates['/users/' + userID + '/preferences'] = preferencesValue;
		firebase.database().ref().update(updates);
		$.mobile.changePage('#loggedInPage');
	}); 

		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser){
				userID = firebaseUser.uid;
				if(firstLogin == true) {
					firebase.database().ref().child('users/'+userID).set(userInfo);
					firstLogin = false;
					$.mobile.changePage('#preferences');
				} else {
					firebase.database().ref('users/' + userID +'/preferences').once('value').then(function(snapshot) {
						preferencesValue = snapshot.val();
						console.log("Preferences check login: "+preferencesValue);
					});
					if (preferencesValue == 'empty') {
						$.mobile.changePage('#preferences');
						console.log("Preferences empty "+preferencesValue);
						
					} else {
						$.mobile.changePage('#loggedInPage');
						console.log(firebaseUser.uid);
					}
				}
			}else{
				$.mobile.changePage('#logInPage');
			}
		});
	  });