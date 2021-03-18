/* Constants */
const randomWordsStr = 'gear punch park piano shrink relax ditch last diamond salt unfair musical wave coat arrange comfort physics crouch shark global follow clarify back top undress yearn heaven clash snub passion guitar certain rough answer maid patient swarm coffin rob dream percent scene bleed sweat thirsty jewel queue bay width remark'
const WORD_LIST = randomWordsStr.split(' ')

/* Variables and App State */
let word = "";
let wrongGuesses = 0;

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    console.log('The word is:', word);
    displayWordStatus();
}

// Helper function that adds multiple <div>_</div> to DOM
const displayWordStatus = () => {
    // Clear(empty) all of the divs children 
    while(wordContainer.firstChild) {
        wordContainer.removeChild(wordContainer.firstChild);
    }
    for(let i = 0; i < word.length; i++) {
        let letter = document.createElement('div');
        letter.textContent = '_'
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    const letters = document.querySelectorAll('.letter')
    const guess = textBox.value
    let correctGuess = false
    // 
    // guessing full word?
    if(guess.length > 1) {
        // go handele a full word guess
        handleWordGuess(guess, letters)
    } else { // guessing single letter
        for(let letter of word) {
            let positionArr = []
            let position = word.indexOf(letter)
            while (position !== -1) {
                positionArr.push(position)
                position = word.indexOf(letter, position + 1)
            }
            if(letter === textBox.value) {
                for(let pos of positionArr) {
                    letters[pos].innerHTML = letter
                }
                correctGuess = true
            } else {
                
            }
        }
        displayMessage(guess, correctGuess)
    }
    if(!correctGuess) {
        wrongGuesses++
        handleHangman()
    }
    console.log('wrongGuesses', wrongGuesses)
    textBox.value = ''
}

// Display a message to the user in the messagebox
const displayMessage = (guess, condition) => {
    if (condition) {
        messages.innerHTML = `${guess} was a match!`
    } else {
        messages.innerHTML = `${guess} was not a match. Try again!`
    }
}

const handleWordGuess = (guess, letters) => {
    console.log(' made it here')
    if(guess === word) {
        for(let i = 0; i < word.length; i++) {
            letters[i].innerHTML = guess[i]
        }
    } else {
        messages.innerHTML = 'Nope! Guess again!'
    }
}

function handleHangman() {
    if(wrongGuesses % 2 === 0 && wrongGuesses !== 0) {
        const showPart = document.querySelector(`#part-${wrongGuesses/2}`)
        showPart.classList.remove('hidden')
    }
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);