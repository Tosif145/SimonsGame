var  colors = ["green","red","yellow","blue"];

var gamePattern =  [];
var userPattern = [];

var level = 0;

var started = false;

$(document).keypress(function(){
  if(!started){
      $("#level-title").text("Level "+ level);
     nextSequence();
     started = true;
  }
});


$(".btn").click(function(){
  var userClickedColor = $(this).attr("id");
  userPattern.push(userClickedColor);
  playSound(userClickedColor);
  animatePres(userClickedColor);
  // alert("game pat "+gamePattern);
  // alert("This is users "+userPattern);
  checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userPattern[currentLevel] === gamePattern[currentLevel]){
    if(userPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Pressy Any Key to start again.");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOVer();
  }
}


function nextSequence(){
  userPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = colors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level "+ level);


}


function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePres(currentColor){
  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

function startOVer(){
  gamePattern = [];
  level = 0;
  started = false;
}
