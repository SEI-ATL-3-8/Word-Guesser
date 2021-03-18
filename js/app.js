/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']


/* Variables and App State */
let word = "";

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');
let messages2 = document.querySelector('#messages2');
let letter = document.querySelector('#letter')

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    console.log('The word is:', word);
    displayWordStatus();

    // console.log(res)
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
        letter.id = "box" + i
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
const displayMessage = msg => { 
    msg.preventDefault();
    while(messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }

    // let correctGuesses = 0;

    if (word.includes(textBox.value)){
        messages.append(`the word includes ${textBox.value}`)
        const wordIndex = word.indexOf(textBox.value)
        console.log(wordIndex)
        document.querySelector('#box' + wordIndex).innerText = textBox.value

        if (WORD_LIST[0] === letter || WORD_LIST[1] || WORD_LIST[2] || WORD_LIST[3] || WORD_LIST[4]) {
            console.log('You win!');
        // correctGuesses++
        // for (word.length === correctGuesses) {
            messages.append(`You win!!`)

        }
    } else {
        messages.append(`Sorry ${textBox.value} is the wrong answer`)
    }


    /* Your code here! */

}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);
document.addEventListener('submit', displayMessage);
