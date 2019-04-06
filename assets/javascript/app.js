$(document).ready(function() {
	var questions = [{
		question: "What player scored the most points in one game?",
		choice: ["Michael Jordan", "Wilt Champerlain", "Kobe Bryant", "Lebron James"],
		answer: 1,
		photo: "assets/images/wilt.gif"
	}, {
		question: "What player has the highest career PPG?",
		choice: ["Kareem Abdul-Jabbar", "Magic Johnson", "Michael Jordan", "James Harden"],
		answer: 2,
		photo: "assets/images/mj.gif"
	}, {
		question: "What player has the most career assists?",
		choice: ["Steve Nash", "John Stockton", "Jason Kidd", "Magic Johnson"],
		answer: 1,
		photo: "assets/images/john.gif"
	}, {
		question: "Who won the most career NBA championships as player?",
		choice: ["Tim Duncan", "Lebron James", "Michael Jordan", "Bill Russell"],
		answer: 3,
		photo: "assets/images/bill.gif"
	}, {
		question: "Who was the youngest player to score 10,000 points in the NBA?",
		choice: ["LeBron James", "Kobe Bryant", "Michael Jordan", "Wilt Chamberlain"],
		answer: 0,
		photo: "assets/images/lebron.gif"
	}, {
		question: "In what city were the Los Angeles Lakers initially based?",
		choice: ["Detroit", "Minneapolis", "Rochester", "Miami"],
		answer: 1,
		photo: "assets/images/mini.gif"
	}, {
		question: "Who has the most career rebounds?",
		choice: ["Charles Barkley", "Bill Walton", "Bill Russell", "Wilt Chamberlain"],
		answer: 3,
		photo: "assets/images/wilt.gif"
	}, {
		question: "What player has the most assists in one game?",
		choice: ["Scott Skiles", "Steve Nash", "Magic Johnson", "Jason Kidd"],
		answer: 0,
		photo: "assets/images/scott.gif"
	}];
	var rightCount = 0;
	var WrongCount = 0;
	var notAnsweredCount = 0;
	var timer = 20;
	var userGuess = "";
	var questionCount = questions.length;
	var pick;
	var index;
	var working = false;
	var intervalId;
	var newArray = [];
	var holder = [];
	$("#start").on("click", function() {
		$("#start").hide();
		showQuestions();
		startTimer();
		for (var i = 0; i < questions.length; i++) {
			holder.push(questions[i]);
		}
	});

	function startTimer() {
		if (!working) {
			intervalId = setInterval(decrement, 1000);
			working = true;
		};
	};

	function decrement() {
		timer--;
		console.log(timer)
		$("#timeleft").html("<h2>Time Remaining: " + timer + "<h2>");
		if (timer === 0) {
			notAnsweredCount++;
			stop();
			$("#answers").html("<p>Time is Up! The correct answer is: " + pick.choice[pick.answer] + "</p>")
			hidepicture();
		}
	};

	function stop() {
		working = false;
		clearInterval(intervalId);
	};

	function showQuestions() {
		index = Math.floor(Math.random() * questions.length);
		pick = questions[index];
		$("#questions").html("<h2>" + pick.question + "</h2>")
		for (var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-gvalue", i);
			$("#answers").append(userChoice);
		}
		$(".answerchoice").on("click", function() {
			userGuess = parseInt($(this).attr("data-gvalue"));
			if (userGuess === pick.answer) {
				stop();
				rightCount++;
				userGuess = "";
				$("#answers").html("<p><h3>Correct!</h3></p>");
				hidepicture();
			} else {
				stop();
				WrongCount++;
				userGuess = "";
				$("#answers").html("<p><h3>Nope!</h3><br>The Correct answer is: " + pick.choice[pick.answer] + "</p>");
				hidepicture();
			}
		});
	};

	function hidepicture() {
		$("#answers").append("<img src=" + pick.photo + " class='size'>");
		newArray.push(pick);
		questions.splice(index, 1);
		var hidingpic = setTimeout(function() {
			$("#answers").empty();
			timer = 20;
			if ((WrongCount + rightCount + notAnsweredCount) === questionCount) {
				$("#questions").empty();
				$("#questions").html("<h3>Game Over!</h3>")
				$("#answers").append("<h4> Correct: " + rightCount + "</h4>");
				$("#answers").append("<h4> Incorrect: " + WrongCount + "</h4>");
				$("#answers").append("<h4> Unanswered: " + notAnsweredCount + "</h4>");
				$("#reset").show();
				rightCount = 0;
				WrongCount = 0;
				notAnsweredCount = 0;
			} else {
				startTimer();
				showQuestions();
			}
		}, 3000);
	}
	$("#reset").hide();
	$("#reset").on("click", function() {
		$("#reset").hide();
		$("#answers").empty();
		$("questions").empty();
		for (var i = 0; i < holder.length; i++) {
			questions.push(holder[i]);
		}
		runTimer();
		showQuestions();
	})
})