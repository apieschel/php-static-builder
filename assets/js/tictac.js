/******************************************************************************************************************
		=================================================================================================================== ************************* Minimax Algorithmic Implimentation adapted from: https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 ********************************* *************************************************************************************************************************************************************************************************************************************/

$(document).ready(function () {
	
	let huPlayer = "X";
	let aiPlayer = "O";
	let playerScore = 0; 
	let computerScore = 0;
	let ties = 0;

	const one = document.querySelector("#one");
	const two = document.querySelector("#two");
	const three = document.querySelector("#three");
	const four = document.querySelector("#four");
	const five = document.querySelector("#five");
	const six = document.querySelector("#six");
	const seven = document.querySelector("#seven");
	const eight = document.querySelector("#eight");
	const nine = document.querySelector("#nine");

	let items = document.querySelector(".board").querySelectorAll("li");
	items = Array.from(items);
	let computerVoice = document.querySelector("#computerVoice");

	document.querySelector('.one').addEventListener('click', addX);
	document.querySelector('.two').addEventListener('click', addX);
	document.querySelector('.three').addEventListener('click', addX);
	document.querySelector('.four').addEventListener('click', addX);
	document.querySelector('.five').addEventListener('click', addX);
	document.querySelector('.six').addEventListener('click', addX);
	document.querySelector('.seven').addEventListener('click', addX);
	document.querySelector('.eight').addEventListener('click', addX);
	document.querySelector('.nine').addEventListener('click', addX);

	document.querySelector('#playO').addEventListener('click', playO);

	let gameBoard = [0,1,2,3,4,5,6,7,8];
	let turn = 0;

	function alertTie(){ 
		alert("There was a tie!"); 
		incrementTies();
		reset();
		return true;
	}

	function addX(e) {
		if(this.firstChild.className !== 'X' && this.firstChild.className !== 'O') {
			this.firstChild.innerText = huPlayer;
			this.firstChild.className = huPlayer;
			fadeIn(this.firstChild);

			if(this.firstChild.id === "one") {
				gameBoard[0] = huPlayer;
			} else if(this.firstChild.id === "two") {
				gameBoard[1] = huPlayer;				
			} else if(this.firstChild.id === "three") {
				gameBoard[2] = huPlayer;
			} else if(this.firstChild.id === "four") {
				gameBoard[3] = huPlayer;
			} else if(this.firstChild.id === "five") {
				gameBoard[4] = huPlayer;
			} else if(this.firstChild.id === "six") {
				gameBoard[5] = huPlayer;
			} else if(this.firstChild.id === "seven") {
				gameBoard[6] = huPlayer;
			} else if(this.firstChild.id === "eight") {
				gameBoard[7] = huPlayer;
			} else if(this.firstChild.id === "nine") {
				gameBoard[8] = huPlayer;
				console.log(8);
			}

			console.log(minimax(gameBoard, aiPlayer));
			//gameBoard[computerTurn.index] = "O";
			console.log(gameBoard);

		} else {
			alert("This box is already marked.");
		}

		document.querySelector("#playO").style = "display:none";
		document.querySelector("#playX").style = "display:none";

		if(turn < 4) {
			const compTurn = minimax(gameBoard, aiPlayer);
			gameBoard[compTurn.index] = aiPlayer;
			items[compTurn.index].firstChild.innerText = aiPlayer;
			items[compTurn.index].firstChild.className = aiPlayer;
			fadeIn(items[compTurn.index].firstChild);
			turn = turn + 1;
			console.log(turn);
		}

		checkWin();

	}


	function checkWin() {
		// player horizontal win conditions
		if(one.className === huPlayer && two.className === huPlayer && three.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		if(four.className === huPlayer && five.className === huPlayer && six.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		if(seven.className === huPlayer && eight.className === huPlayer && nine.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		// player vertical win conditions
		if(one.className === huPlayer && four.className === huPlayer && seven.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		if(two.className === huPlayer && five.className === huPlayer && eight.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		if(three.className === huPlayer && six.className === huPlayer && nine.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		// player diagonal win conditions
		if(one.className === huPlayer && five.className === huPlayer && nine.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}
		if(three.className === huPlayer && five.className === huPlayer && seven.className === huPlayer) {alert("You won!"); incrementPlayerScore(); reset();}

		// computer horizontal win conditions
		if(one.className === aiPlayer && two.className === aiPlayer && three.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		if(four.className === aiPlayer && five.className === aiPlayer && six.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		if(seven.className === aiPlayer && eight.className === aiPlayer && nine.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		// computer vertical win conditions
		if(one.className === aiPlayer && four.className === aiPlayer && seven.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		if(two.className === aiPlayer && five.className === aiPlayer && eight.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		if(three.className === aiPlayer && six.className === aiPlayer && nine.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		// computer diagonal win conditions
		if(one.className === aiPlayer && five.className === aiPlayer && nine.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}
		if(three.className === aiPlayer && five.className === aiPlayer && seven.className === aiPlayer) {alert("LYRA won!"); incrementComputerScore(); reset();}

		// check for tie
		items.some( function(item) {
			if(item.firstChild.className !== "O" && item.firstChild.className !== "X") {
				return true;
			}
			if(item.className === "nine") {
				setTimeout(alertTie, 500);
			}
		}
							);
	}

	function computerMove() {
		let playNearest = true;
		// computer plays defense
		// prioritize blocking if the player is in a position to win on the next turn first
		if(one.className === huPlayer && seven.className === huPlayer) {
			if(four.className !== aiPlayer) {
				four.innerText = aiPlayer;
				four.className = aiPlayer;
				playNearest = false;
				console.log("condition1");
			}
		}
		if(one.className === huPlayer && five.className === huPlayer) {
			if(nine.className !== aiPlayer) {
				nine.innerText = aiPlayer;
				nine.className = aiPlayer;
				playNearest = false;
				console.log("condition2");
			} 
		} 
		if(two.className === huPlayer && five.className === huPlayer) {
			if(eight.className !== aiPlayer) {
				eight.innerText = aiPlayer;
				eight.className = aiPlayer;
				playNearest = false;
				console.log("condition3");
			}
		}
		if(three.className === huPlayer && five.className === huPlayer) {
			if(seven.className !== aiPlayer) {
				seven.innerText = aiPlayer;
				seven.className = aiPlayer;
				playNearest = false;
				console.log("condition4");
			}
		}
		// then block the corner tricks
		if(one.className === huPlayer) {
			if(nine.className !== aiPlayer && nine.className !== huPlayer) {
				nine.innerText = aiPlayer;
				nine.className = aiPlayer;
				playNearest = false;
				console.log("condition5");
			}
		} 
		if(three.className === huPlayer) {
			if(seven.className !== aiPlayer && seven.className !== huPlayer) {
				seven.innerText = aiPlayer;
				seven.className = aiPlayer;
				playNearest = false;
				console.log("condition6");
			}
		}
		if(seven.className === huPlayer) {
			if(three.className !== aiPlayer && three.className !== huPlayer) {
				three.innerText = aiPlayer;
				three.className = aiPlayer;
				playNearest = false;
				console.log("condition7");
			}
		}

		// if no conditions found look for the nearest open square and move
		if(playNearest) {
			items.some(function(item) {  
				if(item.firstChild.className !== 'X' && item.firstChild.className !== 'O') {
					item.firstChild.innerText = aiPlayer;
					item.firstChild.className = aiPlayer;
					console.log("condition7");
					return true;
				}
			}	
								);
		}	

		checkWin();
	}

	function reset() {
		items.forEach( function(item) {
			item.firstChild.innerText = "";
			item.firstChild.className = "";
		}
								 );
		gameBoard = [0,1,2,3,4,5,6,7,8];
		turn = 0;
	}

	function playO() {
		huPlayer = "O";
		aiPlayer = "X";
		document.querySelector("#playO").style = "display:none";
		document.querySelector("#playX").style = "display:none";
	}

	function incrementPlayerScore() {
		playerScore = playerScore + 1;
		document.querySelector("#playerScore").innerText = playerScore;
	}

	function incrementComputerScore() {
		computerScore = computerScore + 1;
		document.querySelector("#computerScore").innerText = computerScore;
		computerVoice.innerHTML = "<strong>LYRA:</strong> I knew you'd slip up. You're only human.";
	}

	function incrementTies() {
		ties = ties + 1;
		document.querySelector("#ties").innerText = ties;
		let randNum = Math.random();
		console.log(randNum);
		if (randNum < 0.25) {
			computerVoice.innerHTML = "<strong>LYRA</strong>: You think you can keep this up?";
		}
		if (randNum > 0.25 && randNum < 0.5) {
			computerVoice.innerHTML = "<strong>LYRA</strong>: I'm programmed to have a blind spot. There's one way you can beat me. Just kidding. Ha. Ha. Or am I?";	
		}
		if (randNum > 0.5 && randNum < 0.75) {
			computerVoice.innerHTML = "<strong>LYRA</strong>: I never get tired. The best you can do is tie.";	
		}

		if (randNum > 0.75) {
			computerVoice.innerHTML = "<strong>LYRA</strong>: I'll even let you go first every time.";	
		}
	}

	var testBoard = ["O",1,"X","X",4,"X",6,"O","O"];
	var blankBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	function winning(board, player){
		if (
			(board[0] == player && board[1] == player && board[2] == player) ||
			(board[3] == player && board[4] == player && board[5] == player) ||
			(board[6] == player && board[7] == player && board[8] == player) ||
			(board[0] == player && board[3] == player && board[6] == player) ||
			(board[1] == player && board[4] == player && board[7] == player) ||
			(board[2] == player && board[5] == player && board[8] == player) ||
			(board[0] == player && board[4] == player && board[8] == player) ||
			(board[2] == player && board[4] == player && board[6] == player)
		) {
			return true;
		} else {
			return false;
		}
	}

	// the main minimax function
	function minimax(newBoard, player){

		//available spots
		var availSpots = emptyIndexies(newBoard);

		// checks for the terminal states such as win, lose, and tie 
		//and returning a value accordingly
		if (winning(newBoard, huPlayer)){
			return {score:-10};
		}
		else if (winning(newBoard, aiPlayer)){
			return {score:10};
		}
		else if (availSpots.length === 0){
			return {score:0};
		}

		// an array to collect all the objects
		var moves = [];

		// loop through available spots
		for (var i = 0; i < availSpots.length; i++){
			//create an object for each and store the index of that spot 
			var move = {};
			move.index = newBoard[availSpots[i]];

			// set the empty spot to the current player
			newBoard[availSpots[i]] = player;

			/*collect the score resulted from calling minimax 
      on the opponent of the current player*/
			if (player == aiPlayer){
				var result = minimax(newBoard, huPlayer);
				move.score = result.score;
			}
			else{
				var result = minimax(newBoard, aiPlayer);
				move.score = result.score;
			}

			// reset the spot to empty
			newBoard[availSpots[i]] = move.index;

			// push the object to the array
			moves.push(move);
		}

		// if it is the computer's turn loop over the moves and choose the move with the highest score
		var bestMove;
		if(player === aiPlayer){
			var bestScore = -10000;
			for(var i = 0; i < moves.length; i++){
				if(moves[i].score > bestScore){
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else{

			// else loop over the moves and choose the move with the lowest score
			var bestScore = 10000;
			for(var i = 0; i < moves.length; i++){
				if(moves[i].score < bestScore){
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}

		// return the chosen move (object) from the moves array
		return moves[bestMove];			
	}

	function emptyIndexies(board){
		return  board.filter(s => s != "O" && s != "X");
	}

	function printBoard() {
		console.log(Board[0], Board[1], Board[2]);
		console.log(Board[3], Board[4], Board[5]);
		console.log(Board[6], Board[7], Board[8]);
	}

	function fadeIn(el) {
		el.style.opacity = 0;

		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity + (new Date() - last) / 600;
			last = +new Date();

			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
		};

		tick();
	}

});