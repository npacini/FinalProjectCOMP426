var firebaseConfig = {
    apiKey: "AIzaSyBHMsoiy760xxjxpwRW58fg2SAXu1ljfzY",
    authDomain: "finalprojectcomp426.firebaseapp.com",
    projectId: "finalprojectcomp426",
    storageBucket: "finalprojectcomp426.appspot.com",
    messagingSenderId: "478023448435",
    appId: "1:478023448435:web:16cf9918d1ee0307ab7706",
    measurementId: "G-JDXVVL663Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let loggedInUser;
  let loggedInUserName;
  let numCoins = 1000;
  let background = "";

function login(){
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      loggedInUser = user;
      background = "white"

      firebase.database().ref('background/'+loggedInUser.uid).on('value', function(snapshot){
        if(snapshot.val().Background == "white"){
           background = "white"
        }else if(snapshot.val().Background == "red"){
            background = "red"
        }
        loadPage();
    });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if(userEmail.length == 0){
        document.getElementById("message").innerHTML = "Please enter an email address."
        }
        else if(userPassword.length == 0){
            document.getElementById("message").innerHTML = "Please enter a password."
        }
        else{
            document.getElementById("message").innerHTML = "Invalid username and/or password." 
        }
    });

    document.getElementById("message").innerHTML =""
}

function signup(){
    document.getElementById("login-card").innerHTML = `
    <div class="card-title" id="cardTitleLabel">
    Sign Up
    </div>

    <div class="content">
    <input id="nameSU" placeholder="First Name" class="inputLine" />
    <input id="emailSU" placeholder="Email" class="inputLine" type="email"/>
    <input id="passwordSU" placeholder="Password" class="inputLine" type="password"/>
    <input id="confirmPassword" placeholder="Confirm Password" class="inputLine" type="password"/>

    <br>
    <br>

    <button class="Back" onclick="back()" id="signup">Back</button>
    <button class="Submit" onclick="submitSignUp()" id="go">Submit</button>

    <br>
    <br>
    <p id="message" class="errorMessage"></p>`
}

function back() {
    document.getElementById("login-card").innerHTML = `
        <div class="card-title" id="cardTitleLabel">
            Login
        </div>

        <br>

        <div class="content">
            <input id="email" placeholder="Email" class="inputLine" type="email"/>
            <input id="password" placeholder="Password" class="inputLine" type="password"/>

            <br>
            <br>
            <button class="SignUp-Button" onclick="signup()" id="go">Sign Up</button>
            <button class="Go-Button" onclick="login()" id="signup">Go</button>

            <br>
            <br>
            <br>
            <p id="message" class="errorMessage"></p>
        </div>
    `;
}

function submitSignUp() {

    let name = document.getElementById("nameSU").value;
    let userEmail = document.getElementById("emailSU").value;
    let userPassword = document.getElementById("passwordSU").value;
    let userPasswordConfirm = document.getElementById("confirmPassword").value;
    document.getElementById("message").innerHTML =""

    if(name.length == 0){
        document.getElementById("message").innerHTML = "Please enter your name."
    }
    else if(userEmail.length == 0){
        document.getElementById("message").innerHTML = "Please enter an email address."
    }
    else if(userPassword.length == 0){
        document.getElementById("message").innerHTML = "Please enter a password."
    }
    else if(userPasswordConfirm.length == 0){
        document.getElementById("message").innerHTML = "Please confirm your password."
    }
    else if(userPassword != userPasswordConfirm){
        document.getElementById("message").innerHTML = "Passwords don't match." 
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                loggedInUser = user;
                updateUser(name);
                background = "white";
                firebase.database().ref('background/'+loggedInUser.uid).set({
                    Background: "white"
                });
                firebase.database().ref('coins/'+loggedInUser.uid).set({
                    Coins: 1000
                });
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                alert(errorMessage);
            });
    }
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      // No user is signed in.
    }
});


function updateUser(name){
    loggedInUser.updateProfile({
        displayName: name,
      }).then(function() {
        // Update successful.

        loggedInUserName = name;
        loadPage();
      }).catch(function(error) {
        // An error happened.
      });
}
