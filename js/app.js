/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";
let letters = [];
let gameIsWon = false;

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
    const strings = new Array(word.length).fill('_');
    displayWordStatus(strings);
}

// Helper function that adds multiple <div>_</div> to DOM
const displayWordStatus = (wordArr) => {
    clearWordStatus();
    for (let i = 0; i < wordArr.length; i++) {
        const letter = document.createElement('div');
        letter.textContent = wordArr[i]
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    console.log(`You submitted: ${textBox.value}`);
    if (!letters.includes(textBox.value)) {
        letters.push(textBox.value);
    }
    if (word.includes(textBox.value)) {
        displayMessage(`${textBox.value} is a match!`);
    }
    else {
        displayMessage(`${textBox.value} is not a match.`);
    }
    textBox.value = "";
    gameStatus();

}

const clearWordStatus = () => {
    // Clear(empty) all of the divs children 
    while (wordContainer.firstChild) {
        wordContainer.removeChild(wordContainer.firstChild);
    }
}

const gameStatus = () => {
    const splitedWord = word.split("");
    let wordStatus = [];
    splitedWord.map(letter => {
        if (letters.includes(letter)) {
            wordStatus.push(letter);
        } else {
            wordStatus.push("_");
        }
    });
    displayWordStatus(wordStatus);

    if (!wordStatus.includes("_")) {
        displayMessage("Congrats, you've guessed the whole word!")
    }
}

// Display a message to the user in the messagebox
const displayMessage = msg => {
    /* Your code here! */
    messages.innerHTML = msg;
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);