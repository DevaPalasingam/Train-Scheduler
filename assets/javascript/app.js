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

  	snap.forEach(function(childsnap) {
			var childValue = childsnap.val();

			var minutesAway;

			var tr = $("<tr>");
			tr.append("<td>" + childValue.trainName + "</td>");
			tr.append("<td>" + childValue.destination + "</td>");
			tr.append("<td>" + childValue.frequency + "</td>");

			console.log(childValue.trainName);

			
			var currentTime = moment();
			console.log("current time is: " + currentTime);

			var inputStartTime = moment(childValue.startTime, "HH:mm");
			console.log("input start time: " + inputStartTime);


			var timeDifference = currentTime.diff(inputStartTime, "minutes");

			console.log("time difference: " + timeDifference);


			//if the first train hasn't come yet, put that as the next train
			if(timeDifference < 0) {
				tr.append("<td>" + childValue.startTime + "</td>");
				minutesAway = timeDifference * (-1);
			}
			//else, calculate when the next train will come
			else {
				var mod = timeDifference % childValue.frequency;
				console.log("mod: " + mod);
				minutesAway = childValue.frequency - mod;
				var nextArrival = moment(currentTime, "HH:mm").add(minutesAway, "m");
				nextArrival = moment(nextArrival).format("hh:mm");
				console.log("next arrival: " + nextArrival);
				tr.append("<td>" + nextArrival + "</td>");
			}

			tr.append("<td>" + minutesAway + "</td>");
			//next arrival
			//minutes away



			$("#display-article").append(tr);
		});


  });


  //this code runs if the user clicks enter or submit
  $("#select-article").on("click", function(event) {
		// prevent form from submitting
		event.preventDefault();

		//grabs all the input data
		var name = $("#data-name").val().trim();
		var destination = $("#data-destination").val().trim();
		var time = $("#data-time").val().trim();
		var frequency = $("#data-frequency").val().trim();

		//plugs data in firebase
		database.ref("/TrainData").push({
			trainName: name,
			destination: destination,
			startTime: time,
			frequency: frequency
		});

		//clears the input fields
		$ ("#data-name").val("");
		$ ("#data-destination").val("");
		$ ("#data-time").val("");
		$ ("#data-frequency").val("");


	});

  // database.ref("/TrainData").set({});	// clear data in Firebase

});