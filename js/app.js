/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
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
    let underScores = document.querySelectorAll('.letter')
    let indexOfLetter = []
    let letterDivContent = []
    event.preventDefault();
    console.log(`You submitted: ${textBox.value}`);
    while(messages.firstChild) {
        messages.removeChild(messages.firstChild)
    }

    
    
    if(textBox.value === word) {
        for (let i in word) {
            wordContainer.childNodes[i].innerText = word.charAt(i)
        }
    }
    
    for(let i in word) {
        if(word[i] === textBox.value)
        indexOfLetter.push(i)
    }
    
    if(textBox.value === '') {
        displayMessage('You must type a letter into the input box.')
    } else if (word.includes(textBox.value)) {
        displayMessage('There is a', textBox.value)
        for(let element of indexOfLetter) {
            wordContainer.childNodes[element].innerText = textBox.value
        }
        textBox.value = null
    } else {
        displayMessage('There is no', textBox.value)
    }
    
    underScores.forEach(item => {
        letterDivContent.push(item.textContent)
    })

    const solved = letterDivContent.every(item => {
        return item !== '_'
    })

    if(solved) {
        displayMessage('Congrats! you solved the puzzle!')
    }
}

// Display a message to the user in the messagebox
const displayMessage = (msg, letter='') => { 
    let pTag = document.createElement('p')
    pTag.innerText = msg + " " + letter
    messages.append(pTag)
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);