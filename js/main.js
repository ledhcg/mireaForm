
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

  //Show Table Person
  var sizeOfDataPerson = 0;
function showTablePerson(){
    var html =``;

    var getDataPerson = firebase.database().ref('person');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var data = childSnapshot.val();
        html +=    `<div class="form-group">
                        <input onclick="$(this).attr('value', this.checked ? 1 : 0)" type="checkbox" name="${data.input_id}" id="${data.input_id}"" class="checkbox-input" value="0"/>
                        <label for="${data.input_id}" class="checkbox-label">
                            <div class="checkbox-text">
                                <p class="checkbox-text--title">${data.name}</p>
                                <p class="checkbox-text--description">Ấn để <span class="un">bỏ</span> chọn!</p>
                            </div>
                        </label>
                    </div>`;  
    });

    sizeOfDataPerson = snapshot.numChildren();
    document.getElementById('showPerson').innerHTML = html;
    html =``;
    });
}

showTablePerson();



//Reference messages collection
var dataRef = firebase.database().ref('data');

//Listen for form submit
document.getElementById('mireaForm').addEventListener('submit', submitForm);


//submit form 
function submitForm(e) {
    e.preventDefault();
    
    var countChecked = 0;
    
    //Get value
    var persons={};
    for(var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+i;
        console.log(key);
        var value = getInputValue(key);
        console.log(value);
        persons[key]=value;
        countChecked += parseInt(value);
    }

    //saveData
    if (countChecked === 3){
        saveData(persons);
        document.querySelector('.alertSuccessfully').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertSuccessfully').style.display = "none";
        }, 3000);
    } else {
        document.querySelector('.alertError').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertError').style.display = "none";
        }, 3000);
    }
}


//Function to get form values

function getInputValue(id){
    return document.getElementById(id).value;
}


//Save data to firebase

function saveData(persons){
    var newDataRef = dataRef.push();
    newDataRef.set(persons);
}


