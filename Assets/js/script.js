const startButton = document.querySelector('#startButton');
const timerElement = document.querySelector(".timer-count");
const questionElement = document.querySelector("#question");
const answerWrapper = document.querySelector("#answers");
const resultWrapper = document.querySelector("#result");
const finalResults = document.querySelector("#finalResults");
const gameoverWrapper = document.querySelector("#finalResults #gameOver");
const gamecompleteWrapper = document.querySelector("#finalResults #gameComplete");
const leaderWrapper = document.querySelector("#leaderboard");
const restartBtn = document.querySelector(".restart");



const startTime = 75;
let timerCount = startTime;
let currentQuestion = 0;
const timeLost = 10;
let finalScore;
let isPaused = false;


startButton.addEventListener('click',startGame);

//Function to start the game
function startGame(){
    setupRestart();//  alert('game is about to start');
    startButton.classList.add('hide'); //button is hidden from page once clicked
    //Call start timer function
    runTimer();
    //Set First Question
    nextQuestion();
}

function setupRestart(){
    //remove hidden classes when restarting
    questionElement.classList.remove('hide');
    answerWrapper.classList.remove('hide');
    resultWrapper.classList.remove('hide');
    resultWrapper.innerHTML = "";

}



//Function to go to the next question
function nextQuestion(){
    const totalQuestions = questions.length;
    // console.log(currentQuestion);
    if(currentQuestion < totalQuestions){
        showQuestion(questions[currentQuestion]);
    } else {
        setTimeout(function(){
            endGame();
        },1000);
    }
//  console.log('total questions '+totalQuestions);
//  console.log('current question '+currentQuestion);
 currentQuestion++;
}

function showQuestion(question){
    //hide result from previous question
    setTimeout(function(){
        resultWrapper.classList.add('hide');
    },1500);
    //  console.log(question);
    //clear any questions showing
    while (answerWrapper.firstChild) {
        answerWrapper.removeChild(answerWrapper.firstChild);
    }
    // Use JS to add question to empty DIV
    questionElement.innerHTML = question.question;
    // Use JS to add the answers using the For loop
    question.answers.forEach(answer => {
        const button = document.createElement('button');//create element using JS while assigning it to a variable
        button.innerText = answer.text; //while in the loop..use JS to add the Text to each button created 
        //each answer in the array has a Boolean for CORRECT..there's only 1 with TRUE 
        if(answer.correct){
         button.dataset.correct = answer.correct;
        }
        //check if answer is correct on click by calling the function checkAnswer
        button.addEventListener('click', checkAnswer);
        // finally add each button created in this loop to the DIV created in the HTML and set here as the variable 'answerWrapper'
        answerWrapper.appendChild(button);
 });
}

//Function when user picks an answer
function checkAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct
    //
    if(correct){
        // console.log('correct');
        nextQuestion();
        showResult(true);
    } else {
        // console.log('wrong');
        //minus time
        minusTime();
        nextQuestion();
        showResult(false);
    }
}

function showResult(answerCorrect){
    resultWrapper.classList.toggle('hide');
    // const button = document.createElement('button');//create element using JS while assigning it to a variable
    resultWrapper.innerHTML = "";
    if(answerCorrect){
        resultWrapper.append('Correct!');
    } else {
        resultWrapper.append('Wrong Answer. You loose 10 seconds!');
    }
}


function minusTime(){
    if(timerCount > 0){
        timerCount = timerCount - timeLost;
        // runTimer();
    }   
    // console.log(timerCount);
}


//function counting down
function runTimer(){
    console.log(isPaused)
    // if(!isPaused){
    timer = setInterval(function() {
        if(timerCount <= 0){
            endGame(true);
        } else {
            timerCount--; //subtract 1
            timerElement.textContent = timerCount;
        }
    }, 1000);   
}



// Function to End Quiz
function endGame(timeOver){
    finalResults.classList.remove('hide');//when restarting game
    //Hide quiz elements 
    questionElement.classList.add('hide');
    answerWrapper.classList.add('hide');
    resultWrapper.classList.add('hide');
    //  runTimer(isPaused=true);
    timerElement.textContent = 0; //empty clock
    clearInterval(timer);//pause countdown

    finalScore = timerCount;//update final score variable

    if(timeOver){
        gameoverWrapper.classList.remove('hide');//remove Hide class from gameover div
    //   console.log('outta time');
    } else {
        const scoreElement = document.querySelector(".score");
        const submitLeaderBtn = document.querySelector("#submitLeader");
        gamecompleteWrapper.classList.remove('hide');//remove Hide class from gamecomplete div
        scoreElement.innerHTML = finalScore;
        // finalResults.innerHTML = "";
        //go to leaderboard once clicked
        submitLeaderBtn.addEventListener('click',leaderBoard);
    }
}

function leaderBoard(){
    let userInitial = document.querySelector("#initails").value;
    const user = document.querySelector("#userLeader");
    const clearBtn = document.querySelector("#clearScores");


    finalResults.classList.add('hide');//hide final results DIV already in the HTML
    leaderWrapper.classList.remove('hide');
    user.innerHTML = userInitial+" - "+finalScore;
//  console.log('leaders here');
//  console.log(finalScore);
//  console.log(userInitial);
    user.classList.remove('hide');//when restarting
    clearBtn.addEventListener('click',function(){
        user.classList.add('hide');
    });
}

//Click event to restart quiz
restartBtn.addEventListener('click',reStart);

function reStart(){
    timerElement.textContent = startTime; //empty clock
    console.log('restart');
    timerCount = startTime;//adds 75 secs back
    //Hide LeaderBoard
    leaderWrapper.classList.add('hide');
    //Show quiz elements 
    questionElement.classList.add('hide');
    answerWrapper.classList.add('hide');
    resultWrapper.classList.add('hide');
    timerElement.classList.remove('hide');
    //show Start button
    startButton.classList.remove('hide');
    //Set Current question back to 0 
    currentQuestion = 0;
    // console.log('restart');
}

//question list 
let questions = [
  {
    question: "What tag do you use to properly link Javascript to HTML?",
    answers: [
        { 
            text: "<javascript>", 
            correct: false
        },
        { 
            text: "<html>",
            correct: false
        },
        { 
            text: "<script>", 
            correct: true
        },
        { 
            text: "<div>",
            correct: false
        }
    ]
  },
  {
    question: "Which <h> tag will get you the biggest font?",
    answers: [
        { 
            text: "<h3>", 
            correct: false
        },
        { 
            text: "<h1>",
            correct: false
        },
        { 
            text: "<h4>", 
            correct: true
        },
        { 
            text: "<h6>",
            correct: false
        }
    ]
  },
  {
    question: "What kind of values can you store in a boolean?",
    answers: [
        { 
            text: "numbers", 
            correct: false
        },
        { 
            text: "true and false",
            correct: true
        },
        { 
            text: "strings", 
            correct: false
        },
        { 
            text: "other arrays",
            correct: false
        }
    ]
  }
]


//GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score