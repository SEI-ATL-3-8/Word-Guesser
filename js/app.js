/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather','america','africa','europe']

/* Variables and App State */
let word = "";
let currentWord = [];

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
    //console.log('The word is:', word);
    displayWordStatus();
    currentWord= word.split('');
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
    for(let i = 0; i < currentWord.length; i++){
        let textVal = textBox.value;
        let wordLetter = document.querySelectorAll('.letter')
        let messagestext1 = document.getElementById('messages')
        let messagestext2 = document.getElementById('messages2')

        if(textVal.length > 1)
        {
            messagestext1.innerText = ("sorry, please enter only one word in lowercase")
        }
        if(textVal === currentWord[i]){
          wordLetter[i].innerText = textVal
          messagestext1.innerText = (`You entered ${textBox.value}, which is a letter in the word i am thinking`);     
         }
        }
     }
// Display a message to the user in the messagebox
const displayMessage = msg => { 
    /* Your code here! */
    
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);