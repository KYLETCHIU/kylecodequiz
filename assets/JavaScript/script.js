function TronQuiz (questions){
    this.score = 0;
    this.questions =questions;
    this.questionIndex = 0;
}
//

TronQuiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

TronQuiz.prototype.guess = function(answer){
    if(this.getQuestionIndex().isCorrectAnswer(answer)){

    }
    this.questionIndex++;
}

TronQuiz.prototype.isEnded = function (){
    return this.questionIndex === this.questions.length;
}
function Questions (text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Questions.prototype.isCorrectAnswer = function (choice){
    return this.answer === choice;
}

function populate(){
    if(TronQuiz.isEnded()){
        showScores();
    }
    else{
        var element = document.getElementById('questions');
        element.innerHTML = TronQuiz.getQuestionIndex().text;

        var choices = TronQuiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++){
            var element = document.getElementById('choice' + i);
            element.innerHTML = choices[i];
            guess('btn' + i, choices [i]);
        }
        showProgress();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("What year did the original TRON come out?", ["1981", "1982","1983", "1984"], "1982"),
    new Question("What real event happened to Jeff Bridges in 2009 that was still science fiction when the original movie was released?", ["Scanned by computer laser", "Had a motorcycle battle", "Has personal ID disk", "Met hologram AI"], "Scanned by computer laser"),
    new Question("The budget for the original TRON was $13 million. How much did each custom suit cost for the racing scene?", ["$60", "$600","$6000", "$60,000"], "$60,000"),
    new Question("Who did the score for Tron: Legacy and has a cameo in the film?", ["Marshmello", "Daft Punk", "DeadMau5", "Skrillex"], "Daft Punk"),
    new Question("Which character from the original TRON appears as the character Rinzler?", ["Spark", "Yori", "Tron", "Master Control"], "TRON")
];

var quiz = new TronQuiz(questions);

populate();