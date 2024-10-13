// Global Variables
let cells;
const board = document.getElementById('board');
const newGameButton = document.getElementById('newGameButton');
const messageElement = document.getElementById('message');
const turnIndicator = document.getElementById('turnIndicator');
const themeButton = document.getElementById('themeButton');
let isXTurn = true;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game initially
startGame();

// Event Listeners
newGameButton.addEventListener('click', startGame);
themeButton.addEventListener('click', toggleTheme);

// Function to Start the Game
function startGame() {
    // Dynamically selecting cells again to make sure we get the latest references
    cells = document.querySelectorAll('[data-cell]');
    isXTurn = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setMessage('');
    setTurnIndicator();
}

// Handle Cell Click
function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setTurnIndicator();
    }
}

// Place Mark (X or O) in the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

// Swap Turns between X and O
function swapTurns() {
    isXTurn = !isXTurn;
}

// Check for a win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for a draw (all cells filled with no winner)
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

// End the game (either by win or draw)
function endGame(draw) {
    if (draw) {
        setMessage('Draw!');
    } else {
        setMessage(`${isXTurn ? "X's" : "O's"} Wins!`);
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

// Set the message display
function setMessage(message) {
    messageElement.textContent = message;
}

// Set turn indicator display
function setTurnIndicator() {
    turnIndicator.textContent = `${isXTurn ? "X's" : "O's"} Turn`;
}

// Toggle between light and dark theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}
