// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

  // UI elements
  const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})


// Listen for guessBtn
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    guessInput.value = '';
    return;
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`)
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - lost
        gameOver(false, `Game over! You lost! The correct number was ${winningNum}`)
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';
      // Set message
      setMessage(`You guess is not correct! ${guessesLeft} guesses left`, 'red');
      guessInput.value = '';
    }
  }
});

// Game Over
function gameOver(won, msg) {

let color;
won === true ? color = 'green' : color = 'red';

  // Disable guessInput
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  guessInput.style.color = color;
  // Set message
  setMessage(msg, color);

// Play gain?
guessBtn.value = 'Play Again';
guessBtn.className += 'play-again';

}

// Get winning number
function getRandomNum(min, max) {
  // Ensures min and max can be dynamic (whatever number you set)
 return Math.floor(Math.random() * (max-min+1)+min);
}

// Set Message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
