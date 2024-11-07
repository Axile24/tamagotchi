function createCanvas() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.border= 'solid'
    ctx.fillStyle = 'red';  // Default background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

createCanvas(); 
console.log('it is ok ');

let eat = 100;
let sleep = 100;
let boost = 100;
let shower = 100;

// Different decrement rates for each attribute
let eatRate = 0.5;  // Slow decrease for eat
let sleepRate = 1;  // Moderate decrease for sleep
let boostRate = 0.2; // Slow decrease for boost
let showerRate = 1.5; // Faster decrease for shower

function Loop() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let total = eat + sleep + boost + shower;

    // Set background color based on total attribute values
    if (eat <= 0 || sleep <= 0 || boost <= 0 || shower <= 0) {
        ctx.fillStyle = 'red';  
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white'; 
        ctx.fillText('Dying...:)', 50, 100);  // Warning message
    } else if (total > 300) {
        ctx.fillStyle = 'green';  // Healthy state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 200) {
        ctx.fillStyle = 'yellow';  // Medium state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (total > 100) {
        ctx.fillStyle = 'orange';  // Low state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'red';  // Very low state
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Decrease the progress for each attribute at different rates
    eat = Math.max(eat - eatRate, 10);
    sleep = Math.max(sleep - sleepRate, 30);
    boost = Math.max(boost - boostRate, 80);
    shower = Math.max(shower - showerRate, 0);

    // Update progress bar text and width
    document.getElementById('eat').innerHTML = `Eat: ${eat.toFixed(1)}%`;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep.toFixed(1)}%`;
    document.getElementById('boost').innerHTML = `Boost: ${boost.toFixed(1)}%`;
    document.getElementById('shower').innerHTML = `Shower: ${shower.toFixed(1)}%`;
    document.getElementById('eat').style.width = eat + '%';
    document.getElementById('sleep').style.width = sleep + '%';
    document.getElementById('boost').style.width = boost + '%';
    document.getElementById('shower').style.width = shower + '%';

    // Change the progress bar color based on the percentage
    changeProgressBarColor('eat', eat);
    changeProgressBarColor('sleep', sleep);
    changeProgressBarColor('boost', boost);
    changeProgressBarColor('shower', shower);
}

function start() {
    let tid = setInterval(Loop, 500);  // Increase the interval (500ms instead of 100ms)
}

function eatFn() {
    eat = 100;
    document.getElementById('eat').innerHTML = `Eat: ${eat}%`;
    document.getElementById('eat').style.width = eat + '%';
    changeCanvasColor('green');
    changeProgressBarColor('eat', eat); // Change progress bar color
}

function sleepFn() {
    sleep = 100;
    document.getElementById('sleep').innerHTML = `Sleep: ${sleep}%`;
    document.getElementById('sleep').style.width = sleep + '%';
    changeCanvasColor('green');
    changeProgressBarColor('sleep', sleep); // Change progress bar color
}

function showerFn() {
    shower = 100;
    document.getElementById('shower').innerHTML = `Shower: ${shower}%`;
    document.getElementById('shower').style.width = shower + '%';
    if (shower === 100) {
        changeCanvasColor('blue');
    } else if (shower >= 80) {
        changeCanvasColor('green');
    } else if (shower >= 50) {
        changeCanvasColor('yellow');
    } else if (shower >= 10) {
        changeCanvasColor('orange');
    } else {
        changeCanvasColor('red');
    }
    changeProgressBarColor('shower', shower); // Change progress bar color
}

function boostFn() {
    boost = 100;
    document.getElementById('boost').innerHTML = `Boost: ${boost}%`;
    document.getElementById('boost').style.width = boost + '%';
    changeCanvasColor('green');
    changeProgressBarColor('boost', boost); // Change progress bar color
}

function changeCanvasColor(color) {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the entire canvas with the color
}

function changeProgressBarColor(id, value) {
    let progressBar = document.getElementById(id);
    
    // Set color based on the value
    if (value >= 80 && value <=100) {
        progressBar.style.backgroundColor = 'green';  // Blue for high progress
    } else if (value >= 50 && value <=80) {
        progressBar.style.backgroundColor = 'yellow';  // Yellow for medium progress
    } else if (value >= 10 && value <=50) {
        progressBar.style.backgroundColor = 'orange';  // Orange for low progress
    } else {
        progressBar.style.backgroundColor = 'red';
        alert(id +'is under 10%'); 
    
    }
}

start();
