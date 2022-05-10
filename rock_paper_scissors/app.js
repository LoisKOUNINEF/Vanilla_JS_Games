const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')

let userChoice
let computerChoice

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id
  userChoiceDisplay.textContent = userChoice
  generateComputerChoice()
  getResult()
  resultDisplay.textContent = result
}))

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length + 1)
  switch (randomNumber) {
    case 0: computerChoice = 'Rock';
    break;
    case 1: computerChoice = 'Paper';
    break;
    case 2: computerChoice = 'Scissors';
    break;
    case 3: computerChoice = 'Lizard';
    break;
    case 4: computerChoice = 'Spock';
    break;
  }
  computerChoiceDisplay.textContent = computerChoice
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

  resultDisplay.textContent = result
}
