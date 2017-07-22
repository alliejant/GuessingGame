$(document).ready(function(){
  var game = new Game();
  $(this).keypress(function(e){
      if(e.which == 13){
        $("#submit").click()
      }
  });

  $("#submit").on("click", function(){
    var guess = +$("#player-input").val();
    $("#player-input").val("");
    $("#spacer").css("margin-top", "50px");
    game.playersGuessSubmission(guess);
  });

  $("#hint").on("click", function(){
    var hintMessage = game.provideHint();
    $("#hint-dialog").text(hintMessage);
    $("button#hint").css("visibility", "hidden");
  });

  $("#reset").on("click", function(){
    resetSettings();
    game = new Game();
  });
});

function resetSettings(){
  $("li").text("_");
  $("#submit, #hint").css("visibility", "visible");
  $("#dialog").text("");
  $("#hint-dialog").text("");
  $("#spacer").css("margin-top", "70px");
  $("#reset").css("background-color", "");
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

function generateWinningNumber(){
  return Math.floor(Math.random() * 100 + 1);
}

Game.prototype.playersGuessSubmission = function(num){
  this.playersGuess = num;
  if (this.playersGuess >= 1 && this.playersGuess <= 100){
    this.isNewGuess();
  } else {
    $("#dialog").text("That is an invalid guess.");
  }
}

Game.prototype.isNewGuess = function(){
  if (this.pastGuesses.indexOf(this.playersGuess) > -1){
    $("#dialog").text("You have already guessed that number.");
  } else {
    this.pastGuesses.push(this.playersGuess);
    this.checkGuess();
  }
}

Game.prototype.checkGuess = function(){
  var num = this.pastGuesses.length;
  $("#guesses li:nth-child(" + num + ")").text(this.playersGuess);
  if(this.playersGuess === this.winningNumber){
    this.resetGame("You Win!");
  } else if(this.pastGuesses.length === 5) {
    this.resetGame("You Lose. The number was: " + this.winningNumber + ".");
  } else {
    this.addGuess();
  }
}

Game.prototype.resetGame = function(message){
  $("#dialog").text(message + " Click reset to play new game.");
  $("#submit, #hint").css("visibility", "hidden");
  $("#reset").css("background-color", "#9DE29D");
}

Game.prototype.addGuess = function() {
    var diff = + Math.abs(this.winningNumber - this.playersGuess);
    var low = this.isLower();
    if (diff < 10) {
      $("#dialog").text("You're burning up! You are within 10, " + low);
    } else if (diff < 25){
      $("#dialog").text("You're lukewarm. You are within 25, " + low);
    } else if (diff < 50){
      $("#dialog").text("You're a bit chilly. You are within 50, " + low);
    } else {
      $("#dialog").text("You're ice cold! ... " + low);
    }
}

Game.prototype.isLower = function(){
  if(this.playersGuess < this.winningNumber){
    return "guess higher!";
  } else {
    return "guess lower!";
  }
}

Game.prototype.provideHint = function(){
  var hintArr = [];
  hintArr.push(this.winningNumber);
  for(var i = 0; i < 33; i++){
   var num = generateWinningNumber();
   hintArr.push(num);
  }
  var choices = shuffle(hintArr).join(", ");
  return "The winning number is one of these: " + choices + "."
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}


