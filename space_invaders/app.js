const gridDisplay = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')

let width = 15
let direction = 1
let invadersId
let goingRight = true

let currentPlayerPosition = 202
let removedInvaders = []
let result = 0


for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  gridDisplay.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const invaders = [
0,1,2,3,4,5,6,7,8,9,
15,16,17,18,19,20,21,22,23,24,
30,31,32,33,34,35,36,37,38,39
]

function placeInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    if (!removedInvaders.includes(i)){
      squares[invaders[i]].classList.add('invader')
    }
  }
}

placeInvaders()

function removeInvaders() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.remove('invader')
  }
}

squares[currentPlayerPosition].classList.add('player')

function movePlayer(e) {
  squares[currentPlayerPosition].classList.remove('player')
  switch(e.key) {
    case 'ArrowLeft' :
    if (currentPlayerPosition % width !== 0) currentPlayerPosition -= 1
      break

    case 'ArrowRight' :
    if (currentPlayerPosition % width < width -1) currentPlayerPosition += 1
      break
  }
  squares[currentPlayerPosition].classList.add('player')
}

document.addEventListener('keydown', movePlayer)

function moveInvaders () {
  const leftBorder = invaders[0] % width === 0
  const rightBorder = invaders[invaders.length - 1] % width === width -1
  removeInvaders()
  if (rightBorder && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1
      direction = - 1
      goingRight = false
    }
  }
  if (leftBorder && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction
  }

  placeInvaders()

  if (squares[currentPlayerPosition].classList.contains('invader', 'player')) {
    resultDisplay.textContent = 'You lose !'
    clearInterval(invadersId)
    document.removeEventListener('keydown', shoot)
    document.removeEventListener('keydown', movePlayer)
  }
// Doesnt work if invaders are 3 lines wide
  for (let i = 0; i < invaders.length; i++) {
    if(invaders[i] > squares.length) {
      resultDisplay.textContent = 'You lose !'
      clearInterval(invadersId)
      document.removeEventListener('keydown', shoot)
      document.removeEventListener('keydown', movePlayer)
    }
  }
  if(removedInvaders.length === invaders.length) {
    resultDisplay = 'You win !'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 200)

function shoot(e) {
  let laserId
  let currentLaserPosition = currentPlayerPosition

  function moveLaser() {
    squares[currentLaserPosition].classList.remove('laser')
    currentLaserPosition -= width
    squares[currentLaserPosition].classList.add('laser')

    if (squares[currentLaserPosition].classList.contains('invader')) {
      squares[currentLaserPosition].classList.remove('laser')
      squares[currentLaserPosition].classList.remove('invader')
      squares[currentLaserPosition].classList.add('destroy')

      setTimeout(()=> squares[currentLaserPosition].classList.remove('destroy'), 100)
      clearInterval(laserId)
      const invaderRemove = invaders.indexOf(currentLaserPosition)
      removedInvaders.push(invaderRemove)
      result++
      resultDisplay.textContent = result
    }
    if (currentLaserPosition < 15) {
      squares[currentLaserPosition].classList.remove('laser')
      clearInterval(laserId)
    }
  }
  switch(e.key) {
    case 'ArrowUp':
    laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
