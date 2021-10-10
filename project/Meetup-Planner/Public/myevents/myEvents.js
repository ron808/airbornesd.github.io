var user = localStorage.getItem("user");
var convertUser = JSON.parse(user);
var userUID = convertUser.userID;
var database = firebase.database().ref("/");
var mail = convertUser.mail;
var eventsPanel = document.getElementById("eventsPanel");
database.child("eventsCreate").on("child_added", function (snap) {
    var obj = snap.val()
    obj.key = snap.key
    // console.log(convertUser.mail)
    if (obj.mail === convertUser.mail) {
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

        // var gbtn  = document.createElement("BUTTON");
        // gbtn.className = "waves-effect waves-purple btn-flat right"
        // gbtn.style = "border: 2px solid grey"
        // var gbtnText = document.createTextNode("Going");
        // gbtn.appendChild(gbtnText);
        // gbtn.onclick = function(){
        //     goingFunc(obj.key,obj.nameOfEvent,obj.dateOfEvent,obj.timeOfEvent,obj.detailsOfEvent,obj.userName)
        //     gbtn.style.display = "none";
        //     var p = document.createElement("P");
        //     p.innerHTML = "Added to Interested Events"
        //     p.style.fontSize = "10px;"
        //     p.className = "text-red right-align"
        //     cardContent.appendChild(p);
        // }

        var delbtn = document.createElement("BUTTON");
        delbtn.className = "waves-effect waves-light btn red right"
        var delbtnText = document.createTextNode("DELETE");
        delbtn.appendChild(delbtnText);
        delbtn.onclick = function () {
            remove(obj.key);
        };
        var editbtn = document.createElement("BUTTON");
        editbtn.className = "waves-effect waves-light btn light-blue right"
        var editbtnText = document.createTextNode("EDIT");
        editbtn.appendChild(editbtnText);
        editbtn.onclick = function () {
            editEvent(obj.key,obj.nameOfEvent, obj.dateOfEvent, obj.timeOfEvent, obj.detailsOfEvent, obj.userName)
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
        cardContent.appendChild(delbtn);
        cardContent.appendChild(editbtn);
        console.log(eventsPanel)
    }

});

function remove(key) {
    database.child("eventsCreate/" + key).remove();
}
database.child("eventsCreate").on("child_removed", function (data) {
    var deleted = document.getElementById(data.key);
    deleted.remove();
    alert("Successfully Removed")
});

function editEvent(key,Ename, date,Time, details,uName) {
    // console.log(key, Ename, date, Time, details)
    var neweventname = prompt('Edit Event Name', Ename);
    var newdate = prompt('Edit date', date);
    var newTime = prompt('Edit Time',Time);
    var newdescription = prompt('Edit description', details);
    var newOrganizer = prompt('Edit Organizer', uName);

    var newEventData = {
        nameOfEvent: neweventname,
        dateOfEvent: newdate,
        timeOfEvent: newTime,
        detailsOfEvent: newdescription,
        userName: uName,
        mail: mail
    }

    if (newEventData !== '') { // check if the value is not empty
        var updates = {};
        updates[key] = newEventData;
        database.child("eventsCreate").update(updates);
        location.reload("#")

    }

}


function logOut() {
    localStorage.clear();
    window.location.replace("../index.html")
}