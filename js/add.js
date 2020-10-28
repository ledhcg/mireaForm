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

//Listen for form submit 
document.getElementById('addPersonForm').addEventListener('submit', submitAddPersonForm);

var dataPersonRef = firebase.database().ref('person');


//Function to get form values

function getInputValue(id){
    return document.getElementById(id).value;
}
//submit form 
function submitAddPersonForm(e) {
    e.preventDefault();
   
    //Get value
    var name = getInputValue('name');
    var input_id = getInputValue('input_id');
    var votes = getInputValue('votes');
    var percentage = getInputValue('percentage');

    saveDataPerson(name, input_id, votes, percentage);

    document.querySelector('.alertSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccessfully').style.display = "none";
    }, 3000);
}


//Save data person
function saveDataPerson(name, input_id, votes, percentage){
    var newDataPersonRef = dataPersonRef.push();
    newDataPersonRef.set({
        name: name,
        input_id: input_id,
        votes: votes, 
        percentage: percentage
    });
}


//Get data person
function getDataPerson(){

    var getDataPerson = firebase.database().ref('person');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var data = childSnapshot.val();
        console.log(data);
    });
});

}