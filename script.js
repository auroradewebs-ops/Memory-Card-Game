var images = [
    "https://i.pinimg.com/736x/51/8a/e0/518ae0bba82683f84328feda5e19ed72.jpg",
    "https://i.pinimg.com/736x/14/be/84/14be84ae54666539cba018b526ab05c7.jpg",
    "https://i.pinimg.com/736x/8a/65/0f/8a650fe3b8707d601ce86acc4d401d13.jpg",
    "https://i.pinimg.com/1200x/bd/c9/13/bdc913339c88b001283a954eccd6d146.jpg",
    "https://i.pinimg.com/736x/25/bd/1d/25bd1dfc69ac02e0d792ed50e88bec5c.jpg",
    "https://i.pinimg.com/736x/98/a1/86/98a186ef2f11ad224675d00750410b08.jpg",
    "https://i.pinimg.com/736x/49/2d/79/492d793aa4b86d7ca0bd7dcd9afa878e.jpg",
    "https://i.pinimg.com/736x/54/43/e5/5443e50962e85dd28cbb9f5f5fc5af17.jpg",
]

var firstCard = null;
var secondCard = null;
var canFlip = true;
var matches = 0;
var moves = 0;
var seconds = 0;
var timerRunning = false;
var timerInterval;

function startGame() {
    var gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    var cardImages = images.concat(images);
    
    cardImages.sort(function() {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < cardImages.length; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<div class="card-front"><i class="fas fa-heart"></i></div>' +
                        '<div class="card-back"><img src="' + cardImages[i] + '"></div>';
        card.onclick = flipCard;
        card.dataset.image = cardImages[i];
        gameBoard.appendChild(card);
    }
    

    firstCard = null;
    secondCard = null;
    canFlip = true;
    matches = 0;
    moves = 0;
    seconds = 0;
    timerRunning = false;

    updateStats();
    clearInterval(timerInterval);
}

function flipCard() {
    if (!canFlip) return;
    if (this.classList.contains('flipped')) return;
    if (this.classList.contains('matched')) return;


    if (!timerRunning) {
        startTimer();
    }

    this.classList.add('flipped');

    if (firstCard == null) {
        firstCard = this;
    } else {
        secondCard = this;
        canFlip = false;
        moves++;
        updateStats();
        checkMatch();
    }
}

function checkMatch() {
    var match = firstCard.dataset.image == secondCard.dataset.image;
    
    if (match) {
        setTimeout(function() {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            matches++;
            updateStats();
            resetCards();

            if (matches == 8) {
                endGame();
            }
        }, 500);
    } else {
        setTimeout(function() {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(function() {
        seconds++;
        updateStats();
    }, 1000);
}

function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matches + '/8';

    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    if (secs < 10) secs = '0' + secs;
    document.getElementById('time').textContent = mins + ':' + secs;
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
    document.getElementById('winModal').classList.add('show');
}

function newGame() {
    document.getElementById('winModal').classList.remove('show');
    clearInterval(timerInterval);
    startGame();
}

startGame();

















