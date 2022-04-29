const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')

let userChoice
let computerChoice

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id
  userChoiceDisplay.innerHTML = userChoice
  generateComputerChoice()
  getResult()
  resultDisplay.innerHTML = result
}))

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length + 1)
  if (randomNumber === 0) {
    computerChoice = 'rock'
  }
  if (randomNumber === 1) {
    computerChoice = 'paper'
  }
  if (randomNumber === 2) {
    computerChoice = 'scissors'
  }
  computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'Draw !'
  }
  if (computerChoice === 'paper' && userChoice === 'scissors') {
    result = 'Win !'
  }
  if (computerChoice === 'paper' && userChoice === 'rock') {
    result = 'Lose !'
  }
  if (computerChoice === 'scissors' && userChoice === 'paper') {
    result = 'Lose !'
  }
  if (computerChoice === 'scissors' && userChoice === 'rock') {
    result = 'Win !'
  }
  if (computerChoice === 'rock' && userChoice === 'scissors') {
    result = 'Lose !'
  }
  if (computerChoice === 'rock' && userChoice === 'paper') {
    result = 'Win !'
  }
  resultDisplay.innerHTML = result
}
