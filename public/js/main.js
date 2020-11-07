console.log('Author: LE DINH CUONG');
console.log('Website: dinhcuong.me');
console.log('Email: dinhcuong.firewin99@gmail.com');
console.log('Facebook: @ledhcg');
console.log('Instagram: @ledhcg');
console.log(`
|----------------------------------------|
|---***---------******----------******---|
|---***---------***---***-----***--------|
|---***---------***----***---***---------|
|---***---------***----***---***---------|
|---***---------***---***-----***--------|
|---*********---******----------******---|
|----------------------------------------|

|----------------------------------------|
|-------------------------**-------------|
|----------------------**--*-------------|
|--------------------**---**-------------|
|-------------------**---**--------------|
|------------------**---**---------------|
|-----------------*******-*******--------|
|-------------******--**-**--------------|
|----------***----**-****----------------|
|--------***------******---------*-------|
|-------***------***--***********--------|
|--------**-----**-*----******-----------|
|----------*****----*--------------------|
|--------------------*-------------------|
|---------------------*------------------|
|-----------------------*----------------|
|----------------------------------------|

`);

console.log('Project: Mirea Form');
console.log('Verson: 0.9');


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
            //console.log('Quantity: ', data);
            html2 += `LỖI: Cần ${data.value_needed} thành viên được chọn`;
            personQuantityNeeded = data.value_needed;
            html += `<h5 class="alert-heading text-center"><strong>CÁCH THỨC BẦU CHỌN</strong></h5>
            <p class="text-center">Lựa chọn ${data.value_needed} trong ${data.value_max} ứng viên phía dưới bằng cách ấn vào tên của họ. Bạn cần lựa chọn đủ, không thiếu không thừa thì mới có thể gửi phiếu đi. Để tránh số liệu ảo, chúng tôi chỉ cho phép bạn gửi đi một lần duy nhất.</p>`;
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
        html +=    `<div class="col-md-6 col-12">
                        <input onclick="$(this).attr('value', this.checked ? 1 : 0)" type="checkbox" name="${data.input_id}" id="${data.input_id}" class="checkbox-input" value="0"/>
                        <label for="${data.input_id}" class="checkbox-label">
                            <div class="checkbox-text">
                                <p class="checkbox-text--title">${data.name}</p>
                                <p class="checkbox-text--description">Ấn để <span class="un">bỏ</span> chọn!</p>
                            </div>
                        </label>
                    </div>`;  
    });

         html += `  <div class="col-md-6 col-12">
                        <image class="center-image" src="https://media.giphy.com/media/js5HuiISwySuBbj34z/giphy.gif"></image>                      
                    </div>`;

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
            document.getElementById('mireaForm').innerHTML = `      <div class="alert alert-info" id="textTutorial">
                                                                        <!--Content for textTutorial-->
                                                                    </div>
                                                                    <div class="row" id="showPerson">
                                                                        <!--Content for showPerson-->
                                                                    </div>
                                                                        <a style="margin-top: 20px"></a>
                                                                    <div class="row">
                                                                    
                                                                        <div class="col-md-6 col-12" id="showInputCode">
                                                                        <!--Content for showInputCode-->
                                                                        </div>
                                                                        <div class="col-md-6 col-12" id="showArenaChoosePerson">
                                                                        <!--Content for showArenaChoosePerson-->
                                                                        </div>

                                                                        <div class="col-12 d-flex justify-content-center" style="margin: 20px 0px;">
                                                                            <button type="submit" class="btn btn-lg btn-primary btn-block">GỬI ĐI</button>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div class="alert alert-light-danger color-danger text-center alertError" style="display: none;" id="notiErrorVotesForm"><strong><!--Content for notiErrorVotesForm--></strong></div>
                                                                    <div class="alert alert-light-danger color-danger text-center alertCodeValidWrong" style="display: none;"><strong>LỖI - Tên và mã cá nhân không khớp.</strong></div>
                                                                    <div class="alert alert-light-danger color-danger text-center alertCodeValidNull" style="display: none;"><strong>LỖI - Vui lòng điền mã cá nhân của bạn.</strong></div>
                                                                    <div class="alert alert-light-danger color-danger text-center alertChooseName" style="display: none;"><strong>LỖI - Vui lòng chọn tên của bạn.</strong></div>`;
            showPerson();
            getQuantity();
            document.getElementById('showInputCode').innerHTML = ` <h6>MÃ ID CÁ NHÂN</h6>
                                                                     <div class="form-group" >
                                                                         <input type="text" id="inputCodeValid" class="form-control form-control-lg" name="inputCodeValid"
                                                                             placeholder="Dán ID từ email của bạn">
                                                                     </div>`;

            document.getElementById('showArenaChoosePerson').innerHTML = ` <h6>NGƯỜI BẦU CỬ</h6>
                                                                            <div class="form-group">
                                                                                <select class="form-select form-select-lg"id="inputGroupSelect01" >
                                                                                 
                                                                                        <!--Content for inputGroupSelect01-->
                                                                                   
                                                                                    
                                                                                </select>
                                                                            </div>`;
            showChooseName();
            
        }
    });
}

//
function showStop(){ 
    document.getElementById('mireaForm').innerHTML = `<div class="alert alert-success text-center text-white text-success">Cảm ơn. Bạn đã bỏ phiếu thành công.</div>
                                                        <image class="center-image-success" src="https://media.giphy.com/media/eh7Uqh7n6HRjHQLs3y/giphy.gif"></image>`;
   
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
    //var validValue={};
    for(var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+i;
        //console.log(key);
        var value = getInputValue(key);
        /*
        if (parseInt(value)) {
            var key = 'person'+i;
            validValue[key]=key;
            //updateCountVote(key);
        }
        */
        //console.log(value);
        persons[key]= parseInt(value);
        countChecked += parseInt(value);
    }

    
    if (parseInt(getInputValue('inputGroupSelect01'))) {
        var idChooseName = parseInt(getInputValue('inputGroupSelect01'));
        //console.log('id', idChooseName);
    } else {
        //console.log('id', idChooseName);
        document.querySelector('.alertChooseName').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertChooseName').style.display = "none";
        }, 3000);
    }
        
    if (getInputValue('inputCodeValid')) {
        var codeValid = getInputValue('inputCodeValid');
        //console.log('codeValid', codeValid);
    } else {
        //console.log('codeValid', codeValid);
        document.querySelector('.alertCodeValidNull').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertCodeValidNull').style.display = "none";
        }, 3000);
    }
    //saveData
    

    if (checkCode(idChooseName, codeValid)){
        if (countChecked === personQuantityNeeded){
            /*
            for (var vV in validValue){
                update(vV);
            }
            */
            saveData(persons);
            firebase.database().ref('checkPerson/'+ idChooseName).update({
                check: true
            });

            localStorage.setItem('key','20201031');

            location.reload();
        } else {
            document.querySelector('.alertError').style.display = "block";
            setTimeout(function(){
                document.querySelector('.alertError').style.display = "none";
            }, 3000);
        } 
    } else {
        document.querySelector('.alertCodeValidWrong').style.display = "block";
        setTimeout(function(){
            document.querySelector('.alertCodeValidWrong').style.display = "none";
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


/*

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
            //console.log('VotesIn = ', votes);
          
    });

    votes += 1;
    var valueVote={};
    
    valueVote[input_id]=votes;
    //console.log('VotesOut = ', votes);
    firebase.database().ref('countVotes').update(valueVote);
}



*/



//Show choose name 

function showChooseName(){
    //var html=``;
    var html =`<option class="style-select-option-0" selected value="0">Chọn tên của bạn</option>`;
    var getDataPerson = firebase.database().ref('checkPerson');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var data = childSnapshot.val();
        if (!(data.check)){
        html +=    `<option class="style-select-option" value="${data.id}">${data.name}</option>`;
        }  
    });
    document.getElementById('inputGroupSelect01').innerHTML = html;
    });

}


//Check code person


function checkCode(id, code){
    var result = false;
    var getDataCheckCode = firebase.database().ref('checkPerson');
    getDataCheckCode.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var data = childSnapshot.val();
            //console.log('ID checkCode ', data.id);
            //console.log('Code checkCode ', data.code);
            if (parseInt(data.id) === id && data.code === code){
                //console.log('ID Success ', data.id);
                //console.log('Code Success ', data.code);
                result = true;
            }
        });
    });
    return result;
}
