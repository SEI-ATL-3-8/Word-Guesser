/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";
let wordSplit = [];

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
    wordSplit = word.split('')
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
        letter.id = "cell-" + i;
        wordContainer.appendChild(letter);
    }
}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();

    if ( textBox.value.length > 1 ) {
        checkWord(textBox.value)

    } else {
        checkLetter(textBox.value)
    }    
}

const checkWord = (inputWord) => {
    if ( inputWord.toUpperCase() === word.toUpperCase() ) {
        for ( let i = 0; i < word.length; i++ ) {
            let correctLetter = document.getElementById(`cell-${i}`)
            correctLetter.innerText = word[i]
        }
        messages.innerText = `Wow amazing! You guessed ${word} correctly!`

    } else {
        messages.innerText = `Close, but no cigar. Your guess of ${textBox.value} is wrong!`
    }
}

const checkLetter = (inputLetter) => {
    for ( let i = 0; i < word.length; i++ ) {
        if ( inputLetter.toUpperCase() === wordSplit[i].toUpperCase() ) {            
            let correctLetter = document.getElementById(`cell-${i}`)
            correctLetter.innerText = word[i]
        }
    }
    

    if ( word.toUpperCase().includes(inputLetter.toUpperCase()) === true) {
        messages.innerText = `Lucky guess! You got letter ${textBox.value} right!`
    } else {
        messages.innerText = `Sorrie! You got letter ${textBox.value} wrong!`
    }

}



// Display a message to the user in the messagebox
const displayMessage = msg => { 
    alert(msg)
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);

