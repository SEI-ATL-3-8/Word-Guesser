/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";
let guess = null;
let dashArray = []
let wordArray = []
let letterSpot= []


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
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
    storeArrays()
}




// On submit event: Guess a letter or guess the whole word
let correctGuesses = 0;
const guessLetter = event => {
    event.preventDefault();
    clearArray()
    guess = textBox.value
    let idx = wordArray.indexOf(guess);
        while(idx != -1){
        letterSpot.push(idx);
        idx = wordArray.indexOf(guess, idx + 1);
    }
     if(letterSpot.length >= 2){
        correctGuesses = correctGuesses + letterSpot.length
        for(i=0;i<letterSpot.length;i++){
            let letty = letterSpot[i];
            dashArray[letty].textContent = guess
        }
    } else{
        correctGuesses = correctGuesses + 1
        dashArray[letterSpot].textContent = guess
    }
    displayMessage()
    textBox.value= ''
}

// Display a message to the user in the messagebox
const displayMessage = msg => {
    while(messages.firstChild) {
        messages.removeChild(messages.firstChild)
    }
    let msg1 = document.createElement('p');
    if(!guess){
        return
    }
    else if(correctGuesses === dashArray.length){
        msg1.textContent = "you did ! you can finally go to bed!"
    }
    else if(word.includes(guess)===true){
        msg1.textContent = `${guess} is a letter!`
    }
    else{
        msg1.textContent = `${guess} is not a letter!`
    }
    msg1.classList.add('msg1');
    messages.append(msg1)
    
}



const storeArrays = () =>{
    let dashLocation = document.querySelectorAll('.letter')
    dashLocation.forEach(function(dash){
    dashArray.push(dash)
    })
    let letterLocation = word.split("");
    letterLocation.forEach(function(letter){
    wordArray.push(letter);
    })
}
const clearArray = () =>{
    letterSpot.length = 0;
}


/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);

