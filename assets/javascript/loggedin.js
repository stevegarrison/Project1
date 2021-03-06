/**
 * 
 * 
 *          this is the loggedin.js file
 * 
 * 
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLTkosSO3iupdRISkI3cYT8qtjbY5Ukrs",
    authDomain: "classproject-1db.firebaseapp.com",
    databaseURL: "https://classproject-1db.firebaseio.com",
    projectId: "classproject-1db",
    storageBucket: "classproject-1db.appspot.com",
    messagingSenderId: "90720089463"
  };
firebase.initializeApp(config);

// create a handle to the database
var database = firebase.database();

// list to keep url links in
var listOfURLs = [];

function loadBM() {


    var curUser = firebase.auth().currentUser;
    if (firebase.auth().currentUser !== null) {

        firebase.database().ref("Users/user" + firebase.auth().currentUser.uid).on("value", function (_snapshot) {

            var i = 0;
            var rowNum = 0;

            _snapshot.forEach(function (_item) {

                var newCol = $("<div class='pricing-column col-md-4'></div>");
                var newCard = $("<div class='card'></div>");
                var newCardHeader = $("<div class='card-header'></div>");
                var eventTitle = $("<h3>").text(_item.val().name);
                var eventCity = $("<h2>").text(_item.val().city);
                var desc = $("<p>").text(_item.val().desc);
                var linkToTicketsURL = _item.val().url;
                var eventDate = $("<h5>").text(_item.val().date);
    
                var newCardBody = $("<div class='card-body'></div>");

                linkToBuyTickets = $("<button id='disp-link-loc' btnURL="
                    + linkToTicketsURL + " class= 'btn btn-sm btn-block btn-outline-dark'>Buy</button>");


                // click event for the event
                linkToBuyTickets.on("click", function () {

                    var linkToURL = $(this).attr("btnURL");

                    window.open(href = linkToURL, "_blank");
                });

                newCardHeader.append(eventTitle);
                newCard.append(newCardHeader);
                newCardBody.append(eventCity);
                newCardBody.append(eventDate);
                newCardBody.append(desc);
                newCardBody.append(linkToBuyTickets);
                newCard.append(newCardBody);
                newCol.append(newCard);

                // if i % 3 === 0 then there is a multiple of 3 in the current row
                //  so we need to create a new row
                if (i === 0) {
                    var newRow = $("<div class='row r" + rowNum + "'></div>");
                    newRow.append(newCol);
                    $("#t").append(newRow);

                }
                else if (i % 3 === 0) {
                    // create a new row
                    ++rowNum;
                    var newRow = $("<div class='row r" + rowNum + "'></div>");
                    newRow.append(newCol);
                    $("#t").append(newRow);


                }
                else {
                    var temp = ".r" + rowNum;
                    $(temp).append(newCol);
                }
                ++i;

            });

        });
    }
    else {
        /**************************************************************************/
        /*      event:          firebase.database.on child added                  */
        /*                                                                        */
        /*      purpose:        populate the bookmarks page                       */
        /**************************************************************************/
        firebase.database().ref("general-bookmarks").on("value", function (_snapshot) {

            var i = 0;
            var rowNum = 0;

            _snapshot.forEach(function (_item) {

                var newCol = $("<div class='pricing-column col-md-4'></div>");
                var newCard = $("<div class='card'></div>");
                var newCardHeader = $("<div class='card-header'></div>");
                var eventTitle = $("<h3>").text(_item.val().name);
                var eventCity = $("<h2>").text(_item.val().city);
                var desc = $("<p>").text(_item.val().desc);
                var linkToTicketsURL = _item.val().url;
                var eventDate = $("<h5>").text(_item.val().date);
    
                var newCardBody = $("<div class='card-body'></div>");

                linkToBuyTickets = $("<button id='disp-link-loc' btnURL='"
                    + linkToTicketsURL + "'class= 'btn btn-sm btn-block btn-outline-dark'>Buy</button>");

                // click event for the event
                linkToBuyTickets.on("click", function () {

                    var linkToURL = $(this).attr("btnURL");
                    window.open (href = linkToURL, "_blank");
                    
                });

                newCardHeader.append(eventTitle);
                newCard.append(newCardHeader);
                newCardBody.append(eventCity);
                newCardBody.append(eventDate);
                newCardBody.append(desc);
                newCardBody.append(linkToBuyTickets);
                newCard.append(newCardBody);
                newCol.append(newCard);

                // if i % 3 === 0 then there is a multiple of 3 in the current row
                //  so we need to create a new row
                if (i === 0) {
                    var newRow = $("<div class='row r" + rowNum + "'></div>");
                    newRow.append(newCol);
                    $("#t").append(newRow);

                }
                else if (i % 3 === 0) {
                    // create a new row
                    ++rowNum;
                    var newRow = $("<div class='row r" + rowNum + "'></div>");
                    newRow.append(newCol);
                    $("#t").append(newRow);


                }
                else {
                    var temp = ".r" + rowNum;
                    $(temp).append(newCol);
                }
                ++i;

            });

        });
    }
}


// auth listener
firebase.auth().onAuthStateChanged(function (firebaseUser) { // based on whether or not user is logged in
    if (firebaseUser) {
        loadBM();
        $("#log_out").show();
    } else {
        loadBM();
        $("#log_out").hide();
    }
});

// signs user out
$("#log_out").on("click", function() {
    firebase.auth().signOut().then(function() {

    }).catch(function(error) {

    });
});

