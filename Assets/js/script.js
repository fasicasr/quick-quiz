
var timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");
let questionList = document.getElementById('questionList');


//pull answer options from html




var timer;
var timerCount;


//question list 
let questions = [
  {
    question: "What tag do you use to properly link Javascript to HTML?",
    choiceA: "<javascript>", 
    choiceB: "<html>",
    choiceC: "<script>", 
    choiceD: "<div>",
    answer: "C",
  },
  {
    question: "Which <h> tag will get you the biggest font?",
    choiceA: "<h3>", 
    choiceB: "<h1>",
    choiceC: "<h4>",
    choiceD: "<h6>",
    answer: "D",
  },
  {
    question: "What kind of values can you store in a boolean?",
    choiceA: "numbers", 
    choiceB: "true and false", 
    choiceC: "strings", 
    choiceD: "other arrays",
    answer: "B",
  },
  {
    question: "String values must be place between..",
    choiceA: "single quotes",  
    choiceB: "curly brackets",
    choiceC: "double quotes",
    choiceD: "both A and D",
    answer: "D",
  }, 
  {
    question: "Which one of these statments is correct?",
    choiceA: "CSS is styling sheet language",  
    choiceB: "JavaScript is a styling Sheet language", 
    choiceC: "HTML is a programing language",
    choiceD: "CSS is a programing language",
    answer: "A",
  },
]



// Attach event listener to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);

// The startQuiz function is called when the start button is clicked
function startQuiz() {
  isWin = false;
  timerCount = 75;
  startButton.style.display='none'; //button is hidden from page once clicked

  showQuestions();
  // renderBlanks()
  startTimer()
}


//function for questions. To be called so questions can appear
function showQuestions () {
 
 
}


// The setTimer function starts and stops the timer
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    
  }, 1000);
}

