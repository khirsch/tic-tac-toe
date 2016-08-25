// ==== Business Logic ====

// Object Constructors
function Player(marker, name, squares) {
  this.marker = marker;
  this.name = name;
  this.squares = squares;
}

function Square(id, player) {
  this.id = id;
  this.player = player;
}

function Board(squares, series) {
  this.squares = squares;
  this.series = series;
}

function Game(players, currentPlayer, board, gameOver) {
  this.players = players;
  this.currentPlayer = currentPlayer;
  this.board = board;
  this.gameOver = gameOver;
}

// Instance variables
var player1 = new Player("cat", "Player 1", []);
var player2 = new Player("dog", "Player 2", []);

var allPlayers = [player1, player2];

var square1 = new Square(0, '');
var square2 = new Square(1, '');
var square3 = new Square(2, '');
var square4 = new Square(3, '');
var square5 = new Square(4, '');
var square6 = new Square(5, '');
var square7 = new Square(6, '');
var square8 = new Square(7, '');
var square9 = new Square(8, '');

var allSquares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
var winningSquareCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

var board = new Board(allSquares, false);

var game = new Game(allPlayers, player1, board, false);

// Prototype methods for objects
Player.prototype.mark = function() {
  return this.marker;
}

Square.prototype.markedBy = function() {
  return this.player.marker;
}

Board.prototype.mark = function(num) {
  this.squares[num].player = game.currentPlayer;
  game.currentPlayer.squares.push(this.squares[num].id);
  board.threeInRow();
  if (board.series) {
    return;
  }
  if (game.currentPlayer === player1) {
    game.currentPlayer = player2;
  } else {
    game.currentPlayer = player1;
  }
}

Board.prototype.threeInRow = function() {
  for (var i = 0; i < winningSquareCombos.length; i++) {
    var win = true;
    for (var j = 0; j < 3; j++) {
      if (game.currentPlayer.squares.indexOf(winningSquareCombos[i][j]) === -1) {
        win = false;
      }
    }
    if (win === true) {
      board.series = true;
      game.gameOver = true;
    }
  }
}

Board.prototype.noWinner = function() {
  var noWinner = true;
  for (var i = 0; i < this.squares.length; i++) {
    if (this.squares[i].player === "") {
      noWinner = false;
    }
  }
  if (noWinner === true) {
    game.gameOver = true;
  }
}

Game.prototype.playAgain = function() {
  player1 = new Player("cat", "Player 1", []);
  player2 = new Player("dog", "Player 2", []);
  allPlayers = [player1, player2];
  square1 = new Square(0, '');
  square2 = new Square(1, '');
  square3 = new Square(2, '');
  square4 = new Square(3, '');
  square5 = new Square(4, '');
  square6 = new Square(5, '');
  square7 = new Square(6, '');
  square8 = new Square(7, '');
  square9 = new Square(8, '');
  allSquares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
  board = new Board(allSquares, false);
  game = new Game(allPlayers, player1, board, false);
}



// ==== User Interface Logic ====

$(function() {
  $(".square").click(function() {
    if (!game.gameOver) {
      var current = $(this).attr('id');
      if (board.squares[current].player === ""){
        $(this).addClass(game.currentPlayer.marker);
        board.mark(current);
        if (board.series === true) {
          $("#message").html(game.currentPlayer.name + " wins!");
          $(".btn").show();
        } else {
          $("#message").html("You're up, " + game.currentPlayer.name + ". Place your marker.");
        }
      } else {
        $("#message").html("That square is already taken, " + game.currentPlayer.name +". Pick again!");
      }
    }
    board.noWinner();
    if (game.gameOver && !board.series){
      $("#message").html("It's a draw! No one wins.");
      $(".btn").show();
    }
  });

  $(".btn").click(function() {
    game.playAgain();
    $('.square').removeClass("cat dog");
    $("#message").html("Player 1 goes first! Place your marker.");
    $(this).hide();
  });

  // Sound effects

  function Sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
          this.sound.play();
      }
  }

  var meow = new Sound("sounds/meow.mp3");
  var woof = new Sound("sounds/woof.mp3");

  $("#cat").click(function() {
    meow.play();
  });

  $("#dog").click(function() {
    woof.play();
  });


});
