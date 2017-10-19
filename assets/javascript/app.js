$(document).ready(function() {

	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6iU1acnFNDAEeKNHTk-hxVo7XX3X8_Jg",
    authDomain: "train-scheduler-92356.firebaseapp.com",
    databaseURL: "https://train-scheduler-92356.firebaseio.com",
    projectId: "train-scheduler-92356",
    storageBucket: "train-scheduler-92356.appspot.com",
    messagingSenderId: "1090342894326"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref("/TrainData").on("value", function(snap) {
  	$("#display-article").empty();


  });


  $("#select-article").on("click", function(event) {
		// prevent form from submitting
		event.preventDefault();

		var name = $("#data-name").val().trim();
		var destination = $("#data-destination").val().trim();
		var time = $("#data-time").val().trim();
		var frequency = $("#data-frequency").val().trim();

		database.ref("/TrainData").push({
			trainName: name,
			destination: destination,
			startTime: time,
			frequency: frequency
		});
	});

});