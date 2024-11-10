let tickSound = new Audio('tick.mp3');  // Add sound for ticking (warning)

let eat = parseFloat(localStorage.getItem('eat')) || 100;
let sleep = parseFloat(localStorage.getItem('sleep')) || 100;
let boost = parseFloat(localStorage.getItem('boost')) || 100;
let shower = parseFloat(localStorage.getItem('shower')) || 100;

let eatRate = 0.5;
let sleepRate = 1;
let boostRate = 0.2;
let showerRate = 1.5;

let gameInterval = 0;
let alertShown = { eat: false, sleep: false, boost: false, shower: false };  // Track which progress bars have triggered an alert

let ctx;

// Create canvas with DOM
function createCanvas() {
    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.border = 'solid';
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function Loop() {
    createCanvas();

    let total = eat + sleep + boost + shower;

    // Set background color based on total attribute values
    if (eat <= 0 || sleep <= 0 || boost <= 0 || shower <= 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillText('Dying...:)', 50, 100);
    } else if (total > 300) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 200) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 100) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Decrease the progress for each attribute at different rates
    eat = Math.max(eat - eatRate, 0);
    sleep = Math.max(sleep - sleepRate, 0);
    boost = Math.max(boost - boostRate, 0);
    shower = Math.max(shower - showerRate, 0);

    // Play the ticking sound on each loop
  

    // Update progress bar text and width
    document.getElementById('eat').innerHTML = `Eat: ${eat.toFixed(1)}%`;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep.toFixed(1)}%`;
    document.getElementById('boost').innerHTML = `Boost: ${boost.toFixed(1)}%`;
    document.getElementById('shower').innerHTML = `Shower: ${shower.toFixed(1)}%`;
    document.getElementById('eat').style.width = eat + '%';
    document.getElementById('sleep').style.width = sleep + '%';
    document.getElementById('boost').style.width = boost + '%';
    document.getElementById('shower').style.width = shower + '%';

    // Save updated values to local storage
    localStorage.setItem('eat', eat);
    localStorage.setItem('sleep', sleep);
    localStorage.setItem('boost', boost);
    localStorage.setItem('shower', shower);

    // Change progress bar colors based on value
    changeProgressBarColor('eat', eat);
    changeProgressBarColor('sleep', sleep);
    changeProgressBarColor('boost', boost);
    changeProgressBarColor('shower', shower);
}

function startGame() {
    if (!gameInterval) {  // Start the game if it's not already running
        gameInterval = setInterval(Loop, 1000);
    }
}

function stopGame() {
    if (gameInterval) {  // Stop the game if it's running
        clearInterval(gameInterval);
        gameInterval = null;
        tickSound.pause;
        tickSound.currentTime = 100; // Reset the audio to the beginning

    }
}

function eatFn() {
    eat = 100;
    document.getElementById('eat').innerHTML = `Eat: ${eat}%`;
    document.getElementById('eat').style.width = eat + '%';
}

function sleepFn() {
    sleep = 100;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep}%`;
    document.getElementById('sleep').style.width = sleep + '%';
}

function showerFn() {
    shower = 100;
    document.getElementById('shower').innerHTML = `Shower: ${shower}%`;
    document.getElementById('shower').style.width = shower + '%';
}

function boostFn() {
    boost = 100;
    document.getElementById('boost').innerHTML = `Boost: ${boost}%`;
    document.getElementById('boost').style.width = boost + '%';
}

// Progress bar changes color and alerts when below 10%
function changeProgressBarColor(id, value) {
    let progressBar = document.getElementById(id);

    if (value >= 80) {
        progressBar.style.backgroundColor = 'green';
    } else if (value >= 50) {
        progressBar.style.backgroundColor = 'yellow';
    } else if (value >= 10) {
        progressBar.style.backgroundColor = 'orange';

    } else {
        progressBar.style.backgroundColor = 'red';
        if (!alertShown[id]) {
            alert(id + ' is under 10%!');
            tickSound.play();//spela ljudet
            alertShown[id] = true;  // Prevent multiple alerts for the same progress bar
        }
    }
}

createCanvas();
console.log('Game initialized.');
