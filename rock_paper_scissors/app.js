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
    computerChoice = 'Rock'
  }
  if (randomNumber === 1) {
    computerChoice = 'Paper'
  }
  if (randomNumber === 2) {
    computerChoice = 'Scissors'
  }
  if (randomNumber === 3) {
    computerChoice = 'Lizard'
  }
  if (randomNumber === 4) {
    computerChoice = 'Spock'
  }
  computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
  if (computerChoice === userChoice) {
    result = 'Draw !'
  }
  if (computerChoice === 'Paper' && (userChoice === 'Scissors' || userChoice === 'Lizard')) {
    result = 'Win !'
  }
  if (computerChoice === 'Paper' && (userChoice === 'Rock' || userChoice === 'Spock')) {
    result = 'Lose !'
  }
  if (computerChoice === 'Scissors' && (userChoice === 'Paper' || userChoice === 'Lizard')) {
    result = 'Lose !'
  }
  if (computerChoice === 'Scissors' && (userChoice === 'Rock' || userChoice === 'Spock')) {
    result = 'Win !'
  }
  if (computerChoice === 'Rock' && (userChoice === 'Scissors' || userChoice === 'Lizard')) {
    result = 'Lose !'
  }
  if (computerChoice === 'Rock' && (userChoice === 'Paper' || userChoice === 'Spock')) {
    result = 'Win !'
  }
  if (computerChoice === 'Lizard' && (userChoice === 'Rock' || userChoice === 'Scissors')) {
    result = 'Win !'
  }
  if (computerChoice === 'Lizard' && (userChoice === 'Paper' || userChoice === 'Spock')) {
    result = 'Lose !'
  }
  if (computerChoice === 'Spock' && (userChoice === 'Lizard' || userChoice === 'Paper')) {
    result = 'Win !'
  }
  if (computerChoice === 'Spock' && (userChoice === 'Rock' || userChoice === 'Scissors')) {
    result = 'Lose !'
  }

  resultDisplay.innerHTML = result
}
