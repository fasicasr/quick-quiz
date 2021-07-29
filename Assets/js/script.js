const startButton = document.querySelector('#startButton');
const timerElement = document.querySelector(".timer-count");
const questionElement = document.querySelector("#question");
const answerWrapper = document.querySelector("#answers");
const resultWrapper = document.querySelector("#result");




const startTime = 75;
let timerCount = startTime;
let currentQuestion = 0;
const timeLost = 10;
let finalScore;


startButton.addEventListener('click',startQuiz);

//Function to start the game
function startQuiz(){
    //  alert('game is about to start');
    startButton.classList.add('hide'); //button is hidden from page once clicked
    //Call start timer function
    runTimer();
    //Set First Qustion
    nextQuestion();
}



//Function to go to the next question
function nextQuestion(){
    const totalQuestions = questions.length;

    console.log(currentQuestion);

    if(currentQuestion < totalQuestions){
        showQuestion(questions[currentQuestion]);
    } else {
        setTimeout(function(){
            endGame();
        },1000);
    }

 console.log('total questions '+totalQuestions);
 console.log('current question '+currentQuestion);

 currentQuestion++;
}

function showQuestion(question){
     console.log(question);

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
        console.log('correct');
        nextQuestion();
        showResult(true);
    } else {
        console.log('wrong');
        //minus time
        minusTime();
        showResult(false);
    }
}

function showResult(answerCorrect){
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
    timer = setInterval(function() {
        if(timerCount <= 0){
            endGame(true);
        } else {
            timerCount--; //subtract 1
            timerElement.textContent = timerCount;
        }
    }, 1000);   
}



// Function to End Game
function endGame(timeOver){
    //Hide quiz elements 
    questionElement.classList.add('hide');
    answerWrapper.classList.add('hide');
    resultWrapper.classList.add('hide');
    timerElement.classList.add('hide');

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
