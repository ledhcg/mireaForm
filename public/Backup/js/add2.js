/*



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




//Function to get form values

function getInputValue(id){
    return document.getElementById(id).value;
}

//Listen for form submit 
document.getElementById('addPersonMirea').addEventListener('submit', addPersonMirea);

//submit form 
function addPersonMirea(e) {
    e.preventDefault();
   
    //Get value
    var name = getInputValue('name');

    var id = getInputValue('id');

    saveDataPersonMirea(name,id);


    document.querySelector('.alertSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccessfully').style.display = "none";
    }, 3000);
}

//Save data person
function saveDataPersonMirea(name,  id){
    firebase.database().ref('checkPerson/'+ id).set({
        name: name,
        id: id,
        check: false
    });
}

showDataVotes();
function showDataVotes(){
    var count = 0;
    var html =``;
    
    var showDataVotes = firebase.database().ref('checkPerson');
    showDataVotes.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            count++;

            html +=` <tr>
                    <th scope="row">${count}</th>`;

            var data = childSnapshot.val();
            
                html += `
                        <td>${data.name}</td>
                        <td>${data.id}</td>
                        <td>${data.check}</td>`;   
            
            html += `</tr>`;
            
        });
        document.getElementById('tbodyPersonMirea').innerHTML = html;
        html =``;
        count = 0;
    });
}
