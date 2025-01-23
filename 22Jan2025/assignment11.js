let timer = 10;
let interval = setInterval(() => {
    timer--;
    document.getElementById('timer').innerText = timer;
    if (timer === 0) {
        clearInterval(interval);
        document.getElementById('timer').innerText = "Time's up!";
    }
}, 1000);