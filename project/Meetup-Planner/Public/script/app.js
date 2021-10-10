 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyCJmwcDnlytyr6seElC8M_vmuFaLuS-iEs",
   authDomain: "meetup-planner-eb2b5.firebaseapp.com",
   databaseURL: "https://meetup-planner-eb2b5.firebaseio.com",
   projectId: "meetup-planner-eb2b5",
   storageBucket: "meetup-planner-eb2b5.appspot.com",
   messagingSenderId: "187789885726"
 };
 firebase.initializeApp(config);

//  var fbprovider = new firebase.auth.FacebookAuthProvider();
//  var goprovider = new firebase.auth.GoogleAuthProvider();
 var db = firebase.database().ref("/");
 var firstName = document.getElementById("first_name");
 var lastName = document.getElementById("last_name");
 var email = document.getElementById("email");
 var password = document.getElementById("password");
 var male = document.getElementById("male");
 var female = document.getElementById("female");

 function signup() {
   if(firstName.value === ""){
     firstName.focus();
     swal(
       "OOpss!",
       'First Name cannot be NULL',
       'error'
     )
   }
   else if(password.value === ""){
     password.focus();
    swal(
      "OOpss!",
      'Password cannot be NULL',
      'error'
    )
   }
   else if(email.value === ""){
     email.focus();
    swal(
      "OOpss!",
      'Email cannot be NULL',
      'error'
    )
   }
   else{
   var signedUpUser = {
     fname: firstName.value,
     lname: lastName.value,
     mail: email.value,
     passw: password.value,
     male: male.checked,
     female: female.checked,

   };

   console.log(signedUpUser);

   firebase.auth().createUserWithEmailAndPassword(signedUpUser.mail, signedUpUser.passw)
     .then(function (res) {
       signedUpUser.userID = res.uid;
       db.child('user/' + res.uid).set(signedUpUser).then(function () {
         swal(
           'Good job!',
           'Sign Up Successful',
           'success'
          )
          setTimeout(function(){
            location = "login/login.html";
          },2000);
          
        })
       console.log(res);
       firstName.value = "";
       lastName.value = "";
       email.value = "";
       password.value = "";
     })

     .catch(function (error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       if (errorCode == 'auth/weak-password') {
         swal(
           'OOps!',
           'Your password is too weak',
           'error'
         )
       } else {
         swal(
           'OOps!',
           errorMessage,
           'error'
         )
        //  alert(errorMessage);
       }
       console.log(error);
     });

 }
}

//  function fbSignIn(){
//   firebase.auth().signInWithPopup(fbprovider)
  
//   .then(function(result) {
//      var token = result.credential.accessToken;
//      var user = result.user;
//      console.log(user.displayName); 
//      console.log(token)
//      console.log(user)
//   }).catch(function(error) {
//      console.log(error.code);
//      console.log(error.message);
//   });
//  }

//  function gSignIn(){
//   firebase.auth()
  
//   .signInWithPopup(goprovider).then(function(result) {
//     var token = result.credential.accessToken;
//     var user = result.user;
   
//     location = "../dashboard/dash.html";
//      console.log(user.displayName);
//   }).catch(function(error) {
//      var errorCode = error.code;
//      var errorMessage = error.message;
   
//      console.log(error.code)
//      console.log(error.message)
//   });
//  }