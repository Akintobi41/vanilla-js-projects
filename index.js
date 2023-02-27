const getEl = ((el) => document.querySelector(el));
// Event Listener 
const addEvent = (el, eventType, functionName) => el.addEventListener(eventType, functionName),
    removeEvent = (el, eventType, functionName) => el.removeEventListener(eventType, functionName),
    //Toggle classlist
    addClass = (el, className) => el.classList.add(className),
    removeClass = (el, className) => el.classList.remove(className),
    continueGameBtn = getEl("#continue-game-button"),
    difficultySelect = getEl("#difficulty-select"),
    mainBody = getEl('body'),
    loader = getEl('.loader'),
    body = [...getEl('body').children],
    difficultySection = getEl('#difficulty-section'),
    toggleDisplay = (el, displayValue) => {
        el.style.display = displayValue
    }
// remove elements that are not needed initially and hide remaining elements
body.splice(-2, 2);
body.splice(0, 2);
body.forEach((item) => toggleDisplay(item, 'none'))
// Hide Difficulty section
toggleDisplay(difficultySection, 'none');
// Body styles reset
toggleDisplay(mainBody, 'flex');
mainBody.style.minHeight = '100vh'
mainBody.style.justifyContent = 'center'
mainBody.style.alignItems = 'center';
//PreLoader
setTimeout(() => {
    toggleDisplay(loader, 'none')
    toggleDisplay(mainBody, 'flex')
    toggleDisplay(difficultySection, '')
}, 3000),
    setTimeout(() => {
        addClass(difficultySection, 'show')
    }, 3050);

const gameMode = () => {
    toggleDisplay(difficultySection, 'none')
    toggleDisplay(mainBody, 'block')
    body.forEach((item) => toggleDisplay(item, ''))
}

addEvent(continueGameBtn, 'click', gameMode);

const main = getEl('body'),
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
        removeEvent(e.target, 'click', runScore)
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

        addClass(td1, cl_[0])
        addClass(td2, cl_[1])
        addClass(td3, cl_[2])
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
    }

const restoreStyles = () => {
    toggleDisplay(showModal, 'none');
    toggleDisplay(closeModalBtns, 'none');
    [container, gameMenu, timeText].forEach((element) => element.style.visibility = 'visible')
},

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
    updateLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value)),
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
        addClass(moleImg[newNo], 'animation')
        moleImg[newNo].style.animation = `elevate ${range}s ease-in-out`
    },
    hideImg = () => {
        removeClass(moleImg[newNo], 'animation')
        moleImg[newNo].style.animation = ''
    },
    toggleInterval = () => {
        popUp = setInterval(function () {
            showImg();
            setTimeout(hideImg, time2);
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
},
    closeScores = (e) => {
        e.preventDefault();
        table.innerHTML = '';

        toggleDisplay(showModal, 'none');
        toggleDisplay(closeModalBtns, 'none');
        [container, gameMenu, timeText].forEach((element) => element.style.visibility = 'visible')
        removeClass(highScores, 'no-high-score')
    },
    currentEvents = () => {
        addEvent(highScores, 'click', showHighScores)
        addEvent(playAgain, 'click', runTime)
        addEvent(closeScore, 'click', closeScores)
    },
    scoreStyles = () => {
        toggleDisplay(showModal, 'block')
        toggleDisplay(closeModalBtns, 'flex');
        addClass(highScores, 'no-high-score');
        [container, gameMenu, timeText].forEach((element) => element.style.visibility = 'hidden')
        return (!playerScores.length) ? noScore.textContent = 'no mole crushers yet!' : noScore.textContent = ''
    }
currentEvents();

