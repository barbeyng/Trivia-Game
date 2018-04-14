$(document).ready(function () {
    
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
    ["Corgi", "Labrador Retriever", "Great Dane", "Poodle"],
    ["Deer", "Beaver", "Dolphin", "Goat"],
    ["Peahen", "Hen", "Peacock", "Peafowl"],
    ["Rabbits", "Ligers", "Cats", "Mice"],
    ["A decade", "A year", "A month", "A week"],
    ["A pearl", "A feather", "A pebble", "A fish"],
    ["The darker the spots, the older they are.", "The more spots they have, the older they are.", "The lighter the spots the older they are.", "The fewer spots they have, the older they are."]];
var imageArray = [
    "<img class='center-block correct-image' src='assets/images/flamingo.jpg'>",
    "<img class='center-block correct-image' src='assets/images/lab.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/goat.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/peacock.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/cat.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/tardigrade.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/penguin.jpeg'>",
    "<img class='center-block correct-image' src='assets/images/giraffe.jpeg'>"];
var correctAnswers = [
    "B. Flamingo",
    "B. Labrador Retriever",
    "D. Goat",
    "A. Peahen",
    "C. Cats",
    "A. A decade",
    "C. A pebble",
    "A. The darker the spots, the older they are."];
var clock;
var incorrectTally = 0;
var correctTally = 0;
var unansweredTally = 0;
var counter = 30;
var questionCounter = 0;

    //Create a start screen with a start button

    function startScreen() {
        $(".mainBody").html("<button class='center-block start-button'>Start Game!</button>");
    }

    startScreen();

    //ON CLICK EVENTS

    //once start button clicked, start score at 0 with timer set at 30 secs
    $("body").on("click", ".start-button", function(event) {
        generateText();
        timer();


    //check if player's choice matches the correct answer
    $("body").on("click", ".answer", function(event) {
        playerChoice = $(this).text();
        if (playerChoice === correctAnswers[questionCounter]) {
            clearInterval(clock);
            rightGuess();
        }
        else {
            clearInterval(clock);
            wrongGuess();
        }
    }); 

    //reset button
    $("body").on("click", ".reset-button", function(event) {
        resetGame();
    }); 

});  

function generateText() {
    showHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='text-center answer'>A. " + answerArray[questionCounter][0] + "</p><p class='text-center answer'>B. " + answerArray[questionCounter][1] + "</p><p class='text-center answer'>C. " + answerArray[questionCounter][2] + "</p><p class='text-center answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainBody").html(showHTML);
}

function timeOutLoss() {
    showHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Shoot, you ran out of time! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block wrong-image' src='assets/images/wronganswer.jpeg'>";
    $(".mainBody").html(showHTML);
    unansweredTally++;
    setTimeout(wait, 2000);
}

function rightGuess() {
    showHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct!</p>" + imageArray[questionCounter];
    $(".mainBody").html(showHTML);
    correctTally++;
    setTimeout(wait, 2000);
}

function wrongGuess() {
    showHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Nooope! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block wrong-image' src='assets/images/wronganswer.jpeg'>";
    $(".mainBody").html(showHTML);
    incorrectTally++;
    setTimeout(wait, 2000);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateText();
        counter = 30;
        timer();
    }
    else {
        resultScreen();
    }
}

function timer() {
    clock = setInterval(thirtySeconds, 2000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(clock);
            timeOutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function resultScreen() {
    showHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Bravo! Here's how you did." + "</p>" + "<p class='text-center'>Correct Answers: " + correctTally + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectTally + "</p>" + "<p class='text-center'>Unanswered: " + unansweredTally + "</p>" + "<button class='center-block reset-button'>Play again!!</button>";
    $(".mainBody").html(showHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateText();
    timer();
}
});

