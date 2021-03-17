/* Constants */
const WORD_LIST = ['producer', 'brainstorm', 'explosion', 'soup', 'feather', 'wombat', 'noodle', 'rhythm', 'javascript', 'assembly']

/* Variables and App State */
let word = "";
let guesses = [];
let lives = 6;

/* DOM References */
let wordContainer = document.querySelector('#guess-word-container');
let textBox = document.querySelector('#textbox');
let submit = document.querySelector('#submit');
let messages = document.querySelector('#messages');
let reset = document.querySelector('#reset');
let livesBox = document.querySelector('.lives');
let guessBox = document.querySelector('#guesses');

/* Functions and app logic */

// Initialize the game: 
// 1. Reset state variables
// 2. Display the word blanks in the DOM
const initialize = event => {
    word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    console.log('The word is:', word);
    guesses = [];
    guessBox.innerHTML = guesses;
    guessBox.classList.add('hidden');
    lives = 6;
    livesBox.innerHTML = `Lives: ${lives}`;
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
        letter.textContent = '_';
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }
}

// On submit event: Guess a letter or guess the whole word
const guessLetter = event => {
    event.preventDefault();
    console.log(`You submitted: ${textBox.value}`);
    clearMessages();
    
    // guessed entire word
    if (textBox.value === word)
    {
        // fill in word and end game
        for (let i = 0; i < word.length; i++)
        {
            // grab letter divs and replace underscores with letters
            let currLetter = document.querySelector(`.letter:nth-child(${i+1})`);
            currLetter.innerHTML = textBox.value[i];
            
            // end game
            GameOver();
        }
    }
    else
    {
        // loop through textbox
        for (let j = 0; j < textBox.value.length; j++)
        {
            // check for space character and skip loop iteration
            if (textBox.value[j] === ' ')
            {
                continue;
            }
            
            // push current letter to guesses array if unique
            if (!guesses.includes(textBox.value[j]))
            {
                guesses.push(textBox.value[j]);
                guessBox.classList.remove('hidden');
                guessBox.innerHTML = guesses;
                // correct guess
                if (word.includes(textBox.value[j]))
                {
                    displayMessage(`${textBox.value[j]} is in the word. Keep going!`)
                    
                    // loop through word
                    for (let i = 0; i < word.length; i++)
                    {
                        if (word[i] === textBox.value[j])
                        {
                            // grab the letter div that matches the letter guessed
                            let currLetter = document.querySelector(`.letter:nth-child(${i+1})`);
                            // display letter instead of underscore
                            currLetter.innerHTML = textBox.value[j];
                        }
                    }

                    //check for win
                    checkWin();
                }
                // incorrect guess
                else
                {
                    displayMessage(`${textBox.value[j]} is not in the word. Try again!`);
                    lives--;
                    livesBox.innerHTML = `Lives: ${lives}`;
                    
                    if (lives <= 0)
                    {
                        GameOver();
                        // exit loop to stop displaying messages
                        break;
                    }
                }
            }
            else
            {
                displayMessage(`You already guessed ${textBox.value[j]}. Guess a new letter.`)
            }
        }
    }
}

// Display a message to the user in the messagebox
const displayMessage = msg => { 
    messages.innerHTML += msg + '<br>';
}

// Clear messages
function clearMessages()
{
    messages.innerHTML = '';
}

/* Event Listeners */
document.addEventListener('DOMContentLoaded', initialize);
document.addEventListener('submit', guessLetter);

//check for win - if word no longer contains any underscores then the player won
function checkWin()
{
    //grab letters from DOM
    let letters = document.querySelectorAll('.letter');

    //loop through letters
    for (let i = 0; i < letters.length; i++)
    {
        //check if letter is empty (still an underscore)
        if (letters[i].textContent === '_')
        {
            break;
        }

        //if i reaches length of letters then there are no empty letters
        if (i === letters.length - 1)
        {
            //win
            GameOver();
        }
    }
}


// Game Over
function GameOver()
{
    clearMessages();
    // display message based on win/loss
    if (lives > 0)
    {
        displayMessage('You win! Click the reset button to play again.')
    }
    else
    {
        displayMessage('Game Over! Click the reset button to play again.');
    }
    // hide all input forms and display reset
    submit.classList.add('hidden');
    textBox.classList.add('hidden');
    reset.classList.remove('hidden');
    document.addEventListener('reset', Reset);
}

// Reset
function Reset()
{
    clearMessages();
    // display all input forms and hide reset
    document.addEventListener('submit', guessLetter);
    reset.classList.add('hidden');
    submit.classList.remove('hidden');
    textBox.classList.remove('hidden');
    // restart
    initialize();
}