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


let correctGuesses = 0

// Display a message to the user in the messagebox
const displayMessage = msg => {
    msg.preventDefault();
    while(messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }
    if (word.includes(textBox.value)) {
        if (word.length === correctGuesses) {
            messages.append("Nice!!!!");
            else if (word.length) != correctGuesses {
                const wordIndex = word.indexOf(textBox.value)
                console.log(wordIndex)
                document.querySelector('#box' + wordIndex).innerText = textBox.value
                correctGuesses++
                messages.append(`the word includes ${textBox.value}`)

            }

        } else{
            messages.append("NOPE!!");
        }

        // letterSpace = document.querySelector('.guess-word')
        // letter.id = textBox.value
        // wordContainer.value[wordIndex] = textBox.value

        ///////
        // letter = document.createElement('div');
        // letter.textContent.remove = '_'
        // letter = document.getElementsByClassName('letter');
        // letter.textContent.append = letter.value
        // letter.classList.add("letter").innerText;
        // letter.textContent=document.querySelector('#letter-').word[i].innerText
        // wordContainer.appendChild(letter);
        ////////
    } else {
        messages.append(`the word does not includes ${textBox.value}`)
    }
}
    /* Your code here! */


/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);
document.addEventListener('submit', displayMessage);
