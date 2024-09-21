// Initialize variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = -1;
let max=0;
// Start the game when any key is pressed
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// When a button is clicked
$(".button").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Function to generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  max=Math.max(max,level);
  $("#level-title").text("Level " + level);
  h2=document.querySelector("h2");
  h2.innerText=``;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).addClass("flash");
  setTimeout(function() {
    $("#" + randomChosenColor).removeClass("flash");
  }, 200);
  playSound(randomChosenColor);
}

// Function to check the player's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    h2=document.querySelector("h2");
    h2.innerHTML=`Game Over! Current Score <b>${level}</b></br> Highest Score <b>${max}</b></br>  Press any key to start.`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(()=>{document.querySelector("body").style.backgroundColor="#2c3e50"},150)
    startOver();
  }
}

// Function to restart the game
function startOver() {
  level = -1;
  gamePattern = [];
  started = false;
}

// Function to play sound based on color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("userFlash");
  setTimeout(function() {
    $("#" + currentColor).removeClass("userFlash");
  }, 150);
}
