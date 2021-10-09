var user = localStorage.getItem("user");
var convertUser = JSON.parse(user);
var userUID = convertUser.userID;
var database = firebase.database().ref("/");
// var authUser = localStorage.getItem("firebase:authUser:AIzaSyCJmwcDnlytyr6seElC8M_vmuFaLuS-iEs:[DEFAULT]");
// var convertAuth = JSON.parse(authUser);
// console.log(convertAuth)


var fullName = convertUser.fname + " " + convertUser.lname;
var name = document.getElementById("fullName").innerHTML = convertUser.fname + " " + convertUser.lname;;
var email = convertUser.mail;
console.log(email);
// console.log(convertUser);

var eventName = document.getElementById("eventName");
var eventDate = document.getElementById("eventDate");
var eventTime = document.getElementById("eventTime");
var description = document.getElementById("description");
var eventsPanel = document.getElementById("eventsPanel");
// var goingBtn = document.getElementById("goingBtn")
function Cevent() {
    if (eventName.value === "") {
        swal(
            'OOps...',
            'Event Name is Empty',
            'error'
        )
        eventName.focus();
    } else if (eventDate.value === "") {
        swal(
            'OOps...',
            'Event Date is Empty',
            'error'
        )
    } else if (eventTime.value === "") {
        swal(
            'OOps...',
            'Event Time is Empty',
            'error'
        )
    } else {
        var eventsCreate = {
            userName: fullName,
            nameOfEvent: eventName.value,
            dateOfEvent: eventDate.value,
            timeOfEvent: eventTime.value,
            detailsOfEvent: description.value,
            mail:email
        };
        // console.log(eventsCreate);
        database.child("eventsCreate").push(eventsCreate);
        eventName.value = "";
        eventDate.value = "";
        eventTime.value = "";
        description.value = "";
        
    }
}

database.child("eventsCreate").on("child_added", function (snap) {
    var obj = snap.val();
    obj.key = snap.key
    console.log(obj);
    var div1 = document.createElement("DIV")
    div1.style = "border-style:solid; border-width: 0px 20px 0px 20px; border-color:purple";

    div1.className = "col s12 m7";
    div1.setAttribute("id", obj.key);
    var div2 = document.createElement("DIV")
    div2.className = "card horizontal";

    var h1 = document.createElement("H1")
    var textH1 = document.createTextNode(obj.nameOfEvent)
    h1.className = "center-align flow-text"
    h1.style = "font-size: 50px";

    var h2 = document.createElement("H2")
    h2.className = "center-align flow-text"
    h2.style = "font-weight:bolder";
    var textH2 = document.createTextNode("Created By: " + obj.userName);


    var h2date = document.createElement("H2")
    h2date.className = "center-align flow-text"
    var textH2date = document.createTextNode(obj.dateOfEvent);


    var h2time = document.createElement("H2")
    h2time.className = "center-align flow-text"
    var textH2time = document.createTextNode(obj.timeOfEvent);

    var h3Desc = document.createElement("H3")
    h3Desc.className = "center-align flow-text"
    var textH3Desc = document.createTextNode(obj.detailsOfEvent);

    // var goingP = document.createElement("P");
    // goingP.className = "center-align"
    // var input = document.createElement("INPUT");
    // input.setAttribute("name", "decision");
    // input.setAttribute("type", "radio");
    // // input.setAttribute("id", "dec1");

    // var glabel = document.createElement("LABEL");
    // // glabel.setAttribute("for", "dec1");
    // var glabelText = document.createTextNode("Going");
    // glabel.style = "font-size:20px; color:black"
    // glabel.appendChild(glabelText);
    // goingP.appendChild(input);
    // goingP.appendChild(glabel);

    // var ngoingP = document.createElement("P");
    // ngoingP.className = "center-align"
    // var nginput = document.createElement("INPUT");
    // nginput.setAttribute("name", "decision");
    // nginput.setAttribute("type", "radio");
    // // nginput.setAttribute("id", "dec2");

    // var nglabel = document.createElement("LABEL");
    // // nglabel.setAttribute("for", "dec2");
    // var nglabelText = document.createTextNode("Not Going");
    // nglabel.style = "font-size:20px; color:black"
    // nglabel.appendChild(nglabelText);
    // ngoingP.appendChild(nginput);
    // ngoingP.appendChild(nglabel);

    // var horFABDiv = document.createElement("DIV");
    // horFABDiv.className = "fixed-action-btn horizontal";

    // var btnHor = document.createElement("A");
    // btnHor.className = "btn-floating btn-large red";

    // var icon = document.createElement("i");
    // icon.className = "large material-icons";
    // var iconText = document.createTextNode("menu");
    // icon.appendChild(iconText);

    // var ul = document.createElement("UL");

    // var firstli = document.createElement("LI");
    // var firstliBtn = document.createElement("A");
    // firstliBtn.className = "btn-floating red";
    // var firstliBtnText = document.createTextNode("Going");
    // firstliBtn.appendChild(firstliBtnText);
    // firstli.appendChild(firstliBtn);

    // var secondli = document.createElement("LI");
    // var secondliBtn = document.createElement("A");
    // secondliBtn.className = "btn-floating red";
    // var secondliBtnText = document.createTextNode("Not Going");
    // secondliBtn.appendChild(secondliBtnText);
    // secondli.appendChild(secondliBtn);

    // horFABDiv.appendChild(btnHor);
    // btnHor.appendChild(icon);
    // horFABDiv.appendChild(ul);
    // ul.appendChild(firstli);
    // ul.appendChild(secondli);

    var gbtn  = document.createElement("BUTTON");
    gbtn.className = "waves-effect waves-purple btn-flat right"
    gbtn.style = "border: 2px solid grey"
    var gbtnText = document.createTextNode("Going");
    gbtn.appendChild(gbtnText);
    gbtn.onclick = function(){
        goingFunc(obj.key,obj.nameOfEvent,obj.dateOfEvent,obj.timeOfEvent,obj.detailsOfEvent,obj.userName)
        gbtn.style.display = "none";
        var p = document.createElement("P");
        p.innerHTML = "Added to Interested Events"
        p.style.fontSize = "10px;"
        p.className = "text-red right-align"
        cardContent.appendChild(p);
    }

    
    
    h1.appendChild(textH1)
    h2date.appendChild(textH2date);
    h2time.appendChild(textH2time);
    h3Desc.appendChild(textH3Desc);
    h2.appendChild(textH2)
    
    // console.log(h4)
    
    var cardStack = document.createElement("DIV");
    cardStack.className = "card-stacked hoverable";
    
    var cardContent = document.createElement("DIV");
    cardContent.className = "card-content";
    
    eventsPanel.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(cardStack);
    cardStack.appendChild(cardContent);
    cardContent.appendChild(h1);
    cardContent.appendChild(h3Desc);
    cardContent.appendChild(h2date);
    cardContent.appendChild(h2time);
    cardContent.appendChild(h2);
    cardContent.appendChild(gbtn);
    // cardContent.appendChild(ngbtn);
    // cardContent.appendChild(horFABDiv);
    // cardContent.appendChild(goingP)
    // cardContent.appendChild(ngoingP);
    // console.log(eventsPanel)
    // div2.appendChild(h4)
    // div2.appendChild(p)
    // div2.appendChild(commentDiv)
    // div1.appendChild(commentList)
    
    // maindiv.appendChild(mainCard);
    // mainCard.appendChild(cardStack);
    // cardStack.appendChild(cardContent);
    // cardContent.appendChild(h3);
    // cardStack.appendChild(cardAction);
    // cardAction.appendChild(a);
    // eventsPanel.appendChild(maindiv);
});
function goingFunc(id, event_Name, event_Date, event_Time, event_Details, user_Name){

    var goingEvent = {
        id:id,
        nameOfEvent: event_Name,
        dateOfEvent: event_Date,
        timeOfEvent: event_Time,
        detailsOfEvent: event_Details,
        userName: user_Name
    };
    database.child("goingEvent").push(goingEvent).then()

    swal(
        'Congo...',
        'Event is Added to Interested Events',
        'success'
    )

};

function logOut() {
    localStorage.clear();
    window.location.replace("../index.html")
}
