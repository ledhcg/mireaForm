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



//Get data votes
function getDataVotes(){

    var getDataVotes = firebase.database().ref('data');
    getDataVotes.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
        console.log(data);
        });
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


//showResult();


var sizeOfDataPerson = 0;
//Show Table Person

function showTablePerson(){
    
    var count = 0;
    var trVote = `  <th scope="col">#</th>
                <th scope="col">ID Ẩn danh</th>`;
    var html =``;
    var getDataPerson = firebase.database().ref('person');
    getDataPerson.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        count++;
        var data = childSnapshot.val();
        html +=    `<tr>
                    <th scope="row">${count}</th>
                    <td>${data.name}</td>
                    <td>${data.votes}</td>
                    <td>${data.percentage}</td>
                    </tr>`;  
        trVote += `<th scope="col">${data.name}</th>`;
    });

    //Size of Data Person
    sizeOfDataPerson = snapshot.numChildren();

    document.getElementById('tbodyPerson').innerHTML = html;
    document.getElementById('trVote').innerHTML = trVote;
    count = 0;
    html =``;
    trVote = `  <th scope="col">#</th>
                <th scope="col">ID Ẩn danh</th>`;
    });
}

//Change text
function changeText(number){
    if (parseInt(number)){
        var a = 'Bỏ phiếu';
        return a;
    } else {
        var a = '<strike>Trống</strike>';
        return a;
    }
}

//Function create ID Random

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = 'mirea_';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


function showDataVotes(){
    var count = 0;
    var html =``;
    
    var showDataVotes = firebase.database().ref('data');
    showDataVotes.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            count++;

            html +=` <tr>
                    <th scope="row">${count}</th>
                    <td>${randomString(8)}</td>`;

            var data = childSnapshot.val();
            for (var i = 0; i < sizeOfDataPerson; i++){
                var numberI = i + 1;
                var getText = 'person' + numberI; 
                html += `
                        <td>${changeText(data[getText])}</td>`;   
            }
            html += `</tr>`;
            
        });
        document.getElementById('tbodyVote').innerHTML = html;
        html =``;
        count = 0;
    });
}
showTablePerson();
showDataVotes();


function showResult(){ //Need fix
    var count = 0;
    var html =``;
    console.log('test');

    var getDataPerson = firebase.database().ref('person');
    var showDataVotes = firebase.database().ref('data');
    getDataPerson.on('value', function(snapshot) {
       
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
         console.log('Test22222222222222222: ', childSnapshot.key);
            var dataPerson = childSnapshot.val();
            var checkInputID = dataPerson.input_id;
            var votes = 0;
            var percentage = 0;
            showDataVotes.on('value', function(snapshot) {
                var sumTotalVotes = snapshot.numChildren();
                snapshot.forEach(function(childSnapshot) {
                var persons = childSnapshot.val();
                var dataVotes = childSnapshot.val();
                console.log('TestACX: ', sumTotalVotes);
                for (var person in persons){
                    console.log('Person: ', person);
                    console.log('checkInputID: ', checkInputID)
                    votes = parseInt(dataPerson.votes);
                    percentage = parseInt(dataPerson.percentage);
                    if (person === checkInputID){
                        
                            var ketqua = dataVotes[person];
                            console.log('Ketqua: ', ketqua);
                            if (parseInt(dataVotes[checkInputID])){
                                votes += parseInt(dataVotes[checkInputID]);
                                console.log('Ketqua234: ', votes);
                            }
                    }
                
                    percentage = votes/(sumTotalVotes*3);
                    console.log('%: ',percentage);
                    console.log('V: ',votes);
                }
                });
            });
        });
    });
}
