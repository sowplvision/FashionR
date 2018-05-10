var userSex = 'empty';
var preferencesValue = 'empty';
var favouritesValue = 'empty';
var userID = 'empty';

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

function getPreferences() {
    console.log("Preferences check getPref: ");
    console.log(preferencesValue);
    return preferencesValue;
}
function getGender() {
    console.log("Preferences check getGender: ");
    console.log(userSex);
    return userSex;
}
function getFavourites() {
    console.log("Preferences check getFav: ");
    console.log(favouritesValue);
    return favouritesValue;
}
function setFavourites(newFavourite) {
    if (favouritesValue){
        if (favouritesValue != 'empty') {
            favouritesValue.push(newFavourite);
        }
    } else {favouritesValue = newFavourite}
}
	
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
        const selectSex = document.getElementById('gender');
		var firstLogin = false;
		var userName = 'empty';
		var userFavourites = 'empty';
		var userInfo = 'empty';
		var isPreferencesSet = false;
		var isGenderSet = false;
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
		});

		$('a.logout').click(function() {
            firstLogin = false;
            userID = 'empty';
            userName = 'empty';
            userFavourites = 'empty'
            userInfo = 'empty';
            userSex = 'empty'
            preferencesValue = 'empty';
            favouritesValue = 'empty';
            isPreferencesSet = false;
            isGenderSet = false;
			firebase.auth().signOut();
		});
	  
		btnRegis.addEventListener('click', function() {

			const emailReg = emailRegInput.value;
			const passwdReg1 = passwordReg.value;
			const passwdReg2 = passwordCheck.value;

			if(passwdReg1 === passwdReg2){
				userName = emailReg;
				const auth = firebase.auth();
				const connect = auth.createUserWithEmailAndPassword(userName, passwdReg1);
				
				connect.catch(function(error) {
					var errorCode = error.code;
					var errorMessage = error.message;
					alert("Error: "+errorMessage);
					});
					connect.then(function(){
					userInfo = {
						name: userName,
						favourites: userFavourites,
						preferences: preferencesValue,
						gender: userSex
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
        var value = selectSex.options[selectSex.selectedIndex].value;
        if (value==='1'){
            userSex = 'woman';
            isGenderSet = true;
        }
        else if(value==='2'){
            userSex = 'man';
            isGenderSet = true;
        } else {isGenderSet = false;}
        if(isGenderSet) {
            var i = 0;
            var pref = [];
            $('.categoryCheckbox:checked').each(function () {
                pref[i] = $(this).attr('id');
                i++;
            });
            preferencesValue = pref;
            console.log("Preferences value from pref: "+preferencesValue);
            if(!isPreferencesSet) {
                if(preferencesValue=="") {
                    alert('Wybierz preferencje!')
                } else {
                    console.log("Preferences adding user");
                    userInfo = {
                        name: userName,
                        favourites: userFavourites,
                        preferences: preferencesValue,
                        gender: userSex
                    }
                    firebase.database().ref().child('users/'+userID).set(userInfo);
                    isPreferencesSet = true;
                    $.mobile.changePage('#loggedInPage');
                }
            } else {
                console.log("Preferences updating");
                var updates = {};
                updates['/users/' + userID + '/gender'] = userSex;
                updates['/users/' + userID + '/preferences'] = preferencesValue;
                firebase.database().ref().update(updates);
                $.mobile.changePage('#loggedInPage');
            }
        } else {
            alert('Wybierz płeć!')
        }
	});

        $('#favouriteBtn').click(function() {
            var url = localStorage.url;
            if (userFavourites == 'empty') {
                userFavourites = url;
            } else {
                userFavourites += url;
            }
            var updates = {};
            updates['/users/' + userID + '/favourites'] = userFavourites;
        });

        /*btnRemFav.addEventListener('click', function() {
            var url = localStorage.url;
            var newFavourites = [];
            var i = 0;

            for (var favourite in userFavourites){
            	if(favourite == url) {
            		i++;
				}
				newFavourites[i] = favourite;
            }
            if (newFavourites == "") {
                newFavourites == 'empty'
            }
            var updates = {};
            updates['/users/' + userID + '/favourites'] = newFavourites;
        });*/

		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser){
				userID = firebaseUser.uid;
                updateFirebase();
				if(firstLogin == true) {
					firebase.database().ref().child('users/'+userID).set(userInfo);
					firstLogin = false;
					$.mobile.changePage('#preferences');
				} else {
					firebase.database().ref('users/' + userID +'/preferences').once('value').then(function(snapshot) {
						preferencesValue = snapshot.val();
                        console.log("Preferences check login: ");
                        console.log(preferencesValue);
                        if(!preferencesValue) {
                            console.log("Preferences null");
                        	userName = firebaseUser.displayName;
                        	if(!userName) {userName = firebaseUser.email;}
                            $.mobile.changePage('#preferences');
						}else if (preferencesValue == 'empty') {
                            console.log("Preferences empty: "+preferencesValue);
                            $.mobile.changePage('#preferences');

                        } else {
                        	isPreferencesSet = true;
                            $.mobile.changePage('#loggedInPage');
                            console.log(firebaseUser.uid);
                        }
					});
				}
			}else{
				$.mobile.changePage('#logInPage');
			}
		});
	  });

function updateFirebase() {
    firebase.database().ref('users/' + userID +'/preferences').once('value').then(function(snapshot) {
        preferencesValue = snapshot.val();
    });
    firebase.database().ref('users/' + userID +'/gender').once('value').then(function(snapshot) {
        userSex = snapshot.val();
    });
    firebase.database().ref('users/' + userID +'/favourites').once('value').then(function(snapshot) {
        favouritesValue = snapshot.val();
    });
}