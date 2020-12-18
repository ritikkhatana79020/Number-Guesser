/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


//Variables
let min = 1,
    max = 10,
    winningNum =getRandomNum(min, max),
    guessLeft = 3;



//UI Vars
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');
      
     
//Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;  

//Play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();

    }
});

//Listen for Guess
guessBtn.addEventListener('click',function(){
   let guess = parseInt(guessInput.value);

   //Validate
   if(isNaN(guess) || guess<min || guess>max){

    setMessage(`Please Enter a Number Beteween ${min} and ${max}`,'red');

   }

   //Check If Won
   if(guess === winningNum){
      
       gameOver(true,`${winningNum} is correct, YOU WIN!`);

   }else{
       //WRong Number
       guessLeft = guessLeft - 1;
       if(guessLeft === 0 || guessLeft < 0){
           //game Lost
           gameOver(false, `You lost the game , Correct Answer was ${winningNum}`);

       }else{
           // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';

            //tell user that it's the wrong answer
            setMessage(`Wrong Answer, Guesses Left = ${guessLeft} `, 'red');
       }
   }
});

//gameOver
function gameOver(won , msg){

    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable Input
    guessInput.disabled = true;
    //Change Border Color
    guessInput.style.borderColor = color;
    //Set Text Color
    message.style.color = color;
    //set Message
    setMessage(msg);

    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}


//Set Message
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);

}


//Set Message
function setMessage(msg , color){
    message.style.color = color; 
    message.textContent = msg;
}
