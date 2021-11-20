const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

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
      button.dataset.correct = answer.correct
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
        question: "When was TRON originally released?",
        answers:[
            {text: "1982", correct: true},
            {text: "1981", correct: false},
            {text:"1983", correct: false},
            {text: "1984", correct:false}
        ]
    },

    {
        question: "What scifi event in TRON actually happened to Jeff Bridges while filming TRON:Legacy?",
        answers:[
            {text: "Partook in motorcycle combat", correct: false},
            {text: "Got scanned by computer laser", correct: true},
            {text:"Worked with AI", correct: false},
            {text: "Created digital assistant", correct:false}
        ]
    },

    {
        question: "Who did the score of Tron:Legacy, and had a cameo?",
        answers:[
            {text: "Marshmello", correct: false},
            {text: "Skrillex", correct: false},
            {text:"Daft Punk", correct: true},
            {text: "DeadMau5", correct:false}
        ]
    },

    {
        question: "TRON was a commercial failure. What used its license and out-grossed the film?",
        answers:[
            {text: "Soundtrack", correct: false},
            {text: "Merchandise", correct: false},
            {text:"TV Show", correct: false},
            {text: "Arcade game", correct:true}
        ]
    },

    {
        question: "What character from TRON goes by the name Rinzler in TRON:Legacy?",
        answers:[
            {text: "TRON", correct: true},
            {text: "Master Control", correct: false},
            {text:"Sark", correct: false},
            {text: "Yori", correct:false}
        ]
    }
]