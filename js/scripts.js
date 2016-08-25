// Business Logic

function Player(marker) {
  this.marker = marker;
}

Player.prototype.mark = function() {
  return this.marker;
}

function Square(x, y, player) {
  this.x = x;
  this.y = y;
  this.player = player;
}

Square.prototype.markedBy = function() {
  return this.player.marker;
}

Square.prototype.coords = function() {
  return this.x + ", " + this.y;
}

function Board(squares, series) {
  this.squares = squares;
  this.series = series;
}

Board.prototype.threeInRow = function() {

}

Board.prototype.findSquare = function() {

}

function Game(players, currentPlayer, board, gameOver) {
  this.players = players;
  this.currentPlayer = currentPlayer;
  this.board = board;
  this.gameOver = gameOver;
}

var player1 = new Player("cat");
var player2 = new Player("dog");

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

var board = new Board(allSquares, false);

var game = new Game(allPlayers, player1, board, false);






// User Interface Logic

$(function() {
  $(".square").click(function() {
    $(this).addClass(game.currentPlayer.marker);
    if (game.currentPlayer === player1) {
      game.currentPlayer = player2;
    } else {
      game.currentPlayer = player1;
    }
  });
});
