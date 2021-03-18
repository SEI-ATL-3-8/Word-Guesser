/* Constants */

//I added more words i found from a similar game

const WORD_LIST = ["chrome", "firefox", "codepen", "javascript", "jquery", "twitter", "github", "wordpress", 
"opera", "sass", "layout", "standards", "semantic", "designer", "developer", "module", "component", "website", 
"creative", "banner", "browser", "screen", "mobile", "footer", "header", "typography", "responsive", 
"programmer", "css", "border", "compass", "grunt", "pixel", "document", "object", "ruby", "modernizr", 
"bootstrap", "python", "php", "pattern", "ajax", "node", "element", "android", "application", "adobe", "apple", 
"google", "microsoft", "bookmark", "internet", "icon", "svg", "background", "property", "syntax", "flash", 
"html", "font", "blog", "network", "server", "content", "database", "socket", "function", "variable", "link", 
"apache", "query", "proxy", "backbone", "angular", "email", "underscore", "cloud"]


/* Variables and App State */


/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let letter = document.querySelector('#letter')
let messages = document.querySelector('#messages');

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    console.log('The word is:', word);
    displayWordStatus();
    
    1//takes the dotted line off if commented out - kcr
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
        letter.id = "cell-" + i;
        wordContainer.appendChild(letter);
    }
}


// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault()
    console.log(`You submitted: ${textBox.value}`);
    if (textBox.value.length > 1) {
        checkWord(textBox.value)
        } else {
            checkLetter(textBox.value)
    }
}


const checkWord = (inputWord) => {
    if (inputWord === word) {
        for (let i = 0; i < word.length; i++) {
            let correctLetter = document.getElementById(`cell-${i}`)
            correctLetter.innerText = word[i]
        }
        messages.innerText = `Who told you the answer was ${word}?? Get off the Console!!`
    } else {
        messages.innerText = `Ooof, ${textBox.value} is incorrect, try again!`
    }
}



const checkLetter = (inputLetter) => {
    for (let i = 0; i < word.length; i++) {
        if (inputLetter === word.split(' ')[i]) {
            let correctLetter = document.getElementById(`cell-${i}`)
            correctLetter.innerText = word[i]
        }
    }    
    if (word.includes(inputLetter) === true) {
        messages.innerText = `you're getting warmer, ${textBox.value} is one of em!`
    } else {
        messages.innerText = `HAHAHAHA!!! ${textBox.value} is NOT one of em!`
    }
}


// Display a message to the user in the messagebox

    /* Your code here! */


/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);
