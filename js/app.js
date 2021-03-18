/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";

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
    console.log(`You submitted: ${textBox.value}`);
}

// Display a message to the user in the messagebox
let initLength = 0
let leftovers = word.length
let answerArray = []

if (word.length === initLength) {
    messages.innerText = "Please enter a letter!"
} else {
    messages.innerText = "No"
}

for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_"
}

while (leftovers > 0) {
    alert(answerArray.join(" "))

    let playerGuess = prompt("Guess a letter...")
    if (playerGuess.length !== 1) {
        alert("only 1 letter please")
    } else {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === playerGuess) {
                answerArray[i] = playerGuess
                leftovers--
                messages.innerText(`'${textBox}' is included!`)
                console.log(answerArray)
            } else {
                messages.innerText(`'${textBox}' is an incorrect letter.`)
                console.log(answerArray)
            }
        }
    }
}








/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);