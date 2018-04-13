var gameHTML;

var questionArray = [
    "Which animal can only eat when its head is upside down?",
    "What is the most popular dog breed in Great Britain?",
    "A female _____ is called a 'nanny'.",
    "Female peacocks are called this.",
    "These animals don't have sweet taste buds and can't taste sugar.",
    "Tardigrades can survive ____ without any food.",
    "Male penguins 'propose' to female penguins with what?",
    "How can you tell a giraffe's age with its spots?"];
var answerArray = [
    ["Bat", "Flamingo", "Gecko", "Sloth"],
    ["Corgi", "Labrador Retriever", "French Bulldog", "Poodle"],
    ["Deer", "Beaver", "Dolphin", "Goat"],
    ["Peahen", "Hen", "Peacock", "Peafowl"],
    ["Rabbits", "Ligers", "Cats", "Mice"],
    ["A decade", "A year", "A month", "A week"],
    ["A pearl", "A feather", "A pebble", "A fish"],
    ["The darker the spots, the older they are.", "The more spots they have, the older they are.", "The lighter the spots the older they are.", "The fewer spots they have, the older they are."]];
var imageArray = [
    "<img class='center-block img-right' src='assets/images/flamingo.jpg'>",
    "<img class='center-block img-right' src='assets/images/lab.jpeg'>",
    "<img class='center-block img-right' src='assets/images/goat.jpeg'>",
    "<img class='center-block img-right' src='assets/images/peacock.jpeg'>",
    "<img class='center-block img-right' src='assets/images/cat.jpeg'>",
    "<img class='center-block img-right' src='assets/images/tardigrade.jpeg'>",
    "<img class='center-block img-right' src='assets/images/penguin.jpeg'>",
    "<img class='center-block img-right' src='assets/images/giraffe.jpeg'>"];
var correctAnswers = [
    "B. Flamingo",
    "B. Labrador Retriever",
    "D. Goat",
    "A. Peahen",
    "C. Cats",
    "A. A decade",
    "C. A pebble",
    "A. The darker the spots, the older they are."];
var selecterAnswer;
var theClock;



$(document).ready(function () {
    //Create a start screen with a start button

    function startScreen() {
        $(".mainBody").html("<button class='center-block start-button'>Start Game!</button>");
    }

    startScreen();

    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

    $(".start-button").click(function() {
        incorrectTally = 0;
        correctTally = 0;
        unansweredTally = 0;
        counter = 30;
        questionCounter = 0;
        generateHTML();
        timerWrapper();

    });
  // Closes start-button click

    $("body").on("click", ".answer", function(event) {
        //answeredQuestion = true;
        userSelection = $(this).text();
        if (userSelection === correctAnswers[questionCounter]) {

            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click

    $("body").on("click", ".reset-button", function(event) {
        resetGame();
    }); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainBody").html(gameHTML);
    setTimeout(wait, 1000);  
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $(".mainBody").html(gameHTML);
    setTimeout(wait, 1000); 
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
    $(".mainBody").html(gameHTML);
    setTimeout(wait, 1000); 
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainBody").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainBody").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

