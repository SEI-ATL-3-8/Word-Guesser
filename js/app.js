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
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
}



let enteredLetters = []

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    console.log(`You submitted: ${textBox.value}`);

    // Select all the div's with the class letter. The amount of divs created is the same amount as the amount of letters in word 
    // ex. word = soup
    // ex. 4 divs created with inner HTML '_' 
    let letters = document.querySelectorAll('.letter')  
    // console.log(letters)
    // console.log(wordContainer)


    // for every letter in word, check if the textBox value(entered letter) matches a word[i] 
    // if the textBox value is equal to the letter than change the letters[i] (div with class letter) from _ to that letter 

    // you know that word[0] === letters[0] since they have the same length 
    for(let i = 0; i < word.length; i++) {
        if(textBox.value === word[i]) {
            letters[i].innerText = textBox.value
        }
    }
    // enteredLetters.push(textBox.value)

    //plug the entered letter into the display Message function 
    displayMessage(textBox.value)


    //reset the input box 
    textBox.value = ''

    //check if you've won 
    checkWin()
}


// Display a message to the user in the messagebox
const displayMessage = msg => { 
    console.log(msg)
    /* Your code here! */
    // the letter that you enter is plugged into here as msg

    // if the word includes that letter
    if(msg !== '' && word.includes(msg)){
       let anouncement = document.querySelector('#anouncement')
       anouncement.innerText = `${msg} + ' is a match!'`
        // anounce a match

    } else {
        // this else means the word does not include the entered letter
        let anouncement = document.querySelector('#anouncement')
        anouncement.innerText = `${msg} + ' is not a match!'`
    }
}
checkWin = () => {
    let letters = document.querySelectorAll('.letter') 
    // letters is the array on the dom with initially _ as their inner text 
    let hasWon = false
    for(let i = 0; i < letters.length; i++) {
        // loop through the array of letters and check if their inner text is _
        if(letters[i].innerText !== '_') {
            hasWon = true
        } else{
            // if it runs into one then you know you haven't won yet 
            return hasWon = false
        }
    }
    // if it finishes the loop and hasWon = true then you know all the letters inner text is not _ and that you've won 
    if(hasWon === true) {
        let anouncement = document.querySelector('#anouncement')
        anouncement.innerText = `You guessed ${word}!`
    }
}
/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);