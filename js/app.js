/* Constants */
const WORD_LIST = ['chimichuri', 'beer' , 'sleep', 'deprived', 'atlanta', 'georgia']

/* Variables and App State */
let word = "".toLowerCase();

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
        letter.textContent = '-'
        letter.classList.add("letter");
        letter.id = "id"+i
        wordContainer.appendChild(letter);
    }        
}    
const guessLetter = event => {
    event.preventDefault();
    displayMessage(messages)        
}

// Display a message to the user in the messagebox
const displayMessage = msg => { 
    let guess = textBox.value.toLowerCase()
    let wordLength = word.length

    if(word === guess){
        winAll(word, msg)
    }
    else if(word.includes(guess)){
        winOneLetter(guess, word, msg)
    }
    else{
        msg.innerHTML = (`${textBox.value.toLowerCase()} is not a match!`)
    }
    checkForWin(wordLength)
}
const winAll = (all, m) =>{
    for(let j = 0; j < word.length; j++){
        let win = all[j]
         document.querySelector(`#id${j}`).innerHTML = win
         m.innerHTML = (`${word} is the correct word!!`)
    }
}
const winOneLetter = (x, y, m) =>{
    // for(let n = 0; n < word.length; n++){
    let yes = y.indexOf(x)
    while(yes > -1){
        document.querySelector(`#id${yes}`).innerHTML = x
        yes = y.indexOf(x, yes+1)
  }
    m.innerHTML = (`${x} is a match!`)
}

const checkForWin = (x) => {  
    for(let l = 0; l < word.length; l++){   
         if (document.querySelector(`#id${l}`).textContent !== '-'){
            x--
          if(x === 0){
                alert('YOU WIN')
            }
        }
    }
}
/* Event Liste  ners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);       