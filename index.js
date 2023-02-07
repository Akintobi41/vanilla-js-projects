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
        e.target.removeEventListener('click', runScore)
        score++;
    },
    playerScores = JSON.parse(localStorage.getItem('playerScores')) || [],
    cl_ = ['number', 'name', 'score'],

    updateScores = (score) => {
        let tr = document.createElement('tr'),
            td1 = document.createElement('td')
        td2 = document.createElement('td')
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
                score == 0;
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
