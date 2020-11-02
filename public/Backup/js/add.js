/*
-----------------------------------------
Author: LE DINH CUONG
Website: dinhcuong.me
Email: dinhcuong.firewin99@gmail.com
Facebook: @ledhcg
Instagram: @ledhcg
-----------------------------------------
-----------------------------------------
----***--------******----------******----
----***--------***---***-----***---------
----***--------***----***---***----------
----***--------***----***---***----------
----***--------***---***-----***---------
----********---******----------******----
-----------------------------------------
Project: Mirea Form
Verson: 2.0
*/


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

//var dataPersonRef = firebase.database().ref('person');


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
    var id = getInputValue('id');
    var votes = getInputValue('votes');
    var percentage = getInputValue('percentage');

    saveDataPerson(name, input_id, votes, percentage, id);
    saveDataCount(input_id, id);

    document.querySelector('.alertSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccessfully').style.display = "none";
    }, 3000);
}


//Save data person
function saveDataPerson(name, input_id, votes, percentage, id){
    firebase.database().ref('person/person'+ id).set({
        name: name,
        input_id: input_id,
        votes: votes, 
        percentage: percentage
    });
}

function saveDataCount(input_id){
    
    firebase.database().ref('count/'+ input_id).set({
        input_id: input_id,
        votes: 0, 
    });
}



document.getElementById('updateQuantity').addEventListener('submit', updateQuantity);

function updateQuantity(){
    var value_max = getInputValue('value_max');
    var value_needed = getInputValue('value_needed');
    console.log('Value: ', value_max, value_needed);
    firebase.database().ref('quantity').set({
        value_max: parseInt(value_max),
        value_needed: parseInt(value_needed)
    });
    document.querySelector('.alertUpdateSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertUpdateSuccessfully').style.display = "none";
    }, 3000);
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

getDataPerson();

//Get quantity max
var quantity_max = 0;
var getDataQuantity = firebase.database().ref('quantity');
    getDataQuantity.on('value', function(snapshot) {
        var data = snapshot.val();
        quantity_max = data.value_max;
    });


document.getElementById('updateResult').addEventListener('submit',   updateResult);
  

function updateResult(){

    var countResult={};
    var count = 0;
    for(var i = 1; i <= quantity_max; i++){
        var key = 'person'+i;
        var value = getInputValue(key);
        count += parseInt(value);
        countResult[key]= parseInt(value);
    }
    countResult['total'] = parseInt(count);
    firebase.database().ref('countVotes').update(countResult);

    var data={};
    var getDataPerson = firebase.database().ref('person');
        getDataPerson.on('value', function(snapshot) {
       
            snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            //votes = parseInt(data.votes);
            //console.log('VotesIn = ', votes);
        });
    });

    for(var i = 1; i <= quantity_max; i++){
        var key = 'person'+i;
        firebase.database().ref('person/' + key).update({
            votes: countResult[key],
            percentage: (countResult[key]/countResult['total']*100).toFixed(2)
        });
    }
}
showPerson();
function showPerson(){
    var html =``;

    var getDataPerson = firebase.database().ref('person');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var data = childSnapshot.val();
        html +=    `    <div class="form-group col">
                            <label for="${data.input_id}">${data.name}</label>
                            <input type="number" class="form-control" id="${data.input_id}" placeholder="${data.input_id}">
                        </div>`;  
    });
    document.getElementById('showPerson').innerHTML = html;
    html =``;
    });
}



//Listen for form submit 
document.getElementById('addPersonMirea').addEventListener('submit', addPersonMirea);

//submit form 
function addPersonMirea(e) {
    e.preventDefault();
   
    //Get value
    var name = getInputValue('name');
    var check = getInputValue('check');
    var id = getInputValue('id');

    saveDataPersonMirea(name, check, id);


    document.querySelector('.alertSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccessfully').style.display = "none";
    }, 3000);
}

//Save data person
function saveDataPersonMirea(name, check, id){
    firebase.database().ref('checkPerson/'+ id).set({
        name: name,
        id: id,
        check: check
    });
}
