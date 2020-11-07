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




  




/*

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
*/


//showResult();


var sizeOfDataPerson = 0;
//Show Table Person

function showTablePerson(){
    var htmlDataCountVotes =``;
    const getDataCountVotes = firebase.database().ref('countVotes');
    getDataCountVotes.on('value', function(snapshot) {
            const dataCountVotes = snapshot.val();
            htmlDataCountVotes += `<h1 class='mt-5' >Tổng số phiếu: ${dataCountVotes.total}</h1>`;
            document.getElementById('showTotalVotes123').innerHTML = htmlDataCountVotes;
    });
    

    let count = 0;
    var trVote = `  <th scope="col">#</th>
                <th scope="col">ID Ẩn danh</th>`;
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
                        <div class="progress-bar progress-striped" role="progressbar" style="width: ${data.percentage}%; text-align: left; padding-left:15px;" aria-valuenow="${data.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                      
                    </td>
                    </tr>`;  
        trVote += `<th scope="col">${data.name}</th>`;


    });

    sizeOfDataPerson = snapshot.numChildren();

    document.getElementById('tbodyPerson').innerHTML = html;
    document.getElementById('trVote').innerHTML = trVote;
    count = 0;
    html =``;
    trVote = `  <th scope="col">#</th>
                <th scope="col">ID Ẩn danh</th>`;
    showChart();  
    });
     
}

//Show Chart
function showChart(){
    let arrayDataPerson = [];
    let arrayDataVote = [];
    const addPerson = person => {
        const newArrayDataPerson = [...arrayDataPerson];
        newArrayDataPerson.push(person);
        arrayDataPerson = newArrayDataPerson;
    }
    const addVote = vote => {
        const newArrayDataVote = [...arrayDataVote];
        newArrayDataVote.push(vote);
        arrayDataVote = newArrayDataVote;
    }
    const getDataPerson = firebase.database().ref('person').orderByChild('votes');
    getDataPerson.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const data = childSnapshot.val();
            addPerson(data.name);
            addVote(data.votes);
        });
        //console.log("Array: ",arrayDataPerson); 
        pushDataToChart(arrayDataPerson, arrayDataVote);
    });

}

function pushDataToChart(arrayDataPerson, arrayDataVote){

    var ctxBar = document.getElementById("bar").getContext("2d");
    var myBar = new Chart(ctxBar, {
        
    type: 'bar',
    data: {
        labels: arrayDataPerson,
        datasets: [{
        label: 'Votes',
        backgroundColor: [chartColors.grey, chartColors.grey, chartColors.blue, chartColors.blue, chartColors.blue, chartColors.blue, chartColors.blue],
        data: arrayDataVote
        }]
    },
    options: {
        responsive: true,
        barRoundness: 1,
        title: {
        display: false,
        text: "Chart"
        },
        legend: {
        display:false
        },
        scales: {
        yAxes: [{
            ticks: {
            beginAtZero: true,
            suggestedMax: 30 + 20,
            padding: 10,
            },
            gridLines: {
            drawBorder: false,
            }
        }],
        xAxes: [{
                gridLines: {
                    display:false,
                    drawBorder: false
                }
            }]
        }
    }
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


var result = {};
function showResult(){     
    for (var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person'+ i;
        console.log('key: ', key);
        result[key] = 0;
    }
    result['total'] = 0;
    
    //console.log('Result before: ',result);
    
    var getDataVotes = firebase.database().ref('data');
    getDataVotes.on('value', function(snapshot) {
       
        snapshot.forEach(function(childSnapshot) {
     
            var dataVotes = childSnapshot.val();
            for (var i = 1; i <= sizeOfDataPerson; i++){
                var key = 'person'+ i;
                console.log('key: ', key);
                console.log('vote: ', dataVotes[key]);
                result[key] += parseInt(dataVotes[key]);
                result['total'] += dataVotes[key];
            }
        });
    });
    //console.log('Result after: ', result);
    
}

function updateResult(){
    showResult();
    for (var i = 1; i <= sizeOfDataPerson; i++){
        var key = 'person' + i;
        console.log('key: ', key);
        firebase.database().ref('person/' + key).update({
            votes: result[key],
            percentage: (result[key]/result['total']*100).toFixed(2)
        });
        firebase.database().ref('countVotes').update(result);
    }
    document.querySelector('.alertSuccess').style.display = "block";
    setTimeout(function(){
        document.querySelector('.alertSuccess').style.display = "none";
        location.reload();
    }, 3000);
    //showTablePerson();
    //document.querySelector('.showTableResult').style.display ='block';
    //document.querySelector('.preloadResult').style.display = 'none';
    //document.querySelector('.preloadResult1').style.display = 'none'; 
}


function showDisplay(){
    showTablePerson();
    showDataVotes();
    document.querySelector('.showTableResult').style.display ='block';
    document.querySelector('.preloadResult').style.display = 'none';
    document.querySelector('.preloadResult1').style.display = 'none'; 
    document.querySelector('.preloadResult2').style.display = 'none'; 
    document.querySelector('.preloadResult3').style.display = 'none'; 
}


//Show Person of Mirea
showDataPersonMirea();
function showDataPersonMirea(){
    var count = 0;
    var html =``;
    
    var showDataPersonMirea = firebase.database().ref('checkPerson');
    showDataPersonMirea.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            count++;

            html +=` <tr>
                    <th scope="row">${count}</th>`;

            var data = childSnapshot.val();
            
                html += `
                        <td>${data.name}</td>
                        <td>${data.id}</td>`;
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