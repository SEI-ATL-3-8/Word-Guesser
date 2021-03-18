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
// 2. Display the word word.length in the DOM
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
    let correct = false;

    if(textBox.value == word)
    {
        // console.log("YAY")
        textBox.value = ""
        correct = true
        displayMessage("You guessed right!")
    }

    for (let i = 0; i < word.length; i++) {
        if (word[i] == textBox.value) {
            correct = true;
            displayMessage("It's a match")
        }
    }

    if (correct) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] == letter) {
                letter.textContent[i] = letter;
            }
        }
    }
    else {
        displayMessage("No match")
    }
}

   
  



// Display a message to the user in the messagebox
const displayMessage = msg => { 
   
messages.textContent = msg
    
    /* Your code here! */
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);