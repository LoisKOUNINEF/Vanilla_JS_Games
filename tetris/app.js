const gridDisplay = document.getElementById('game-board')
const scoreDisplay = document.querySelector('#score')
const startPause = document.getElementById('start-pause')
const displayNext = document.getElementById('display-next')
const width = 10
const nextWidth = 4
const nextIndex = 0
let nextRandom = 0
let timerId
let score = 0
const colors = [
  'blue',
  'red',
  'darkblue',
  'indianred',
  'green',
  'orange',
  'purple'
]

// drawing game board
for (let i = 0; i < 210; i++) {
  const square = document.createElement('div')
  gridDisplay.appendChild(square)
}

let squares = Array.from(document.querySelectorAll('#game-board div'))

// hidden squares to setup bottom hitbox
for (let i = 200; i < 210; i++) {
  const taken = squares[i].classList.add('taken')
}

// drawing mini board to display incoming tetromino
for (let i = 0; i < 16; i++) {
  const next = document.createElement('div')
  displayNext.appendChild(next)
}

const nextSquares = document.querySelectorAll('#display-next div')

// defining tetrominoes shapes for each rotation
const leftLTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const rightLTetromino = [
  [1, width + 1, width * 2 + 1, 0],
  [width, width + 1, width + 2, width * 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width + 2, width * 2, width * 2 + 1, width * 2 + 2]
]

const leftZTetromino = [
  [0, width, width - 1, width * 2 - 1],
  [width, width - 1, width * 2, width * 2 + 1],
  [0, width, width - 1, width * 2 - 1],
  [width, width - 1, width * 2, width * 2 + 1]
]

const rightZTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
]

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
]

const tetrominoes = [leftLTetromino, rightLTetromino, rightZTetromino, leftZTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0

let random = Math.floor(Math.random()*tetrominoes.length)
let currentTetromino = tetrominoes[random][currentRotation]

function drawTetromino() {
  currentTetromino.map(index => {
    squares[currentPosition + index].classList.add('tetromino')
    squares[currentPosition + index].style.backgroundColor = colors[random]
  })
}

function undrawTetromino() {
  currentTetromino.map(index => {
    squares[currentPosition + index].classList.remove('tetromino')
    squares[currentPosition + index].style.backgroundColor = ''
  })
}

// defining inputs
function controls (e) {
  switch(e.key) {
    case 'ArrowLeft' :
    moveLeft()
    break
    case 'ArrowRight' :
    moveRight()
    break
    case 'ArrowDown' :
    moveDown()
    break
    case 'ArrowUp' :
    rotateRight()
    break
    case 'a' :
    rotateLeft()
    break
    case 'e' :
    rotateRight()
    break
  }
}

function moveDown() {
  undrawTetromino()
  currentPosition += width
  drawTetromino()
  freeze()
}

function moveLeft() {
  undrawTetromino()
  const leftEdge = currentTetromino.some(index => (currentPosition + index) % width === 0)
  if (!leftEdge) currentPosition -= 1
  if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1
  }
  drawTetromino()
}

function moveRight() {
  undrawTetromino()
  const rightEdge = currentTetromino.some(index => (currentPosition + index + 1) % width === 0)
  if (!rightEdge) currentPosition += 1
  if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1
  }
  drawTetromino()
}

function rotateRight() {
  undrawTetromino()
  currentRotation ++
  if (currentRotation === currentTetromino.length) {
    currentRotation = 0
  }
  currentTetromino = tetrominoes[random][currentRotation]
  drawTetromino()
}

function rotateLeft() {
  undrawTetromino()
  currentRotation --
  if (currentRotation < 0) {
    currentRotation = 3
  }
  currentTetromino = tetrominoes[random][currentRotation]
  drawTetromino()
}

function freeze() {
  if (currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    currentTetromino.map(index => squares[currentPosition + index].classList.add('taken'))

    random = nextRandom
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    currentTetromino = tetrominoes[random][currentRotation]
    currentPosition = 4
    drawTetromino()
    fullLine()
    displayNextTetromino()
    gameOver()
  }
}

// array for next tetrominoes
const nextTetromino = [
  [1, nextWidth + 1, nextWidth * 2 + 1, 2],
  [1, nextWidth + 1, nextWidth * 2 + 1, 0],
  [0, nextWidth, nextWidth + 1, nextWidth * 2 + 1],
  [0, nextWidth, nextWidth - 1, nextWidth * 2 - 1],
  [1, nextWidth, nextWidth + 1, nextWidth + 2],
  [0, 1, nextWidth, nextWidth + 1],
  [1, nextWidth + 1, nextWidth * 2 + 1, nextWidth * 3 + 1]
]

function displayNextTetromino() {
  nextSquares.forEach(square => {
    square.classList.remove('tetromino')
    square.style.backgroundColor = ''
  })
  nextTetromino[nextRandom].forEach(index => {
    nextSquares[nextIndex + index].classList.add('tetromino')
    nextSquares[nextIndex + index].style.backgroundColor = colors[nextRandom]
  })
}

function fullLine() {
  for (let i = 0; i < 200; i += width) {
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

    if (row.every(index => squares[index].classList.contains('taken'))) {
      score += 10
      scoreDisplay.textContent = score
      row.forEach( index => {
        squares[index].classList.remove('taken')
        squares[index].classList.remove('tetromino')
        squares[index].style.backgroundColor = ''
      })
      const squaresFilled = squares.splice(i, width)
      squares = squaresFilled.concat(squares)
      squares.forEach(square => gridDisplay.appendChild(square))
    }
  }
}

function gameOver() {
  if (currentTetromino.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.textContent = 'Game Over'
    clearInterval(timerId)
    window.removeEventListener('keyup', controls)
  }
}

document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      window.removeEventListener('keyup', controls)
      startPause.textContent = 'Press Space to Resume game.'
    } else {
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      window.addEventListener('keyup', controls)
      startPause.textContent = 'Press Space to Pause game.'
      displayNextTetromino()
    }
  }
})
