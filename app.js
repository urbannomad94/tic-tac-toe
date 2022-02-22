//Grabbing elements from HTML
const tiles = document.querySelectorAll('.tile');
const gameOverDisplay = document.querySelector('.game-over-display');
const winner = document.querySelector('#winner');
const restartBtn = document.querySelector('.restart');

//Player factory function
const playerFactory = (name, marker) => {
    return {name, marker}
}
const playerX = playerFactory('playerX', 'X');
const playerO = playerFactory('playerO', 'O');

let turn = playerX;

//Creating array to represent board
const boardState = Array(tiles.length);
boardState.fill(null);

//Adding event listeners to each tile
const populateTile = (e) => {
    //Can't click boxes is game over display is present
    if (gameOverDisplay.classList.contains('.visible')) {
        return;
    }
    
    const activeTile = e.target;
    const tileIndex = activeTile.dataset.index;
    //Can't click boxes if they already contain a marker
    if (activeTile.innerText != '') {
        return;
    }

    if (turn === playerX) {
        activeTile.innerText = playerX.marker;
        boardState[tileIndex - 1] = playerX.marker;
    }

    else {
        activeTile.innerText = playerO.marker;
        boardState[tileIndex - 1] = playerO.marker;
    }

    //Checks for winner and draw every click
    if (checkWinner(turn)) {
        winner.innerText = `Player ${turn.marker} is the winner!`;
        gameOverDisplay.classList.remove('hidden');
        gameOverDisplay.classList.add('visible')
    }

    if (checkTie()) {
        winner.innerText = `It's a tie!`;
        gameOverDisplay.classList.remove('hidden');
        gameOverDisplay.classList.add('visible')
    }

    switchPlayer();
}

tiles.forEach(tile => {
    tile.addEventListener('click', populateTile)
});

//All of the configurations in which a player can win
winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const checkWinner = (turn) => {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return (tiles[index].innerText == turn.marker);
        })
    })
}

const checkTie = () => {
    for (i = 0; i < boardState.length; i++) {
        if (boardState[i] == null) {
            return false;
        }
    }
    return true;
}


const switchPlayer = () => {
    if (turn == playerX) {
        turn = playerO;
    }
    else {
        turn = playerX;
    }
}

restartBtn.addEventListener('click', reset, false);

function reset() {
    location.reload();
}