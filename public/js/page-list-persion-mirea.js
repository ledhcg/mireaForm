
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


showDataVotes();
function showDataVotes(){
    var count = 0;
    var html =``;
    
    var showDataVotes = firebase.database().ref('checkPerson').orderByChild('name');
    showDataVotes.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            count++;

            html +=` <tr>
                    <th scope="row">${count}</th>`;

            var data = childSnapshot.val();
            
                html += `
                        <td>${data.id}</td>
                        <td>${data.fullname}</td>
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
