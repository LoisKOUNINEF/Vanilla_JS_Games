const gridDisplay = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const playerStart = [230,10]
let playerCurrentPosition = playerStart

const ballStart = [270,40]
let ballCurrentPosition = ballStart

let timerId
let score = 0

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

const blocks = [
new Block(10,270),
new Block(120,270),
new Block(230,270),
new Block(340,270),
new Block(450,270),
new Block(10,240),
new Block(120,240),
new Block(230,240),
new Block(340,240),
new Block(450,240),
new Block(10,210),
new Block(120,210),
new Block(230,210),
new Block(340,210),
new Block(450,210)
]

function addBlocks() {
  for (let i = 0; i < blocks.length; i++){
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    gridDisplay.appendChild(block)
  }
}
addBlocks()

const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
gridDisplay.appendChild(player)

const ball = document.createElement('div')
ball.classList.add('ball')
gridDisplay.appendChild(ball)
drawBall()

function movePlayer(e) {
  switch(e.key) {
    case 'ArrowLeft':
    if (playerCurrentPosition[0] > 0) {
      playerCurrentPosition[0] -= 10
      drawPlayer()
    }
    break
    case 'ArrowRight':
    if (playerCurrentPosition[0] < boardWidth - blockWidth) {
      playerCurrentPosition[0] += 10
      drawPlayer()
    }
    break
  }
}

document.addEventListener('keydown', movePlayer)

function drawPlayer() {
  player.style.left = playerCurrentPosition[0] + 'px'
  player.style.bottom = playerCurrentPosition[1] + 'px'
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkCollisions()
}
timerId = setInterval(moveBall, 20)

function checkCollisions() {
// check for blocks collisions
for (let i = 0; i < blocks.length; i++) {
  if (
    (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
    (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
  {
    const allBlocks = Array.from(document.querySelectorAll('.block'))
    allBlocks[i].classList.remove('block')
    blocks.splice(i, 1)
    changeDirection()
    score++
    scoreDisplay.textContent = score
    if (blocks.length == 0) {
      scoreDisplay.textContent = 'You win !'
      clearInterval(timerId)
      document.removeEventListener('keydown', movePlayer)
    }
  }
}
    // check for wall collisions
    if (
      ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
      ballCurrentPosition[0] <= 0 ||
      ballCurrentPosition[1] >= (boardHeight - ballDiameter))
    {
      changeDirection()
    }
    // check for player bar collision
    if (
      (ballCurrentPosition[0] > playerCurrentPosition[0] && ballCurrentPosition[0] < playerCurrentPosition[0] + blockWidth) &&
      (ballCurrentPosition[1] > playerCurrentPosition[1] && ballCurrentPosition[1] < playerCurrentPosition[1] + blockHeight)
      ){
      changeDirection()
  }
    // check for bottom line collision (Game Over)
    if (ballCurrentPosition[1] <= 0) {
      clearInterval(timerId)
      scoreDisplay.textContent = 'You lose.'
      document.removeEventListener('keydown', movePlayer)
    }
  }


  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
  }
