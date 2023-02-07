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
