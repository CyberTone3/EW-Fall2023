// Here I created a constant variable for the 'x' and the 'o' characters.//
// The table under contains the winning combinations to the game and it will help determine when the game has been won.//
const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Here I am using the id tags used in the HTML file to save the values of all of the board elements, winning message and the restart button.//
//THIS IS IMPORTANT: The way I pulled the id from the HTML file is the getElementById() method. *For the winning message text element, I used the querySelector().//
//The querySelector() returns the first element within the document that matches the specified selector.//
// I targetted the data-cell attribute with the squared brackets.//
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false
// let isPlayer_O_Turn = false is used to start the game off with x's.//

//the function removes all the characters left from previous gameplay. Here we also trigger the events which may happen on our board, which are the mouse clicks.//
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    isPlayer_O_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once: true })
        
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//The handleClick handles the mouse click events on the board.//
//The currentClass variable saves the X or O character (whose turn it is).//
//Another function is used, in the if statement, to check if someone has already won(by comparing the winning combinations to teh gameplay).//
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
    } else {
        winningMessageTextElement.innerText - `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

//This isDraw() function simply returns the value, in case there is a draw.//
//There is also a hidden method, within the isDraw function, called every.//
//The 'every' method checks all elements of an array- to confirm a condition by returning a boolean value.//
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
}

//Here are two simple functions: one to place the mark in the cell and the other to alternate turns, after a character is placed.

// Obviously, the placeMark() function places the character in the cell.
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

//The swapTurns function alternates the characters after each turn.
function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn
}

//In this part of the code I am setting the cursor hovering effect onto the board.
//Since we want a character to appear in the cells while hovering over them with our mouse cursor before placing them, the setBoardHoverClass() function takes care of the interactive part of that.
function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_O_CLASS)
    if (isPlayer_O_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS)
    } else {
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}

//The function checkWin() which is called to check if our board matches any of the winning combinations.
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}