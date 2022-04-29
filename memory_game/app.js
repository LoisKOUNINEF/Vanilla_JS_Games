// following line allows to call script in the head of the HTML
document.addEventListener('DOMContentLoaded', () => {

// based on 100px square images
const cardArray = [
{
  name: 'alliance',
  img: 'images/alliance.png'
},
{
  name: 'horde',
  img: 'images/horde.png'
},
{
  name: 'hogwarts',
  img: 'images/hogwarts.png'
},
{
  name: 'tupac',
  img: 'images/tupac.png'
},
{
  name: 'biggie',
  img: 'images/biggie.png'
},
{
  name: 'zelda',
  img: 'images/zelda1.png'
},
{
  name: 'alliance',
  img: 'images/alliance.png'
},
{
  name: 'horde',
  img: 'images/horde.png'
},
{
  name: 'hogwarts',
  img: 'images/hogwarts.png'
},
{
  name: 'tupac',
  img: 'images/tupac.png'
},
{
  name: 'biggie',
  img: 'images/biggie.png'
},
{
  name: 'zelda',
  img: 'images/zelda1.png'
}
]

// nice way to shuffle an array randomly
cardArray.sort(() => 0.5 - Math.random())

// const gridDisplay = document.getElementById('grid')
const gridDisplay = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsFound = []

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images/cardback.png')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('img')
  const firstChoice = cardsChosenIds[0]
  const secondChoice = cardsChosenIds[1]

  if (firstChoice == secondChoice) {
    cards[firstChoice].setAttribute('src', 'images/background.png')
    cards[secondChoice].setAttribute('src', 'images/background.png')
    alert('Card already picked !')
  }
  if (cardsChosen[0] == cardsChosen[1]) {
    alert('Cards matches !')
    cards[firstChoice].setAttribute('src', 'images/cardfound.png')
    cards[secondChoice].setAttribute('src', 'images/cardfound.png')
    cards[firstChoice].removeEventListener('click', flipCard)
    cards[secondChoice].removeEventListener('click', flipCard)
    cardsFound.push(cardsChosen)
  } else {
    cards[firstChoice].setAttribute('src', 'images/cardback.png')
    cards[secondChoice].setAttribute('src', 'images/cardback.png')
    alert('Try Again !')
  }

  cardsChosen = []
  cardsChosenIds = []
  resultDisplay.textContent = cardsFound.length

  if (cardsFound.length == cardArray.length/2) {
    resultDisplay.textContent = ('Congrats !')
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  this.setAttribute('src', cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout( checkMatch, 50)
  }
}

createBoard()

})
