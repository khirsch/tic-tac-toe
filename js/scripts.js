// Business Logic

function Player(marker, name, squares) {
  this.marker = marker;
  this.name = name;
  this.squares = squares;
}

function Square(x, y, player) {
  this.x = x;
  this.y = y;
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

var player1 = new Player("cat", "Player 1", []);
var player2 = new Player("dog", "Player 2", []);

var allPlayers = [player1, player2];

var square1 = new Square(1, 1, '');
var square2 = new Square(2, 1, '');
var square3 = new Square(3, 1, '');
var square4 = new Square(1, 2, '');
var square5 = new Square(2, 2, '');
var square6 = new Square(3, 2, '');
var square7 = new Square(1, 3, '');
var square8 = new Square(2, 3, '');
var square9 = new Square(3, 3, '');

var allSquares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
var winningSquareCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

var board = new Board(allSquares, false);

var game = new Game(allPlayers, player1, board, false);

Player.prototype.mark = function() {
  return this.marker;
}

Square.prototype.markedBy = function() {
  return this.player.marker;
}

Square.prototype.coords = function() {
  return this.x + this.y;
}

Board.prototype.mark = function(num) {
  this.squares[num].player = game.currentPlayer;
  if (game.currentPlayer === player1) {
    game.currentPlayer = player2;
  } else {
    game.currentPlayer = player1;
  }
}

Board.prototype.threeInRow = function() {

}

Board.prototype.findSquare = function() {

}

Game.prototype.playAgain = function() {
  player1 = new Player("cat", "Player 1", []);
  player2 = new Player("dog", "Player 2", []);
  allPlayers = [player1, player2];
  square1 = new Square(1, 1, '');
  square2 = new Square(2, 1, '');
  square3 = new Square(3, 1, '');
  square4 = new Square(1, 2, '');
  square5 = new Square(2, 2, '');
  square6 = new Square(3, 2, '');
  square7 = new Square(1, 3, '');
  square8 = new Square(2, 3, '');
  square9 = new Square(3, 3, '');
  allSquares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
  board = new Board(allSquares, false);
  game = new Game(allPlayers, player1, board, false);
  // front end logic with reset button to clear dog/cat classes from all .square
}



// User Interface Logic

$(function() {
  $(".square").click(function() {
    var current = $(this).attr('id');
    if (board.squares[current].player === ""){
      $(this).addClass(game.currentPlayer.marker);
      board.mark(current);
      if (board.series === true) {
        $("#message").html(game.currentPlayer.name + " wins!");
      }
    } else {
      $("#message").html(game.currentPlayer.name + ", that square is already taken! Pick again!");
    }

  });
});
