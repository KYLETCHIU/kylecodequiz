const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeEl = document.getElementById('time')
var seconds=90
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  startTimer()
}

function startTimer(){
    var timerInterval = setInterval(function () {
        seconds--;
        timeEl.textContent = 't- ' + seconds;
        if (seconds === 0) {
          
          clearInterval(timerInterval);
          
        }
    
    }, 1000);
}



function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.classList.add('correct')
      button.dataset.correct = answer.correct
    }
    else (answer.wrong) ;{
        button.classList.add('incorrect')
        button.dataset.wrong = answer.wrong
    }

    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



const questions = [
    {
        question: "What is the current version of HTML?",
        answers:[
            {text: "HTML 5", correct: true },
            {text: "HTML 4", correct: false },
            {text:"HTML 3", correct: false },
            {text: "HTML 2", correct:false }
        ]
    },

    {
        question: "What is the current version of CSS?",
        answers:[
            {text: "CSS 2", correct: false},
            {text: "CSS 3", correct: true},
            {text:"CSS 4", correct: false},
            {text: "CSS 5", correct:false}
        ]
    },

    {
        question: "What tag would you use to show a bulk body of text?",
        answers:[
            {text: "<h1>", correct: false},
            {text: "<main>", correct: false},
            {text:"<p>", correct: true},
            {text: "<script>", correct:false}
        ]
    },

    {
        question: "Who created Bootstrap?",
        answers:[
            {text: "Myspace", correct: false},
            {text: "Reddit", correct: false},
            {text:"Facebook", correct: false},
            {text: "Twitter", correct:true}
        ]
    },

    {
        question: "What type of file is used to add functionality to a web page?",
        answers:[
            {text: "script.js", correct: true},
            {text: "index.html", correct: false},
            {text:"style.css", correct: false},
            {text: "audi.mp3", correct:false}
        ]
    }
]