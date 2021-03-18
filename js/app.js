
/* Constants */
const WORD_LIST = ['imperceptible', 'inquisitively', 'convalescing', 'sauntering', 'physiological', 'banishment', 'haphazard', 'enthusiasms']
//console.log(WORD_LIST)
/* Variables and App State */
let word = "";
/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
console.log(textBox)
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
        letter.id = 'box' + i
        letter.classList.add('letter');
        wordContainer.appendChild(letter);
    }
}
//document.querySelector('#box' + i).innerText = res[i]

 //On submit event: Guess a letter or guess the whole word
  const guessLetter = event => {
      event.preventDefault();
      console.log(`You submitted: ${textBox.value}`);
 }

 let correctGuessess = 0
// Display a message to the user in the messagebox
const displayMessage = msg => { 
    msg.preventDefault();
while(messages.firstChild) {
    messages.removeChild(messages.firstChild);
}
    if(word.includes[textBox.value]) {
        messages.append(`the word includes ${textBox.value}`)
        const wordIndex = word.indexOf(textBox.value)
        document.querySelector('#box' + wordIndex).innerText = textBox.value
        correctGuessess++
        if(word.length === correctGuessess){
            messages.append(`You won, good job`)
        } else if (word.length != correctGuessess) {
            
        }

    } else {
        messages.append(`Word does not include${textBox.value}`)
    }
} 

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);
document.addEventListener('submit', displayMessage);