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

console.log('Author: LE DINH CUONG');
console.log('Website: dinhcuong.me');
console.log('Email: dinhcuong.firewin99@gmail.com');
console.log('Facebook: @ledhcg');
console.log('Instagram: @ledhcg');
console.log('-----------------------------------------');
console.log('-----------------------------------------');
console.log('----///--------///////---------//////----');
console.log('----///--------///---///-----///---------');
console.log('----///--------///----///---///----------');
console.log('----///--------///----///---///----------');
console.log('----///--------///---///-----///---------');
console.log('----////////---///////--------///////----');
console.log('-----------------------------------------');
console.log('-----------------------------------------');
console.log('Project: Mirea Form');
console.log('Verson: 2.0');



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



  var personQuantityNeeded = 0;
   
//Function getQuantity
  function getQuantity(){
    var html=``;
    var html2=``;
    var getDataPerson = firebase.database().ref('quantity');
    getDataPerson.on('value', function(snapshot) {
        var data = snapshot.val();
            console.log('Quantity: ', data);
            html2 += `Lỗi: Cần ${data.value_needed} thành viên được chọn`;
            personQuantityNeeded = data.value_needed;
            html += `<strong>CÁCH THỨC BẦU CHỌN</strong></br> Lựa chọn ${data.value_needed} trong ${data.value_max} ứng viên phía dưới bằng cách ấn vào tên của họ. Bạn cần lựa chọn đủ, không thiếu không thừa thì mới có thể gửi phiếu đi. Để tránh số liệu ảo, chúng tôi chỉ cho phép bạn gửi đi một lần duy nhất.</p>`
            document.getElementById('textTutorial').innerHTML = html;
            document.getElementById('notiErrorVotesForm').innerHTML = html2;

    });
}

//localStorage.removeItem('key');
checkValid();


  //Show Table Person
  var sizeOfDataPerson = 0;
function showPerson(){
    var html =``;

    var getDataPerson = firebase.database().ref('person');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

        var data = childSnapshot.val();
        html +=    `<div class="form-group col">
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

//Check vavid
function checkValid(){

    var getDataCheck = firebase.database().ref('check');
    getDataCheck.on('value', function(snapshot) {
        var data = snapshot.val();
        var check = data.key;
        if (check == localStorage.getItem('key')){
            showStop();
            
        } else {
            showPerson();
            getQuantity();
            

            document.getElementById('showArenaChoosePerson').innerHTML = `<div class="input-group mb-3">
                                                                                <div class="input-group-prepend">
                                                                                <label class="input-group-text" for="inputGroupSelect01">Tên người bầu cử</label>
                                                                                </div>
                                                                                <select class="custom-select" id="inputGroupSelect01">
                                                                                    <!--Content-->
                                                                                </select>
                                                                            </div>`;
            showChooseName();
        }
    });
}

//
function showStop(){ 
    document.getElementById('stop').innerHTML = `<h1 class="title">Bạn đã bỏ phiếu thành công.</h1>`;
   
}


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
    var validValue={};
    for(var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+i;
        //console.log(key);
        var value = getInputValue(key);
        if (parseInt(value)) {
            var key = 'person'+i;
            validValue[key]=key;
            //updateCountVote(key);
        }
        //console.log(value);
        persons[key]= parseInt(value);
        countChecked += parseInt(value);
    }

    
    if (parseInt(getInputValue('inputGroupSelect01'))) {
        var idChooseName = parseInt(getInputValue('inputGroupSelect01'));
        console.log('id', idChooseName);
    } else {
        console.log('id', idChooseName);
        document.querySelector('.alertChooseName').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertChooseName').style.display = "none";
        }, 3000);
    }
        
    //saveData
   
    if (idChooseName){
        if (countChecked === personQuantityNeeded){
            for (var vV in validValue){
                //updateCountVote(vV);
                update(vV);
                console.log('Du lieu tu countVotes: ', vV);
            }
            saveData(persons);

            firebase.database().ref('checkPerson/'+ idChooseName).update({
                check: true
            });
            //localStorage
            localStorage.setItem('key','20201031');

            location.reload();
        } else {
            document.querySelector('.alertError').style.display = "block";
            setTimeout(function(){
                document.querySelector('.alertError').style.display = "none";
            }, 3000);
        } 
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




function updateCountVote(input_id){
    var votes = 0;
    var getDataPerson = firebase.database().ref('person');
        getDataPerson.on('value', function(snapshot) {
       
            snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            votes = parseInt(data.votes);
            console.log('VotesIn = ', votes);
        });
    });

    votes += 1;
    console.log('VotesOut = ', votes);
    firebase.database().ref('person/' + input_id).update({
        votes: votes,
    });
}


function update(input_id){
    var votes = 0;
    var getDataPerson = firebase.database().ref('countVotes');
        getDataPerson.on('value', function(snapshot) {
             var data = snapshot.val();
            votes = parseInt(data[input_id]);
            console.log('VotesIn = ', votes);
          
    });

    votes += 1;
    var valueVote={};
    
    valueVote[input_id]=votes;
    console.log('VotesOut = ', votes);
    firebase.database().ref('countVotes').update(valueVote);
}

//Show choose name 

function showChooseName(){
    var html =`<option value="0" selected>Chọn...</option>`;
    var getDataPerson = firebase.database().ref('checkPerson');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var data = childSnapshot.val();
        if (!(data.check)){
        html +=    `<option value="${data.id}">${data.name}</option>`;
        }  
    });
    document.getElementById('inputGroupSelect01').innerHTML = html;
    });

}

