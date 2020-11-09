var firebaseConfig = {
    apiKey: "AIzaSyC0hWE4guEcI63vPVvQv9vSpiCY37aXgtw",
    authDomain: "mirea-form-phieubaucu.firebaseapp.com",
    databaseURL: "https://mirea-form-phieubaucu.firebaseio.com",
    projectId: "mirea-form-phieubaucu",
    storageBucket: "mirea-form-phieubaucu.appspot.com",
    messagingSenderId: "15447096967",
    appId: "1:15447096967:web:c9ccd3749f316277194222",
    measurementId: "G-87PEQ8P6NK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user){
        //console.log('user logged in: ', user);
        window.location.replace('page-home.html');
    } 
  });

  document.getElementById('formLogin').addEventListener('submit', login);

  function login(e){
    e.preventDefault();
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      console.log('email: ', email);
      console.log('password: ', password);

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        /*

        document.getElementById('alertFail').innerHTML = `${errorMessage}`;

        document.querySelector('.alertLoginFail').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertLoginFail').style.display = "none";
        }, 3000);
        // ...
        */
      });
  }

  
  

