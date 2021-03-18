/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = null;
let usedLetters = null;
let guesses = null;


/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');
let usedLettersDiv = document.querySelector('#used-letters');

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    guesses = 0;
    usedLetters = [];
    messages.innerText = '';
    textBox.value = '';
    displayusedLetters();
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
    const str = event.target.elements[0].value;
    checkStr(str);
    textBox.value = '';
}

const revealLetters = str => {
    const letters = document.querySelectorAll('.letter');

    if (str.length === 1) {
        const matches = getArrayOfIndexMatches(str,word);
        matches.forEach(index => {
            letters[index].innerText = word[index];
        });
    }

    else {
        for (let i = 0; i < letters.length; i++) {
            letters[i].innerText = word[i];
        }
    }
 
}

const getArrayOfIndexMatches = (letter, word) => {
    return word.split('').map((let,index) => {
        if (let === letter) return index;
    }).filter(index => index !== undefined);
}

const displayusedLetters = () => {
    usedLettersDiv.innerText = usedLetters.join(' ');
}

const checkWordState = () => {
    const letters = document.querySelectorAll('.letter');
    const currentStateWord = [...letters].map(letterDom => letterDom.innerText).join('');
    if (word === currentStateWord) resetGame();
}

const resetGame = () => {
    displayMessage('You guessed the right word!!!')
    setTimeout(() => {
        alert(`
            Amount of used letters: ${usedLetters.length} 
            Amount of guesses: ${guesses}
            Used letters: ${usedLetters}
            Game is now Resetted.
            Click Ok for a New Game.
        `);
        initialize();
    },2000);
}

// Display a message to the user in the messagebox
const displayMessage = msg => { 
    /* Your code here! */
    messages.innerText = msg;

}

const checkStr = str => {
   if (usedLetters.includes(str)) {
        displayMessage('Already in Used Letters');
   }
   
   else if (str.length > 1) {
       if (str === word) {
          displayMessage('Ding Ding Ding! You guessed the right word!');
          revealLetters(str);
          checkWordState();
       }

       else {
         displayMessage(`"${str}" is not the right word.`);
         guesses++;
       }
        
   }

   else if (str.length === 1 && word.includes(str)) {
        displayMessage('Nice Match!')
        revealLetters(str);
        usedLetters.push(str);
        displayusedLetters();
        checkWordState();
   }

   else {
        displayMessage('Not in there. Try another letter!')
        usedLetters.push(str);
        displayusedLetters();
   }

}



/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);