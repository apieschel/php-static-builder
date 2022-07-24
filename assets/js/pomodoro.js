$(document).ready(function () {

	let sessionTime = document.getElementById("session-timer");
	let breakTime = document.getElementById("break-timer");
	let clock = document.getElementById("clock");
	let start = document.getElementById("start");
	let isBreak = false;
	let paused = true;

	clock.innerText = sessionTime.innerText;

	start.addEventListener("click", countDown);
	document.getElementById("up").addEventListener("click", increment);
	document.getElementById("down").addEventListener("click", decrement);
	document.getElementById("breakup").addEventListener("click", incrementBreak);
	document.getElementById("breakdown").addEventListener("click", decrementBreak);

	function countDown() {

		// Clear the "pause" event listener to avoid bugs by cloning the element
		var old_element = document.getElementById("pause");
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);

		start.style = "display:none";
		paused = false;

		let sessionVal = parseInt(sessionTime.innerText);
		let breakVal = parseInt(breakTime.innerText);
		let difference = 0;

		if(isBreak) {
			difference = breakVal;
			document.getElementById("session-or-break").innerText = "Break";
		} else {
			difference = sessionVal;
			document.getElementById("session-or-break").innerText = "Session";
		}

		// Set the date we're counting down to
		let countDownDate = new Date().getTime() + difference*60000;

		// Update the count down every 1 second
		let x = setInterval(function () {
			
				
			// Get todays date and time
			let now = new Date().getTime();

			// Find the distance between now and the count down date
			let distance = countDownDate - now;
			//console.log(1500000 - distance);

			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.round((distance % (1000 * 60)) / 1000);

			if(seconds === 60) {
				seconds = 0;
				minutes = minutes + 1;
			}

			if(seconds < 10) {
				seconds = "0" + seconds.toString();
			}

			// Display the result in the element with id="clock"
			document.getElementById("clock").innerHTML = minutes + ":" + seconds;
			document.title = "Pomodoro: " + minutes + ":" + seconds;

			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
				document.getElementById("clock").innerHTML = "0:00";

				if(isBreak) {
					alert("Break's over! Let's get back to work.");
					isBreak = false;
				} else {
					alert("Don't push yourself too hard! Time for a break.");
					isBreak = true;
				}
				countDown();
			}
			
		}, 1000);

		document.getElementById("pause").addEventListener("click", function() {

			if(paused){ 
				let time = document.getElementById("clock").innerText; 

				if(time.length > 2) {
					let seconds = parseInt(time.slice(-2));
					let minutes = parseInt(time.substr(0, time.indexOf(':')));
					countDownDate = new Date().getTime() + minutes*60000 + seconds*1000;
				} else {
					let minutes = parseInt(time);
					countDownDate = new Date().getTime() + minutes*60000;
				}

				paused=false; 
				x = setInterval(function () {
					
						
			// Get todays date and time
			let now = new Date().getTime();

			// Find the distance between now and the count down date
			let distance = countDownDate - now;
			//console.log(1500000 - distance);

			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.round((distance % (1000 * 60)) / 1000);

			if(seconds === 60) {
				seconds = 0;
				minutes = minutes + 1;
			}

			if(seconds < 10) {
				seconds = "0" + seconds.toString();
			}

			// Display the result in the element with id="clock"
			document.getElementById("clock").innerHTML = minutes + ":" + seconds;
			document.title = "Pomodoro: " + minutes + ":" + seconds;

			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
				document.getElementById("clock").innerHTML = "0:00";

				if(isBreak) {
					alert("Break's over! Let's get back to work.");
					isBreak = false;
				} else {
					alert("Don't push yourself too hard! Time for a break.");
					isBreak = true;
				}
				countDown();
			}
					
				}, 1000); 
			} else { 
				paused=true; 
				clearInterval(x);
			} 
		});

	}

	function increment() {
		if(paused) {
			isBreak = false;
			let val = sessionTime.innerText;
			val = parseInt(val);
			if(val < 59) { 
				val = val + 1;
			} else {
				val = 1;
			}
			sessionTime.innerHTML = val;
			document.getElementById("clock").innerText = val;
			document.getElementById("session-or-break").innerText = "Session";
		}
	} 

	function decrement() {
		if(paused) {
			isBreak = false;
			let val = sessionTime.innerText;
			val = parseInt(val);
			if(val > 1) { 
				val = val - 1;
			} else {
				val = 59;
			}
			sessionTime.innerHTML = val;
			document.getElementById("clock").innerText = val;
			document.getElementById("session-or-break").innerText = "Session";
		}
	}

	function incrementBreak() {
		if(paused) {
			let val = breakTime.innerText;
			val = parseInt(val);
			if(val < 59) { 
				val = val + 1;
			} else {
				val = 1;
			}
			breakTime.innerHTML = val;
		}
	} 

	function decrementBreak() {
		if(paused) {
			let val = breakTime.innerText;
			val = parseInt(val);
			if(val > 1) { 
				val = val - 1;
			} else {
				val = 59;
			}
			breakTime.innerHTML = val;
		}
	}

	function intervalCount(countDownDate) {

		let now = new Date().getTime();

		let distance = countDownDate - now;
		//console.log(1500000 - distance);

		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.round((distance % (1000 * 60)) / 1000);

		if(seconds === 60) {
			seconds = 0;
			minutes = minutes + 1;
		}

		if(seconds < 10) {
			seconds = "0" + seconds.toString();
		}

		// Display the result
		document.getElementById("clock").innerHTML = minutes + ":" + seconds;
		document.title = "Pomodoro: " + minutes + ":" + seconds;

		// If the count down is finished, clear the interval, then alert and switch between break / session
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("clock").innerHTML = "0:00";

			if(isBreak) {
				alert("Break's over! Let's get back to work.");
				isBreak = false;
			} else {
				alert("Don't push yourself too hard! Time for a break.");
				isBreak = true;
			}
			countDown();
		}
	}

});	