
var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var startGame = false;

var level = 0;

$(document).keydown(function(){

    if(startGame === false){
      nextSequence();
      startGame = true;
    }

})


$(".btn").click(function(){

  var userChosenColour = this.id;

  playSound(userChosenColour);

  animatePress(userChosenColour);

  userClickedPattern.push(userChosenColour);

  checkedAnswer(userClickedPattern.length - 1);
})


function playSound(name){

  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();

}

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100)
}


function nextSequence(){

  level++;

  $("#level-title").text("level "+ level);

  userClickedPattern =[];

  var randomNumber = Math.floor((Math.random()*4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function reset(){

  level = 0;
  gamePattern = [];
  startGame = false;
}

function gameOver(){

  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },100);
  $("#level-title").text("Game Over. Press Any Key to Restart.")
  reset();

}

function checkedAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(currentLevel === gamePattern.length -1 ){
      setTimeout(function(){
        nextSequence();
      },1000)
    }

  }else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {

    gameOver();
  }


}
