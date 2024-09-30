const startButton = document.getElementById('start');
const game = document.getElementById('game');
const timeHeader = document.getElementById('time-header');
const resultHeader = document.getElementById('result-header');
const resultSpan = document.getElementById('result');
const timeSpan = document.getElementById('time');
const gameTimeInput = document.getElementById('game-time');

let score = 0;
let isGameStarted = false;

// Функция для начала игры
startButton.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTimeInput.addEventListener('input', setGameTime);

function startGame() {
    score = 0;
    setGameTime();
    gameTimeInput.setAttribute('disabled', 'true');
    isGameStarted = true;
    game.style.backgroundColor = '#fff';
    startButton.classList.add('hide');

    const interval = setInterval(function () {
        const time = parseFloat(timeSpan.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            timeSpan.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function setGameTime() {
    const time = +gameTimeInput.value;
    timeSpan.textContent = time.toFixed(1);
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');
}

function endGame() {
    isGameStarted = false;
    setGameScore();
    gameTimeInput.removeAttribute('disabled');
    startButton.classList.remove('hide');
    game.innerHTML = '';
    game.style.backgroundColor = '#ccc';
    timeHeader.classList.add('hide');
    resultHeader.classList.remove('hide');
}

function setGameScore() {
    resultSpan.textContent = score;
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

// Функция для создания и отображения квадрата
function renderBox() {
    game.innerHTML = '';
    const box = document.createElement('div');
    const boxSize = getRandom(30, 100);
    const gameSize = game.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = `${boxSize}px`;
    box.style.position = 'absolute';
    box.style.backgroundColor = getRandomColor();
    box.style.top = `${getRandom(0, maxTop)}px`;
    box.style.left = `${getRandom(0, maxLeft)}px`;
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    game.append(box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
}
