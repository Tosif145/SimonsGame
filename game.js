var buttonColours = ["red", "blue", "green", "yellow"];

// Game Initializing
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

// starting with random key press
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

// finding user clicks
$(".btn").click(function(){
  var userChoosenColor = $(this).attr("id");
  userPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userPattern.length-1);
});

// gamePattern sequence
function nextSequence(){
  userPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

// checking answers
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(userPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("worng");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press any key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
// play sound
function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

// Animate buttonColours
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

// Initializing game again
function startOver(){
  leverl = 0;
  gamePattern = [];

  started = false;

}
