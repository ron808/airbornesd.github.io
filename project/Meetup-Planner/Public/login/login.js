console.log("huzaifa");
var database = firebase.database().ref("/");
var inEmail = document.getElementById("email");
var inPass = document.getElementById("password");

document.getElementById("stop").addEventListener("submit",

    function submit(event) {
        event.preventDefault();
        var user = {
            email: inEmail.value,
            password: inPass.value,
        };

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (success) {

                // console.log(success.uid);

                database.child('user/' + success.uid).once("value", function (snapshot) {
                    console.log(snapshot.val());
                    localStorage.setItem("user", JSON.stringify(snapshot.val()));

                    swal(
                        'Good job!',
                        'Log In Successful',
                        'success'
                    )
                    setTimeout(function () {
                        location = "../dashboard/dash.html";
                    }, 2000);

                });

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    swal(
                        'OOppss!..',
                        "Wrong Password",
                        'error'
                    )
                } else {
                    swal(
                        'OOppss!..',
                        errorMessage,
                        "error"
                    )
                }
                console.log(error);
            });


    });