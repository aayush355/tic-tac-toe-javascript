const cellElements = document.querySelectorAll('[data-cell]');
const winningMesaageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const turnMessage = document.getElementById('turnMessage')
const WIN_COMBINATION = [
    ['cell1', 'cell2', 'cell3'], ['cell4', 'cell5', 'cell6'], ['cell7', 'cell8', 'cell9'],
    ['cell1', 'cell4', 'cell7'], ['cell2', 'cell5', 'cell8'], ['cell3', 'cell6', 'cell9'],
    ['cell1', 'cell5', 'cell9'], ['cell3', 'cell5', 'cell7']
]
let xTurn;
let xcombination = []
let ocombination = []

startGame()

restartButton.addEventListener('click', restart)

function restart() {
    location.reload()
}

function startGame() {
    xTurn = true
    turnMessage.innerHTML = "X's Turn"
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once : true })
    })  
}

function handleClick(e) {
    var cell = e.target
    var cellId = cell.id
    if (xTurn) {
        var xImg = document.createElement("img")
        xImg.setAttribute("src", "https://icon2.cleanpng.com/20180501/wke/kisspng-tic-tac-toe-oxo-holiday-tic-tac-toe-game-blue-cross-5ae92d39a25973.266227491525230905665.jpg")
        xImg.setAttribute("height", "100px")
        xImg.setAttribute("width", "100px")
        xImg.className = "x"
        document.getElementById(cellId).append(xImg)
        cell.classList.add('x')
        xcombination.push(cellId)
    } else {
        var oImg = document.createElement("img")
        oImg.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmGYJfOpajM_uJS0AB_jRojRcXZdl59afXtA&usqp=CAU")
        oImg.setAttribute("height", "100px")
        oImg.setAttribute("width", "100px")
        oImg.className = 'o'
        document.getElementById(cellId).append(oImg)
        cell.classList.add('o')
        ocombination.push(cellId)
    }
    if (checkWin(xcombination) || checkWin(ocombination)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
    }
}

function swapTurns() {
    xTurn = !xTurn;  
    turnMessage.innerHTML = xTurn ? "X's Turn" : "O's Turn"
}

function checkWin(combination) {
    let temp = []
    for (var i = 0; i < WIN_COMBINATION.length; i++) {
        var arr = WIN_COMBINATION[i]
        temp = combination.filter(function(val) {
            return arr.indexOf(val) != -1
        })
        if (combinationCheck(arr, temp)) {
            return true
        }
    }
    return false
}

function combinationCheck(arr, temp) {
    let count = 3
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < temp.length; j++) {
            if (arr[i] === temp[j]) {
                count--
            }
        }
    }
    if (count === 0) {
        return true
    } else {
        return false
    }
}

function endGame(draw) {
    if (draw) {
        winningMesaageTextElement.innerHTML = 'Draw!!!'
    } else {
        winningMesaageTextElement.innerHTML = `${xTurn ? "X's" : "O's"} Wins!!!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}






