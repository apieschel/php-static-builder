$(document).ready(function () {

	var Square = function (specs, color) {
		this.size = {
			x: 250,
			y: 250
		};
		this.specs = specs;
		this.color = color;
	};

	let board = [];
	let canvas = document.getElementById("screen");
	let screen = canvas.getContext('2d');

	board.push(new Square([0, 0, 250, 250], "#00A74A"));
	board.push(new Square([250, 0, 250, 250], "#9F0F17"));
	board.push(new Square([0, 250, 250, 250], "#CCA707"));
	board.push(new Square([250, 250, 250, 250], "#094A8F"));

	drawStart(board, screen);

	function drawStart(board, screen) {
		let one = board[0];
		let two = board[1];
		let three = board[2];
		let four = board[3];
		screen.fillStyle = one.color;
		screen.fillRect(one.specs[0], one.specs[1], one.specs[2], one.specs[3]);
		screen.fillStyle = two.color;
		screen.fillRect(two.specs[0], two.specs[1], two.specs[2], two.specs[3]);
		screen.fillStyle = three.color;
		screen.fillRect(three.specs[0], three.specs[1], three.specs[2], three.specs[3]);
		screen.fillStyle = four.color;
		screen.fillRect(four.specs[0], four.specs[1], four.specs[2], four.specs[3]);
	}

	/* Web Audio API Oscillator Button Demo: https://codepen.io/honmanyau/pen/rypWop?editors=1010. This is great because it means the game can rely on internally created sine waves for sound rather than external mp3s! */
	let audioContext = new(window.AudioContext || window.webkitAudioContext)();
	let note = null;

	function makeOscillator(frequency, shape) {
		let oscillator = audioContext.createOscillator();
		// For volume control
		let gainNode = audioContext.createGain();

		//Connecting nodes together in this order: source (oscillator)-gain node-destination
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		// Oscillator settings
		oscillator.type = shape;
		oscillator.frequency.value = frequency;

		return oscillator;
	}

	var Game = function () {
		let board = [];
		let canvas = document.getElementById("screen");
		let screen = canvas.getContext('2d');
		let aiSequence = [];
		let self = this;

		board.push(new Square([0, 0, 250, 250], "#00A74A"));
		board.push(new Square([250, 0, 250, 250], "#9F0F17"));
		board.push(new Square([0, 250, 250, 250], "#CCA707"));
		board.push(new Square([250, 250, 250, 250], "#094A8F"));

		this.draw(board, screen);

		self.repeatMove(canvas, board, screen, [3, 3, 0, 3, 3, 3, 0, 3, 0, 1, 2, 3, 3, 3, 0, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]);

		setTimeout(function () {
			self.computerMove(canvas, board, screen, aiSequence);
			canvas.className = "";
		}, 6000);

		// Add a click event to the canvas
		canvas.addEventListener('click', function (event) {
			if (!canvas.classList.contains('disabled')) {
				self.playerMove(canvas, event, board, screen, aiSequence, self);
			}
		});

		document.getElementById("restart").addEventListener("click", function (event) {
			self.restart(event)
		});

		document.getElementById("strictBtn").addEventListener("click", function (event) {
			self.strict = true;
			document.querySelector(".strict-light").style = "background-color:red";
		});

	};

	Game.prototype = {
		turn: 0,

		count: 1,

		playerSequence: [],

		strict: false,

		draw: function (board, screen) {
			let one = board[0];
			let two = board[1];
			let three = board[2];
			let four = board[3];
			screen.fillStyle = one.color;
			screen.fillRect(one.specs[0], one.specs[1], one.specs[2], one.specs[3]);
			screen.fillStyle = two.color;
			screen.fillRect(two.specs[0], two.specs[1], two.specs[2], two.specs[3]);
			screen.fillStyle = three.color;
			screen.fillRect(three.specs[0], three.specs[1], three.specs[2], three.specs[3]);
			screen.fillStyle = four.color;
			screen.fillRect(four.specs[0], four.specs[1], four.specs[2], four.specs[3]);
		},

		repeatMove: function (canvas, board, screen, aiSequence) {

			canvas.className = "disabled";
			let repeatTime = 0;

			for (i = 0; i < aiSequence.length; i++) {
				setTimeout(
					function (x) {
						return function () {
							if (aiSequence[x] === 0) {
								let note9 = makeOscillator(440, "sine");
								note9.start();

								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
								screen.fillStyle = "#58fc5b";
								screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
									screen.fillStyle = "#00A74A";
									screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
									note9.stop();
								}, 100);
							}

							if (aiSequence[x] === 1) {
								let note10 = makeOscillator(329.6, "sine");
								note10.start();

								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);
								screen.fillStyle = "#fc8474";
								screen.fillRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
									screen.fillStyle = "#9F0F17";
									screen.fillRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
									note10.stop();
								}, 100);
							}

							if (aiSequence[x] === 2) {
								let note11 = makeOscillator(261.6, "sine");
								note11.start();

								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
								screen.fillStyle = "#fcfa94";
								screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
									screen.fillStyle = "#CCA707";
									screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
									note11.stop();
								}, 100);
							}


							if (aiSequence[x] === 3) {
								let note12 = makeOscillator(220, "sine");
								note12.start();

								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
								screen.fillStyle = "#8ef6f9";
								screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
									screen.fillStyle = "#094A8F";
									screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
									note12.stop();
								}, 100);
							}

						};
					}(i), 200 * i
				);
				repeatTime = 200 * i;
			}

			console.log("AI Sequence: " + aiSequence);
			setTimeout(function () {
				canvas.className = "";
			}, repeatTime);
		},

		computerMove: function (canvas, board, screen, aiSequence) {
			let rand = getRandomInt(4);
			let time = 0;
			aiSequence.push(rand);

			for (i = 0; i < aiSequence.length; i++) {
				setTimeout(
					function (x) {
						return function () {
							console.log(aiSequence[x]);
							if (aiSequence[x] === 0) {
								let note = makeOscillator(440, "sine");
								note.start();
								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
								screen.fillStyle = "#58fc5b";
								screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
									screen.fillStyle = "#00A74A";
									screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
									note.stop();
								}, 150);

							}

							if (aiSequence[x] === 1) {
								let note2 = makeOscillator(329.6, "sine");
								note2.start();
								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);
								screen.fillStyle = "#fc8474";
								screen.fillRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
									screen.fillStyle = "#9F0F17";
									screen.fillRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
									note2.stop();
								}, 150);
							}

							if (aiSequence[x] === 2) {
								let note3 = makeOscillator(261.6, "sine");
								note3.start();
								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
								screen.fillStyle = "#fcfa94";
								screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
									screen.fillStyle = "#CCA707";
									screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
									note3.stop();
								}, 150);
							}

							if (aiSequence[x] === 3) {
								let note4 = makeOscillator(220, "sine");
								note4.start();
								// On click, clear the rectangle and draw one with a lighter color
								screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
								screen.fillStyle = "#8ef6f9";
								screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);

								// After a one-second delay, clear the rectangle and draw one with the original color
								setTimeout(function () {
									screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
									screen.fillStyle = "#094A8F";
									screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
									note4.stop();
								}, 150);
							}



						};
					}(i), 250 * i
				);
				time = 250 * i;
			}

			setTimeout(function () {
				canvas.className = "";
			}, time);
			console.log("AI Sequence: " + aiSequence);

		},

		playerMove: function (canvas, event, board, screen, aiSequence, self) {

			let rect = canvas.getBoundingClientRect();
			let xc = event.clientX - rect.left;
			let yc = event.clientY - rect.top;
			let wrongNote = makeOscillator(110, "sine");
			console.log("X: " + xc);
			console.log("Y: " + yc);

			// If the click is inside the first square
			if (xc >= board[0].specs[0] && xc <= board[0].specs[0] + board[0].specs[3] && yc >= board[0].specs[1] && yc <= board[0].specs[1] + board[0].specs[3]) {
				console.log("You clicked the first square!");

				let note5 = makeOscillator(440, "sine");
				note5.start();

				// On click, clear the rectangle and draw one with a lighter color
				screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
				screen.fillStyle = "#58fc5b";
				screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);

				// After a one-second delay, clear the rectangle and draw one with the original color
				setTimeout(function () {
					screen.clearRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
					screen.fillStyle = "#00A74A";
					screen.fillRect(board[0].specs[0], board[0].specs[1], board[0].size.x, board[0].size.y);
					note5.stop();
				}, 150);

				if (aiSequence[self.turn] === 0) {
					self.playerSequence.push(0);
					self.turn = self.turn + 1;
				} else {
					if (self.strict) {
						alert("GAME OVER. Incorrect in strict mode. Click 'OK' to RESTART.");
						location.reload();
					} else {
						document.getElementById("steps").innerText = "!!";
						self.playerSequence = [];
						self.turn = 0;
						setTimeout(function () {
							wrongNote.start();
						}, 250);
						setTimeout(function () {
							wrongNote.stop();
						}, 600);
						setTimeout(function () {
							self.repeatMove(canvas, board, screen, aiSequence);
							document.getElementById("steps").innerText = self.count;
						}, 1500);
					}
				}
			}

			// If the click is inside the second square
			if (xc >= board[1].specs[0] && xc <= board[1].specs[0] + board[1].specs[3] && yc >= board[1].specs[1] && yc <= board[1].specs[1] + board[1].specs[3]) {
				console.log("You clicked the second square!");

				let note6 = makeOscillator(329.6, "sine");
				note6.start();

				// On click, clear the rectangle and draw one with a lighter color
				screen.clearRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);
				screen.fillStyle = "#fc8474";
				screen.fillRect(board[1].specs[0], board[1].specs[1], board[1].size.x, board[1].size.y);

				// After a one-second delay, clear the rectangle and draw one with the original color
				setTimeout(function () {
					screen.clearRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
					screen.fillStyle = "#9F0F17";
					screen.fillRect(board[1].specs[0], board[1].specs[1], board[0].size.x, board[0].size.y);
					note6.stop();
				}, 150);

				if (aiSequence[self.turn] === 1) {
					self.playerSequence.push(1);
					self.turn = self.turn + 1;
				} else {
					if (self.strict) {
						alert("GAME OVER. Incorrect in strict mode. Click 'OK' to RESTART.");
						location.reload();
					} else {
						document.getElementById("steps").innerText = "!!";
						self.playerSequence = [];
						self.turn = 0;
						setTimeout(function () {
							wrongNote.start();
						}, 250);
						setTimeout(function () {
							wrongNote.stop();
						}, 600);
						setTimeout(function () {
							self.repeatMove(canvas, board, screen, aiSequence);
							document.getElementById("steps").innerText = self.count;
						}, 1500);
					}
				}
			}

			// If the click is inside the third square
			if (xc >= board[2].specs[0] && xc <= board[2].specs[0] + board[2].specs[3] && yc >= board[2].specs[1] && yc <= board[2].specs[1] + board[2].specs[3]) {
				console.log("You clicked the third square!");

				let note7 = makeOscillator(261.6, "sine");
				note7.start()

				// On click, clear the rectangle and draw one with a lighter color
				screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
				screen.fillStyle = "#fcfa94";
				screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);

				// After a one-second delay, clear the rectangle and draw one with the original color
				setTimeout(function () {
					screen.clearRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
					screen.fillStyle = "#CCA707";
					screen.fillRect(board[2].specs[0], board[2].specs[1], board[2].size.x, board[2].size.y);
					note7.stop();
				}, 150);

				// If it's correct then push the player's move into the array. If not, let player know and retry.
				if (aiSequence[self.turn] === 2) {
					self.playerSequence.push(2);
					self.turn = self.turn + 1;
				} else {
					if (self.strict) {
						alert("GAME OVER. Incorrect in strict mode. Click 'OK' to RESTART.");
						location.reload();
					} else {
						document.getElementById("steps").innerText = "!!";
						self.playerSequence = [];
						self.turn = 0;
						setTimeout(function () {
							wrongNote.start();
						}, 250);
						setTimeout(function () {
							wrongNote.stop();
						}, 600);
						setTimeout(function () {
							self.repeatMove(canvas, board, screen, aiSequence);
							document.getElementById("steps").innerText = self.count;
						}, 1500);
					}
				}
			}

			// If the click is inside the fourth square
			if (xc >= board[3].specs[0] && xc <= board[3].specs[0] + board[3].specs[3] && yc >= board[3].specs[1] && yc <= board[3].specs[1] + board[3].specs[3]) {
				console.log("You clicked the fourth square!");

				let note8 = makeOscillator(220, "sine");
				note8.start();

				// On click, clear the rectangle and draw one with a lighter color
				screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
				screen.fillStyle = "#8ef6f9";
				screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);

				// After a one-second delay, clear the rectangle and draw one with the original color
				setTimeout(function () {
					screen.clearRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
					screen.fillStyle = "#094A8F";
					screen.fillRect(board[3].specs[0], board[3].specs[1], board[3].size.x, board[3].size.y);
					note8.stop();
				}, 150);

				// If it's correct then push the player's move into the array. If not, let player know and retry.
				if (aiSequence[self.turn] === 3) {
					self.playerSequence.push(3);
					self.turn = self.turn + 1;
				} else {
					if (self.strict) {
						alert("GAME OVER. Incorrect in strict mode. Click 'OK' to RESTART.");
						location.reload();
					} else {
						document.getElementById("steps").innerText = "!!";
						self.playerSequence = [];
						self.turn = 0;
						setTimeout(function () {
							wrongNote.start();
						}, 250);
						setTimeout(function () {
							wrongNote.stop();
						}, 600);
						setTimeout(function () {
							self.repeatMove(canvas, board, screen, aiSequence);
							document.getElementById("steps").innerText = self.count;
						}, 1500);
					}
				}
			}

			console.log(self.playerSequence);
			console.log(aiSequence);

			if (JSON.stringify(self.playerSequence) === JSON.stringify(aiSequence)) {
				setTimeout(function () {
					self.turn = 0;
					self.count = self.count + 1;
					if (self.count > 19) {
						alert("You win!");
						location.reload();
					} else {
						document.getElementById("steps").innerText = self.count;
						canvas.className = "disabled";
						self.computerMove(canvas, board, screen, aiSequence);
					}
				}, 1000);
				self.playerSequence = [];
			}

		},

		restart: function (event) {
			location.reload();
		}

	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	document.getElementById("switch").addEventListener("click", loadGame);

	function loadGame() {
		audioContext.resume();
		let game = new Game();
		document.getElementById("on-switch").style = "float:right;";
		document.getElementById("switch").style = "display:none;";
		document.getElementById("steps").style = "color:#DC0D29;";
	};

	function fadeOutEffect(el) {
		var fadeTarget = el;
		var fadeEffect = setInterval(function () {
			if (!fadeTarget.style.opacity) {
				fadeTarget.style.opacity = 1;
			}
			if (fadeTarget.style.opacity < 0.1) {
				clearInterval(fadeEffect);
			} else {
				fadeTarget.style.opacity -= 0.1;
			}
		}, 100);
		setTimeout(function () {
			document.getElementById("switch").style = "display:none";
		}, 1000);
	}

});