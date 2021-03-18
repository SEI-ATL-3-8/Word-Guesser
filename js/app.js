/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";
let displayedWord = [];
let wordArray = [];

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
    for(let i =0; i < word.length; i++) {
        wordArray.push(word.charAt(i));
        displayedWord.push('_');
    }
    //console.log(wordArray);
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
        letter.textContent = displayedWord[i];
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    var guess = textBox.value.toLowerCase();

    console.log(`You submitted: ${textBox.value}`);
    displayMessage("")
    if (wordArray.includes(guess)) {
        console.log('correct')
        displayMessage("Correct")
        for(let i =0; i < word.length; i++){
            if(guess == wordArray[i]){
                displayedWord[i] = guess
            }
        }
        displayWordStatus();
        if (displayedWord.includes("_") == false){
            displayMessage("You Win")
        }

        
    } 
    else if(word.localeCompare(guess) == 0){
        displayMessage("You Win")
        displayedWord = wordArray;
        displayWordStatus();
}
    
    else{
        console.log('inncorrect letter')
        displayMessage("Inncorrect")

    }

}
// Display a message to the user in the messagebox
const displayMessage = (msg) => { 
    /* Your code here! */
    messages.innerHTML = "<p>"+msg+"</p>"
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);