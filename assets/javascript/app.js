$(document).ready(function(){

var triviaQuestions = [
        {
            question: "Who's baby did rachel have?",
            answerList: ["Chandler's", "Ross's", "Joey's", "Paulo's"],
            answer: 1
        },
        {
            question: "Why does Carol, Ross' wife leave him?",
            answerList: ["She can't stand Ross's freinds", "Ross refuses to have children", "She catches Ross cheating on her", "She realizes she is a lesbian"],
            answer: 3
        },
        {
            question: "How many babies did Phoebe carry for her brother?",
            answerList: ["3", "2", "1", "0"],
            answer: 0
        },
        {
            question: "How many seasons of the show were made?",
            answerList: ["6","7","8","10"],
            answer: 3
        },
        {
            question: "Where did Monica and Chandler first get together?",
            answerList: ["Monica's Parent's House", "The Beach", "New York", "London"],
            answer: 3
        },
        {
            question: "Whose son is Ben?",
            answerList: ["Chandler's","Phoebe's","Ross's","Rachel's"],
            answer: 2
        },
        {
            question: "Whose catchphrase is 'Oh My God!'?",
            answerList: ["Jane", "Janice", "Janeane", "Jackie"],
            answer: 1
        },
        {
            question: "What is Monica's job?",
            answerList: ["Archaeologist","Retail","Nurse","Chef"],
            answer: 3
        },
        {
            question: "Who lives above Rachel and Monica?",
            answerList: ["Mr. Heckles", "Mr. Davis", "Chandler and Joey", "No One"],
            answer: 0
        },
        {
            question: "What type of report does Chandler read at work?",
            answerList: ["The Wenus Report", "The Sales Report", "The Fiscal Audit", "The Chron Report"],
            answer: 0
        }
    ]; 

var imgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
    correct: "Correct! you are the Freinds Master!",
    incorrect: "Wrong! Have you ever watched this show?",
    endTime: "Out of time!",
    finished: "Alright! Let's see how good of a friend you are..."
}

// newGame()

console.log('test');



    $('#startBtn').on('click', function(){
        console.log('test star btn');
        $('#startBtn').hide();
        newGame();
    });

    $('#startOverBtn').on('click', function(){
        $('#startOverBtn').hide();
        newGame();
    });

    function newGame(){
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unanswered').empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    function newQuestion(){
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#img').empty();
        answered = true;


        
        //sets up new questions & answerList
        $('#currentQuestion').html("Number of Correct Answers: " + correctAnswer);
        $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
        for(var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
        countdown();
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click',function(){
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    }

    function countdown(){
        seconds = 10;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown(){
        seconds--;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage(){
        $('#currentQuestion').empty();
        $('.thisChoice').empty(); //Clears question page
        $('.question').empty();

        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        $('#img').html('<img src = "assets/images/'+ imgArray[currentQuestion] +'.jpg" width = "400px">');
        //checks to see correct, incorrect, or unanswered
        if((userSelect == rightAnswerIndex) && (answered == true)){

            console.log()
            correctAnswer++;
            $('#message').html(messages.correct);
            $('#currentQuestion').html("Number of Correct Answers: " + currentQuestion);
        } else if((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else{
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        
        if(currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 2000)
        } else{
            currentQuestion++;
            setTimeout(newQuestion, 2000);
        }   
    }

    function scoreboard(){
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#img').empty();

        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    }

  
})
