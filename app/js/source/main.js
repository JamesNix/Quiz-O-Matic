(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#correct').hide();
    $('#incorrect').hide();
    $('#quizBtn').click(askQuestion);
    $('button.submit').click(answerQuestion);
    $('#reset').click(reset);
    $('#roundBtn').click(changeRound);
  }

  var scoreObj ={score: 0, attempt: 0};
  var questions;

  function changeRound(){           //switches between Rounds 1 and 2, defaults to Round 1
    if($('#round').text() === ''){
      $('#round').text('Round 1');
    } else if($('#round').text() === 'Round 1'){
      $('#round').text('');
      $('#round').text('Round 2');
    } else {
      $('#round').text('');
      $('#round').text('Round 1');
    }
  }

  function askQuestion(){           //called from the 'Start quiz' button set the questions, resets board
    reset();

    var q1 = [['How many electrons does an atom of hydrogen have?', '1'],
                     ['How many times have the Chicago Cubs won the World Series?', '2'],
                     ['What music artist was the first to release an album on CD', 'Billy Joel'],
                     ['How many Grammys has Eminem won?', '13']];

    var q2 = [['Which planet in our solar system is the hottest?', 'Venus'],
                     ['How many letters are there in the French alphabet?', '26'],
                     ['What U.S. state has the most coastline?', 'Alaska'],
                     ['What country has the most active volcanoes?', 'Indonesia']];

    $('#score').append('Score: ' + scoreObj.score + '/' + scoreObj.attempt); //sets 'Score' display

    if($('#round').text() === 'Round 1' || $('#round').text() === ''){    //determines which questions get loaded
      $('#round').text('Round 1');
      questions = q1;
    } else if ($('#round').text() === 'Round 2'){
      questions = q2;
    }

    for(var i=0; i < questions.length; i++){
      $('#q' + i).text(questions[i][0]);
    }
  }

  function answerQuestion(){
    $('#score').empty();
    var qnum = $(this).data('qnum');
    if($('.answer' + qnum).val() === ''){
      alert('Please enter an answer.');
    } else if($('.answer' + qnum).val() === questions[qnum][1]){
      $('#q' + qnum).text(questions[qnum][0]).css('color', 'green');
      $('#a' + qnum).append('Correct').css('color', 'green');
      animateCorrect();
      scoreObj.score += 1;
      scoreObj.attempt += 1;
      $('#score').append('Score: ' + scoreObj.score + '/' + scoreObj.attempt);
    } else {
      $('#q' + qnum).text(questions[qnum][0]).css('color', 'red');
      $('#a' + qnum).append('Incorrect').css('color', 'red');
      animateIncorrect();
      scoreObj.score += 0;
      scoreObj.attempt += 1;
      $('#score').append('Score: ' + scoreObj.score + '/' + scoreObj.attempt);
    }
  }

  function animateCorrect(){
    $('#correct').show().animate({color: 'green'}, 2000, function(){
      $('#correct').hide().animate({color: '@bg-color'}, 500);
    });
  }

  function animateIncorrect(){
    $('#incorrect').show().animate({color: 'red'}, 2000, function(){
      $('#incorrect').hide();
    });
  }

  function reset(){
    $('#score').empty();
    scoreObj.score = 0;
    scoreObj.attempt = 0;
    $('input').val('');
    $('#q0').empty().css('color', 'black');
    $('#q1').empty().css('color', 'black');
    $('#q2').empty().css('color', 'black');
    $('#q3').empty().css('color', 'black');
  }

})();

