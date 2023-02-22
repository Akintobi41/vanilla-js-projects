const continueGameBtn = document.getElementById("continue-game-button"),
    difficultySelect = document.getElementById("difficulty-select"),
    mainBody = document.querySelector('body'),
    loader = document.querySelector('.loader'),
    body = [...document.querySelector('body').children],
    difficultySection = document.querySelector('#difficulty-section');

// Remove last two elements from body array
body.splice(-2, 2);
// Remove first element from body array
body.splice(0, 2);

body.forEach((item) => item.style.display = 'none')
// Hide Difficulty section
difficultySection.style.display = 'none';
// Body styles reset
mainBody.style.minHeight = '100vh'
mainBody.style.display = 'flex'
mainBody.style.justifyContent = 'center'
mainBody.style.alignItems = 'center';

//PreLoader
setTimeout(() => {
    loader.style.display = 'none'
    mainBody.style.display = 'flex'
    difficultySection.style.display = '';
}, 3000);

setTimeout(() => {
    difficultySection.classList.add("show");
}, 3050);

const gameMode = () => {
    difficultySection.style.display = 'none'
    mainBody.style.display = 'block'
    body.forEach((item) => item.style.display = '')
}
continueGameBtn.addEventListener('click', gameMode)

const getEl = ((el) => document.querySelector(el)),
    main = getEl('body'),
    timeText = getEl('h3'),
    startBtn = getEl('.start-button'),
    scoreText = getEl('strong'),
    highScores = getEl('.high-scores'),
    closeModal = getEl('.close-modal'),
    showModal = getEl('.show-scores'),
    gameMenu = getEl('.game-menu'),
    noScore = getEl('.no-score'),
    container = getEl('.container'),
    closeModalBtns = getEl('.close-modal-section'),
    table = getEl('tbody'),
    playAgain = getEl('.play-again-button'),
    closeScore = getEl('.close-button'),
    moleImg = document.querySelectorAll('.mole-img');

let index = JSON.parse(localStorage.getItem('index')) || 0;

let score = 0,
    newTime = 60,
    minValue = 1,
    rndmNum,
    previousRandomNumber,
    playerName;

const addZero = ((x) => (x < 10) ? `0${String(x)}` : String(x)),
    runScore = (e) => {
        score++;
        e.target.removeEventListener('click', runScore)
    },
    playerScores = JSON.parse(localStorage.getItem('playerScores')) || [],
    cl_ = ['number', 'name', 'score'],

    updateScores = (score) => {
        let tr = document.createElement('tr'),
            td1 = document.createElement('td'),
            td2 = document.createElement('td'),
            td3 = document.createElement('td')

        td1.textContent = addZero(score.number)
        td2.textContent = score.name
        td3.textContent = score.score * 10

        td1.classList.add(cl_[0])
        td2.classList.add(cl_[1])
        td3.classList.add(cl_[2])

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
    }

const restoreStyles = () => {
    showModal.style.display = 'none';
    closeModalBtns.style.display = 'none';
    timeText.style.visibility = 'visible';
    gameMenu.style.visibility = 'visible';
    container.style.visibility = 'visible'
}

// Event Listener 
const addEvent = (el, eventType, functionName) => el.addEventListener(eventType, functionName),
    removeEvent = (el, eventType, functionName) => el.removeEventListener(eventType, functionName),

    //Toggle classlist
    addClass = (el, className) => el.classList.add(className),
    removeClass = (el, className) => el.classList.remove(className),

    getName = () => {
        playerName = prompt('Player name:')
        while (!playerName || !playerName.length || playerName.startsWith(' ')) {
            playerName = prompt('Player name:')
        }
    },
    changeDefault = () => {
        table.innerHTML = ''
        restoreStyles();
        getName();
        removeEvent(startBtn, 'click', runTime);
        addClass(highScores, 'no-high-score')
    },
    restoreDefault = () => {
        removeClass(highScores, 'no-high-score')
        minValue = 1
        newTime = 60
        timeText.textContent = `01:00`
        addEvent(startBtn, 'click', runTime)  // Start Game
    },
    updateLocalStorage = (key, value) => {
        return localStorage.setItem(key, JSON.stringify(value))
    },
    resetInterval = (popUpTIme, timer) => {
        clearInterval(popUpTIme)
        clearInterval(timer)
    },
    appendToArray = () => {
        playerScores.push({ 'number': index, 'name': playerName, 'score': score });
        index++;
    },
    runTime = (e) => {
        changeDefault();
        let timer = setInterval(() => {
            if (!newTime) {
                restoreDefault();
                resetInterval(popUp, timer)
                appendToArray();
                updateLocalStorage('index', index)
                updateLocalStorage('playerScores', playerScores)
                alert(`Your final score is :${score}`)
                score = 0;
                return scoreText.textContent = '0';
            }
            newTime--;
            minValue = 0;
            rndmNum = (() => uniqueRandomValue(moleImg));

            timeText.textContent = `0${minValue}:${addZero(newTime)}`;
            scoreText.textContent = score;
        }, 1000);
        toggleInterval();
    }

addEvent(startBtn, 'click', runTime);  // Start Game

// Stop random number from repeating itself
const uniqueRandomValue = (range) => {
    let currentRandomNumber = Math.floor(Math.random() * range.length)
    while (currentRandomNumber === previousRandomNumber) {
        currentRandomNumber = Math.floor(Math.random() * range.length)
    }
    previousRandomNumber = currentRandomNumber
    return currentRandomNumber
}

// Animation duration based on difficulty
const difficulty = {
    easy: [1600, 1300],
    medium: [1500, 1200],
    hard: [1400, 1100]
};


switch (difficultySelect.value) {
    case 'easy':
        [time1, time2] = difficulty.easy;
        range = 1.3;
        break;
    case 'medium':
        [time1, time2] = difficulty.medium;
        range = 1.2;
        break;
    default:
        [time1, time2] = difficulty.hard;
        range = 1.2;
        break;
}

let newNo,
    showImg = () => {
        newNo = rndmNum();   // Save random number to a variable 
        moleImg[newNo].classList.add('animation')
        moleImg[newNo].style.animation = `elevate ${range}s ease-in-out`
    },
    hideImg = () => {
        moleImg[newNo].classList.remove('animation')
        moleImg[newNo].style.animation = ''
    },
    toggleInterval = () => {
        popUp = setInterval(function () {
            showImg();
            setTimeout(hideImg, time2)
            moleImg.forEach((mole) => {
                mole.addEventListener('click', runScore, { once: true })
            });
        }, time1)
    }

const showHighScores = (e) => {
    e.preventDefault();
    [...playerScores]
        .sort((first, second) => (first.score < second.score) ? 1 : -1)
        .filter((_, index) => index <= 4)
        .forEach((item, index) => {
            item.number = index + 1;
            updateScores(item);
        });
    scoreStyles();
}

const closeScores = (e) => {
    e.preventDefault();
    table.innerHTML = '';

    showModal.style.display = 'none';
    closeModalBtns.style.display = 'none';
    timeText.style.visibility = 'visible';
    gameMenu.style.visibility = 'visible';
    container.style.visibility = 'visible';
    highScores.classList.remove('no-high-score')
}
const currentEvents = () => {
    highScores.addEventListener('click', showHighScores)
    playAgain.addEventListener('click', runTime)
    closeScore.addEventListener('click', closeScores)
}

const scoreStyles = () => {
    showModal.style.display = 'block';
    closeModalBtns.style.display = 'flex';
    highScores.classList.add('no-high-score')
    timeText.style.visibility = 'hidden';
    gameMenu.style.visibility = 'hidden';
    container.style.visibility = 'hidden'
    return (!playerScores.length) ? noScore.textContent = 'no mole crushers yet!' : noScore.textContent = ''
}
currentEvents();

