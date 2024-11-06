function createCanvas() {
    let canvas = document.getElementById('canvas'); // Get canvas element
    let ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;
    ctx.fillStyle = 'red';  // Default background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Draw a red square on the canvas
}

createCanvas(); 
console.log('it is ok');

let eat = 100;
let sleep = 100;
let boost = 100;
let shower = 100;

function Loop(time = 2) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let total = eat + sleep + boost + shower;
    
    // Set background color based on the total value of all attributes
    if (eat <= 0 || sleep <= 0 || boost <= 0 || shower <= 0) {
        ctx.fillStyle = 'red';  // Set background color to red
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';  // Reset fill color for further drawing
        ctx.font = '30px Arial';
        ctx.fillText('Check what is it.....', 50, 100);  // Warning message
    } else if (total > 400) {
        ctx.fillStyle = 'green';  // Healthy state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 200) {
        ctx.fillStyle = 'yellow';  // Medium state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 50) {
        ctx.fillStyle = 'orange';  // Low state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 10) {
        ctx.fillStyle = 'red';  // Very low state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Decrease attribute values over time and ensure they don't go below 0
    eat = Math.max(eat - time, 0);
    sleep = Math.max(sleep - time, 0);
    boost = Math.max(boost - time, 0);
    shower = Math.max(shower - time, 0);

    // Update the progress bar text and width
    document.getElementById('eat').innerHTML = `Eat: ${eat}%`;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep}%`;
    document.getElementById('boost').innerHTML = `Boost: ${boost}%`;
    document.getElementById('shower').innerHTML = `Shower: ${shower}%`;
}

function start() {
    let tid = setInterval(Loop, 100);
}

function eatFn() {
    eat = 100;
    document.getElementById('eat').innerHTML = `Eat: ${eat}%`;
    document.getElementById('eat').style.width = eat + '%';  // Use percentage for progress bar
    changeCanvasColor('green');  // Change canvas color to green when eat is 100%
}

function sleepFn() {
    sleep = 100;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep}%`;
    document.getElementById('sleep').style.width = sleep + '%';  // Use percentage for progress bar
    changeCanvasColor('green');  // Change canvas color to green when sleep is 100%
}

function showerFn() {
    shower = 100;  // Reset shower to 100
    if (shower >= 80) {
        changeCanvasColor('green');  // Change canvas color to green when shower reaches 80 or more
    } else if (shower >= 50) {
        changeCanvasColor('yellow');  // Change canvas color to yellow when shower is between 50 and 79
    } else if (shower >= 10) {
        changeCanvasColor('orange');  // Change canvas color to orange when shower is between 10 and 49
    } else {
        changeCanvasColor('red');  // Change canvas color to red when shower is less than 10
    }

    // Update progress bar and text
    document.getElementById('shower').innerHTML = `Shower: ${shower}%`;
    document.getElementById('shower').style.width = shower + '%';  // Set progress bar width in percentage
}

function boostFn() {
    boost = 100;
    document.getElementById('boost').innerHTML = `Boost: ${boost}%`;
    document.getElementById('boost').style.width = boost + '%';  // Use percentage for progress bar
    changeCanvasColor('green');  // Change canvas color to green when boost is 100%
}

function changeCanvasColor(color) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the entire canvas with the color
}

start();
