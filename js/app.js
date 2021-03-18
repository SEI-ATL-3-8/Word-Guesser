/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather']

/* Variables and App State */
let word = "";

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let messages = document.querySelector('#messages');

let numCorrect = 0;

let guessedLetters = ""
/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    
    getData()
    
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
    console.log(`You submitted: ${textBox.value}`);
    let guess = textBox.value
    console.log(guess)
    let display = document.querySelectorAll('.letter')
    let correct = false;
    guessedLetters = guessedLetters + guess + " " 

    if(guess == word)
        {
            console.log("Correct")
            textBox.value = ""
            correct = true
            displayMessage("You have won!")
        }
    else{
        for (let i = 0 ;  i <= word.length; i++){
            if(guess != word.charAt(i)){
                console.log("Incorrect")
            }
            else{
                
                display[i].textContent = guess
                console.log("Correct" + i)
                numCorrect ++
                correct = true
            }
        }
        console.log("Here")
        if(correct == true){
            displayMessage(guess + " is correct: ")
        }
        else{
            displayMessage(guess + " is incorrect: ")
        }
        correct = false
        textBox.value = ""
    }
    if(numCorrect == word.length)
    {
        displayMessage("You have won!")
    }
    
}

// Display a message to the user in the messagebox
const displayMessage = msg => { 

    messages.textContent = msg  + "Previous guesses:    " + guessedLetters
    
}







getData = async () =>{
    
    try {
        let res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
        let data = await res.json()
        console.log(data)
        word = data[0]
        console.log('The word is:', word);
        displayWordStatus()
        return data
    } catch (error) {
        
    }
}


/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);