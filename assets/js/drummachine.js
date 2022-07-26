const ac = new AudioContext();
const recorderNode = ac.createGain();
const rec = new Recorder( recorderNode );

// source: http://drum-machine.maryrosecook.com/
const BUTTON_SIZE = 26;
const screen = document.getElementById( 'screen' ).getContext( '2d' );
const green = '#00BA8C';
const orange = '#F15A2B';

const kick = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_bassdrum.wav?1551990664247');
const snare = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_snare.wav?1551990663373');
const snareSide = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_snare_sidestick.wav?1551990663860');
const conga = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_conga.wav?1551990662263');
const congaHigh = new Audio('https://cdn.glitch.com/cc093c8e-9559-4f24-a71e-df60d5b1502c%2FMT52_conga_high.wav?1550690555911');
const highHat = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_hihat.wav?1551990662668');
const openHat = new Audio('https://cdn.glitch.com/17f54245-b142-4cf8-a81b-65e0b36f6b8f%2FMT52_openhat.wav?1551990662961');

const data = {
	step: 0,
	tracks: [createTrack( green, kick ),
	createTrack( green, snare ),
	createTrack( green, snareSide ),
	createTrack( green, conga ),
	createTrack( green, congaHigh ),
	createTrack( green, highHat ),
	createTrack( green, openHat )]
};

let midi = false;
let count = 0;

let interval = setInterval( () => {
	data.step = ( data.step + 1 ) % data.tracks[0].steps.length;

	data.tracks
		.filter( ( track ) => { return track.steps[data.step]; } )
		.forEach( ( track ) => {
			let clone = track.playSound.cloneNode( true );
			let buffer;

			const request = new XMLHttpRequest();
			request.open( 'GET', track.playSound.src, true );
			request.responseType = 'arraybuffer';
			request.onload = () => {
				ac.decodeAudioData( request.response, ( buffer ) => {
					buffer = buffer;

					const gain = ac.createGain();
					const playSound = ac.createBufferSource();
					playSound.buffer = buffer;
					playSound.connect( gain );
					gain.connect( recorderNode );
					gain.connect( ac.destination );
					playSound.start( 0 );

					clone.remove();
				} );
			}

			request.send();
		} );
}, 100 );

function createTrack( color, playSound ) {
	let steps = [];
	for( let i = 0; i < 16; i++ ) {
		steps.push( false );
	}
	return { steps: steps, color: color, playSound: playSound };
};

function buttonPosition( column, row ) {
	return {
		x: BUTTON_SIZE / 2 + column * BUTTON_SIZE * 1.5,
		y: BUTTON_SIZE / 2 + row * BUTTON_SIZE * 1.5
	};
};

function drawButton( screen, column, row, color ) {
	let position = buttonPosition( column, row );
	screen.fillStyle = color;
	screen.fillRect( position.x, position.y, BUTTON_SIZE, BUTTON_SIZE );
};

function drawTracks( screen, data ) {
	data.tracks.forEach( ( track, row ) => {
		track.steps.forEach( ( on, column ) => {
			drawButton( screen, column, row, on ? track.color : 'ghostwhite' );
		} );
	} );
};

function isPointInButton( p, column, row ) {
	let b = buttonPosition( column, row );
	return ! ( p.x < b.x ||
		p.y < b.y ||
		p.x > b.x + BUTTON_SIZE ||
		p.y > b.y + BUTTON_SIZE );
};

function onMIDISuccess( midiAccess, midiOptions ) {
	const inputs = midiAccess.inputs;
	const outputs = midiAccess.outputs;

	for( let input of midiAccess.inputs.values() ) {
		input.onmidimessage = getMIDIMessage;
	}
}

function getMIDIMessage( message ) {
	const command = message.data[0];
	const note = message.data[1];
	const velocity = ( message.data.length > 2 ) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

	switch( command ) {
		case 144: // noteOn
			if( velocity > 0 ) {
				if( count === 16 ) {
					count = 1;
				} else {
					count = count + 1;
				}

				data.step = ( data.step + 1 ) % data.tracks[0].steps.length;

				data.tracks
					.filter( ( track ) => { return track.steps[data.step]; } )
					.forEach( ( track ) => {
						let clone = track.playSound.cloneNode(true);
						let buffer;

						const request = new XMLHttpRequest();
						request.open( 'GET', track.playSound.src, true );
						request.responseType = 'arraybuffer';
						request.onload = () => {
							ac.decodeAudioData( request.response, ( buffer ) => {
								buffer = buffer;

								const gain = ac.createGain();
								const playSound = ac.createBufferSource();
								playSound.buffer = buffer;
								playSound.connect( gain );
								gain.connect( recorderNode );
								gain.connect( ac.destination );
								playSound.start( 0 );

								clone.remove();
							} );
						}

						request.send();
					} );
			}
			break;
		case 128:
			break;
	}
}

function onMIDIFailure() {
	console.log('Could not access your MIDI devices.');
}

// update 
function update() {
	if( midi === false ) {
		location.reload();
	} else {
		navigator.requestMIDIAccess()
			.then( onMIDISuccess, onMIDIFailure );
	}
}
 
( function draw() {
	screen.clearRect( 0, 0, screen.canvas.width, screen.canvas.height );
	drawTracks( screen, data );
	drawButton( screen, data.step, data.tracks.length, orange );
	requestAnimationFrame( draw );
} )(); 

// handle click events on tracks
( function setupButtonClicking() {
	addEventListener( 'click', ( e ) => {
		let p = { x: e.offsetX, y: e.offsetY };
		data.tracks.forEach( ( track, row ) => {
			track.steps.forEach( ( on, column ) => {
				if( isPointInButton( p, column, row ) ) {
					track.steps[column] = ! on;
				}
			} );
		} );
	} );

	document.addEventListener( 'keypress', ( e ) => {
		e = e || window.event;
		if ( e.key === 'c' ) {
			data.tracks.forEach( ( track, row ) => {
				track.steps.forEach( ( on, column ) => {
					track.steps[column] = false;
				} );
			} );
		}
	} );

	// Record button click event
	document.getElementById( 'record' ).addEventListener( 'click', () => {
		rec.record();
		document.getElementById( 'record' ).className = 'hidden';
		document.getElementById( 'stop' ).className = '';
	} );

	document.getElementById( 'stop' ).addEventListener( 'click', () => {
		rec.stop();
		document.getElementById( 'stop' ).className = 'hidden';
		document.getElementById( 'wav' ).className = '';
	} );

	document.getElementById( 'wav' ).addEventListener( 'click', () => {
		rec.exportWAV( ( blob ) => {
			const audio = document.createElement( 'audio' );
			const url = URL.createObjectURL( blob );
			audio.src = url;
			audio.controls = 'true';
			const flex = document.createElement( 'div' );
			flex.className = 'flex-container';
			flex.append( audio );
			document.querySelector( '.recordContainer' ).append( flex );
			document.getElementById( 'wav' ).className = 'hidden';
			document.getElementById( 'record' ).className = '';
		} );
	} );

	document.getElementById( 'midi' ).addEventListener( 'click', () => {
		midi = ! midi;
		clearInterval( interval );
		data.step = 0;
		update();
		if( midi ) {
			document.getElementById( 'midi' ).innerHTML = 'MIDI ON';
		}
	} );

	document.querySelector( '#currentFiles' ).addEventListener( 'submit', ( e ) => {
		e.preventDefault();
		// get all the inputs into an array.
		let $inputs = document.querySelectorAll( '#currentFiles select' );

		// get an associative array of just the values.
		let values = {};
		$inputs.forEach( ( item ) => {
			values[item.name] = item.value;
		} );

		clearInterval( interval );
		data.tracks = [];

		const request = new XMLHttpRequest();
		request.open( 'GET', '/music/directory?directory=' + values.directory );
		request.onload = () => {
			let res = JSON.parse( request.response );
			let tracks = [];
			if( res.files ) {
				for( let i = 0; i < res.files.length; i++ ) {
					let audioSrc = res.directory + res.files[i];
					tracks.push( createTrack( green, new Audio( audioSrc ) ) );
				}
			}

			data.tracks = tracks;
			document.getElementById( 'screen' ).height = data.tracks.length * 48;
		}
		request.send();

		interval = setInterval( () => {
			data.step = ( data.step + 1 ) % data.tracks[0].steps.length;

			data.tracks
				.filter( ( track ) => { return track.steps[data.step]; } )
				.forEach( ( track ) => {
					let clone = track.playSound.cloneNode( true );
					let buffer;

					const request = new XMLHttpRequest();
					request.open( 'GET', track.playSound.src, true );
					request.responseType = 'arraybuffer';
					request.onload = () => {
						ac.decodeAudioData( request.response, ( buffer ) => {
							buffer = buffer;

							const gain = ac.createGain();
							const playSound = ac.createBufferSource();
							playSound.buffer = buffer;
							playSound.connect( gain );
							gain.connect( recorderNode );
							gain.connect( ac.destination );
							playSound.start( 0 );

							clone.remove();
						} );
					}

					request.send();
				} );
		}, 100 );
	} );
} )();