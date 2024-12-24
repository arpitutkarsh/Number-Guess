//first we have to generate a random number between 1 and 100 
//to generate random numbers we use Math library
let randomNumber = parseInt(Math.random() * 100 + 1) //as we were getting decimal value also so we will be parsing it to integer
//we are multiplying it to 100 to generate 2 digit numbers and adding 1 so when it generated 0 it will be added to 1
//now we will be taking submit button
const submit = document.querySelector('#sub');
const forms = document.querySelector('.guessField')

//now we will be taking user input's value
const userInput = document.querySelector('#guessField');
//now we will be taking previous guesses
const guessSlot = document.querySelector('.guesses');
//now we will be taking last result
const remains = document.querySelector('.lastResult');
//now taking low or high values to inform user
const lowOrHigh = document.querySelector('.loworhi');
const startOver = document.querySelector('resultParas');
const addbutton = document.querySelector('.addbutton')

//we will also be creating a Paragraph
const p = document.createElement('p')

//first we will be needing an array of previous guesses
let prevGuess = [] ;
//then we have to track the attempts he made
let numGuess = 1

let playGame = true; //this is always used to design a game for checking if chances are remaining or  not

//first we will be checking if we can play the game or not
if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        console.log(guess);
        validateGuess(guess);
    })
}
//first funcion we will be needing will be of validate guess function
function validateGuess(guess){
    //this function will be used to check if the user input is valid or not, which means that this will check if the user enters alphabets, negative number or number greater than 100 then it will check that only
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }
    else if(guess < 1){
        alert('Heyy!! Please enter a number greater than or equal to 1')
    }
    else if(guess > 100){
        alert('Ouch! Please enter a number less than 100!')
    }
    else{
        prevGuess.push(guess);
        //now we have to check if the attempts are remaining or not
        if(numGuess === 11){
            displayGuess(guess);
            displayMessage(`Awww! Game Over, Random Number was ${randomNumber}`);
            endGame()
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    //this will check if the user  guess is equal to the random number or not
    if(guess === randomNumber){
        displayMessage(`You guessed it right`)
        forms.style.borderColor = "green";
        endGame()
    }
    else if(guess < randomNumber){
        displayMessage(`Number is TOOO low`)
    }
    else if(guess > randomNumber){
        displayMessage(`Number is TOOO high`)
    }
}
function displayGuess(guess){
    //it will update previous guess array and update remianing guess
    userInput.value = '' //it will automatically clean the input field
    guessSlot.innerHTML += `${guess} `
    numGuess++;
    remains.innerHTML = `${11 - numGuess}`
}
function displayMessage(message){
    //
    lowOrHigh.innerHTML = `<h2>${message}</h2>`

}



function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    addbutton.classList.add('button'); //we added a new button
    addbutton.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    addbutton.appendChild(p);
    
    addbutton.style.color = 'green';
    playGame = false;
    newGame();
}

function newGame(){
    const newGamebutton = document.querySelector('#newGame')
    newGamebutton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = []
        numGuess = 1
        forms.style.borderColor = 'white';
        guessSlot.innerHTML = ''
        remains.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled')
        addbutton.innerHTML = ''
        playGame = true;

    })
}