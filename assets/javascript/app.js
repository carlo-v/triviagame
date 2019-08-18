$(document).ready(function(){
  
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);
  
})

var trivia = {
  
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  
  questions: {
    q1: 'In how many languages is C-3P0 fluent?',
    q2: 'Who actually shot first?',
    q3: 'How many Dewbacks were in the original 1977 theatrical cut of the first Star Wars movie?',
    q4: 'Which bounty hunter in The Empire Strikes Back is wearing an old costume from a Doctor Who episode?',
    q5: "Who is Lando Calrissian's co-pilot in Episode VI: Return of the Jedi?",
    q6: 'What is the name of Boba Fetts ship?',
    q7: "Where was Luke Skywalker originally headed to pick up power converters?"
  },
  options: {
    q1: ['More than 6 million', 'Spanish and English', 'More than 3 million', 'Three hundred'],
    q2: ['Han Solo', 'Chuck Norris', 'Harrison Ford', 'Greedo'],
    q3: ['5', '2', '1', '3'],
    q4: ['Bossk', 'Dumbledore', 'Spock', 'IG-88'],
    q5: ['L3-37','Jesus','Nien Nunb','Chewbacca'],
    q6: ['Pinta','Slave I','Slave II','Titanic'],
    q7: ['Home Depot', 'Tosche Station', 'Lowes','Mos Eisley']
  },
  answers: {
    q1: 'More than 6 million',
    q2: 'Han Solo',
    q3: '2',
    q4: 'Bossk',
    q5: 'Nien Nunb',
    q6: 'Slave I',
    q7: 'Tosche Station'
  },
  
  startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    
    $('#game').show();
    
    
    $('#results').html('');
    
   
    $('#timer').text(trivia.timer);
    
   
    $('#start').hide();

    $('#remaining-time').show();
    
    
    trivia.nextQuestion();
    
  },
   
  nextQuestion : function(){
    
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
   
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
    
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      
      $('#game').hide();
      
      
      $('#start').show();
    }
    
  },
  
  guessChecker : function() {
    
   
    var resultId;
    
    
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    // increment to next question set
    trivia.currentSet++;
    
    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();
    
    // begin next question
    trivia.nextQuestion();
     
  }

}