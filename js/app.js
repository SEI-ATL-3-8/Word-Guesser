/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');
let guessLetters = []
let guessCounter = 0;
let isCorrect = null
let wordArray = []



/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    wordArray = word.split('')
    console.log(wordArray)
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
            let letterId = ('letter' + i)
            letter.setAttribute('id', letterId)
            wordContainer.appendChild(letter);


        }
}

const checkGuess = () => {
    
    for(let i=0; i<guessLetters.length; i++) {
        let isCorrect = word.includes(textBox.value[i])
        if(isCorrect) {console.log('Your guess is correct')}
        else {console.log('Incorrect. Try again!')}

        for(let j = 0; j < wordArray.length; j++) {

            if(wordArray[j] === guessLetters[i]) {
            let letterId = ('letter' + j)
            document.querySelector(`#${letterId}`).textContent = wordArray[j]
            }
        }
    }
    checkWin(wordArray.length)
}

const checkWin = (lettersLeft) => {
    for(i=0; i<wordArray.length; i++){
        let letterId = ('letter' + i)
        
        
        if(document.querySelector(`#${letterId}`).textContent !== '_'){
            
            lettersLeft--
            
        }
        console.log('Letters left' + lettersLeft)
        }
        if(lettersLeft === 0){
            alert("You win!")

    }

}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    console.log(`You submitted: ${textBox.value}`)
    guessLetters[guessCounter] = textBox.value
    console.log(guessLetters)
    guessCounter++
    checkGuess()

}

// Display a message to the user in the messagebox
const displayMessage = msg => { 
    /* Your code here! */
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);
