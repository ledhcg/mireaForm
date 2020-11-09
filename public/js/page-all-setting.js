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

//Random Unit ID
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = 'mirea-';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    str += uuidv4();
    return str;
}


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



  //Get size of Data Persion Mirea
  var sizeOfDataPersonMirea = 0;
  const getDataPersonMirea = firebase.database().ref('checkPerson');
  getDataPersonMirea.on('value', function(snapshot) {
  sizeOfDataPersonMirea = snapshot.numChildren();
  });

  //Get size of Data Persion 
  var sizeOfDataPerson = 0;
  const getDataPerson = firebase.database().ref('person');
  getDataPerson.on('value', function(snapshot) {
  sizeOfDataPerson = snapshot.numChildren();
  });
  
//Get quantity max
var quantity_max = 0;
var getDataQuantity = firebase.database().ref('quantity');
    getDataQuantity.on('value', function(snapshot) {
        var data = snapshot.val();
        quantity_max = data.value_max;
    });



//Listen for form submit 
document.getElementById('addPersonForm').addEventListener('submit', submitAddPersonForm);


//Function to get form values

function getInputValue(id){
    return document.getElementById(id).value;
}
//submit form 
function submitAddPersonForm(e) {
    e.preventDefault();
   
    //Get value
    var name = getInputValue('name');
    var id = getInputValue('id');
    var input_id = 'person' + id;

    saveDataPerson(name, input_id, id);

    document.querySelector('.alertSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccessfully').style.display = "none";
    }, 3000);
}


//Save data person
function saveDataPerson(name, input_id, id){
    firebase.database().ref('person/person'+ id).set({
        name: name,
        input_id: input_id,
        votes: 0, 
        percentage: 0,
    });
}


//--------------------------------------------------------
showTablePerson();
function showTablePerson(){
   
    

    let count = 0;
    var html =``;
    const getDataPerson = firebase.database().ref('person').orderByChild('votes');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        const data = childSnapshot.val();
        count++;
        html +=    `<tr>
                    <th scope="row">${count}</th>
                    <td>${data.name}</td>
                    <td>${data.votes} (${data.percentage}%)</td>
                    <td>
                    
                    <div class="progress" style="height: 15px;">
                        <div class="progress-bar progress-striped" role="progressbar" style="width: ${data.percentage}%; text-align: left;" aria-valuenow="${data.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                      
                    </td>
                    </tr>`;  
    });

    sizeOfDataPerson = snapshot.numChildren();

    document.getElementById('tbodyPerson').innerHTML = html;
 
    count = 0;
    html =``;
    });
     
}


//--------------------------------------------------------

document.getElementById('setQuantity').addEventListener('submit', setQuantity);

function setQuantity(e){
    e.preventDefault();
    var value_max = getInputValue('value_max');
    var value_needed = getInputValue('value_needed');
    //console.log('Value: ', value_max, value_needed);
    firebase.database().ref('quantity').set({
        value_max: parseInt(value_max),
        value_needed: parseInt(value_needed)
    });
    document.querySelector('.alertSetQuantitySuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSetQuantitySuccessfully').style.display = "none";
    }, 3000);
}

//--------------------------------------------------------

document.getElementById('setCodeCheck').addEventListener('submit', setCodeCheck);

function setCodeCheck(e){
    e.preventDefault();
    var check = getInputValue('code_check');
    firebase.database().ref('check').set({
        key: check
    });
    document.querySelector('.alertSetCodeCheckSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSetCodeCheckSuccessfully').style.display = "none";
    }, 3000);
}





//----------------------------------

//Listen for form submit 
document.getElementById('addPersonMirea').addEventListener('submit', addPersonMirea);

//submit form 
function addPersonMirea(e) {
    e.preventDefault();
   
    //Get value
    var fullname = getInputValue('fullname_mirea');

    var name = getInputValue('name_mirea');

    var id = getInputValue('id_mirea');

    var email = getInputValue('email_mirea');

    saveDataPersonMirea(name, id, fullname, email);


    document.querySelector('.alertAddPersionMireaSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertAddPersionMireaSuccessfully').style.display = "none";
    }, 3000);
}

//Save data person
function saveDataPersonMirea(name,  id, fullname, email){
    firebase.database().ref('checkPerson/'+ id).set({
        name: name,
        fullname: fullname,
        id: id,
        email: email,
        code: randomString(5),
        check: false
    });
}


showDataPersonMirea();
function showDataPersonMirea(){
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
                        <td>${data.id}</td>
                        <td>${data.fullname}</td>
                        <td>${data.name}</td>
                        <td>${data.code}</td>
                        <td>${data.email}</td>`;  
                if (data.check){
                     html +=`    <td>
                                       <span class="badge bg-success">Đã bầu cử</span>
                                   </td>`;
                 } else {
                       html +=`     <td>
                                    <span class="badge bg-danger">Chưa bầu cử</span>
                                </td>`;
                 } 
            
            html += `</tr>`;
            
        });
        document.getElementById('tbodyPersonMirea').innerHTML = html;
        html =``;
        count = 0;
    });
}

function resetPerson(){
    // Set Person's Votes == 0
    for(var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+i;
        firebase.database().ref('person/' + key).update({
            votes: 0,
            percentage: 0
        });
    }
    //Set CountVotes == 0
    var result = {};
    for (var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+ i;
        console.log('key: ', key);
        result[key] = 0;
    }
    result['total'] = 0;
    firebase.database().ref('countVotes').update(result);

    firebase.database().ref('data').remove();

    document.querySelector('.alertResetPersonSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertResetPersonSuccessfully').style.display = "none";
    }, 3000);
}

function resetPersonMirea(){
    for(var i = 1; i <= sizeOfDataPersonMirea; i++){
        firebase.database().ref('checkPerson/' + i).update({
            check: false
        });
    }
    document.querySelector('.alertResetPersonMireaSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertResetPersonMireaSuccessfully').style.display = "none";
    }, 3000);
}

function resetAll(){

    firebase.database().ref('data').remove();
    firebase.database().ref('person').remove();
    firebase.database().ref('countVotes').remove();
    firebase.database().ref('checkPerson').remove();
    firebase.database().ref('countVotes').set({
        total: 0
    });
    firebase.database().ref('quantity').set({
        value_max: 0,
        value_needed: 0
    });
    firebase.database().ref('check').set({
        key: "Default"
    });
    document.querySelector('.alertResetAllSuccessfully').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertResetAllSuccessfully').style.display = "none";
    }, 3000);
}


function showTableListPersionMirea(){
    document.querySelector('.tableListPersionMirea').style.display ='block';
}

function hiddenTableListPersionMirea(){
    document.querySelector('.tableListPersionMirea').style.display = 'none';
}

function showTablePersion(){
    document.querySelector('.tablePersion').style.display ='block';
}

function hiddenTablePersion(){
    document.querySelector('.tablePersion').style.display = 'none';
}


