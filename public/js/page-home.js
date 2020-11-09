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

   //Authentication
   firebase.auth().onAuthStateChanged(function (user) {
    if (!user){
        //console.log('user logged in: ', user);
        window.location.replace('page-login.html');
    } 
  });

  function logout(){
    firebase.auth().signOut().then(function() {
        window.location.replace('page-login.html');
      }).catch(function(error) {
        alert(error);
      });
  }