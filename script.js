let position = 0;
let isJumping = false;
let isGameOver = false;
let score = 0;
let scoreUpdateTime = 500;
let cactusUpdateSpeed = 2000;

const dino = document.querySelector('.dino');
const bg = document.querySelector('.background');
const scoreText = document.querySelector('.score');

let handleKeyUp = (event) => {
    if(event.keyCode === 32)
        if(!isJumping)
            jump();
}

let jump = () => {
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

let createCactus = () => {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let rngTime = cactusUpdateSpeed + (Math.random() * 6000);
    cactusUpdateSpeed--;

    if(isGameOver)
        return;

    cactus.classList.add('cactus');
    bg.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftTimer);
            bg.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = `<h2 class="game-over">Fim de jogo - Score: ${score}</h2>`;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setInterval(createCactus, rngTime);
}

let implementScore = async () => {
    await sleep(scoreUpdateTime);
    scoreUpdateTime /= .95;
    score++;
    scoreText.innerHTML = `Score: ${score}`;
    implementScore();
}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

createCactus();
implementScore();
document.addEventListener('keyup', handleKeyUp);
