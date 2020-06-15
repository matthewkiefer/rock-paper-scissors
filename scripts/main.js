let playerSelectionCased;
let computerSelectionCased;
let playerScore = 0;
let computerScore = 0;
let results = document.querySelector(".results");

//set eventListener here for nodelist of .choices
//add animation for choice

//const keys = Array.from(document.querySelectorAll('.key'));
//keys.forEach(key => key.addEventListener('transitionend', removeTransition));
//window.addEventListener('keydown', playSound);

//buttons.forEach((button) => {

  // and for each one we add a 'click' listener
  //button.addEventListener('click', (e) => {
  //  alert(button.id);
  //});
//});


const choices = Array.from(document.querySelectorAll(".choice"));
choices.forEach(choice => choice.addEventListener("click", playRound));
choices.forEach(choice => choice.addEventListener("click", updateScorecard));
//function addClickListen(playerChoice) {
//    choice.addEventListener("click", playRound(choice.id, computerPlay());
//}

//working here - have to re-ID the HTML boxes to hard-coded names, so that name gets
//selected when I click

//const rock = document.getElementById("rock");
//rock.addEventListener("click", playRound("rock", computerPlay()));
//rock.addEventListener("click", function(e) {
//  console.log(e.target.id);
//  let roundResult = playRound(e.target.id, computerPlay());  
//  console.log(roundResult); 
//});

//function game() {
//  let playerPrompt = prompt("What's your move?", "Paper?");   
  //let roundResult = playRound(playerPrompt, computerPlay());  
  //console.log(roundResult); 
//  playerPrompt = prompt("What's your move?", "Paper?");   
//  roundResult = playRound(playerPrompt, computerPlay());  
 // console.log(roundResult); 
 // console.log(`The final score is player: ${playerScore} to computer: ${computerScore}!`);
//}
function computerPlay() {
    let randSelector = Math.floor(Math.random()*3 + 1);
    if (randSelector == 1) return "rock" 
    if (randSelector == 2)  return "paper" 
    else return "scissors" ;
}

function setupGame(paper, rock, scissors) {
  const paperText = document.getElementById("paper");
  const rockText = document.getElementById("rock");
  const scissorsText = document.getElementById("scissors");

  paperText.textContent = paper;
  rockText.textContent = rock;
  scissorsText.textContent = scissors;

  playerScore = 0;
  computerScore = 0;

  updateScorecard();

  let div = document.createElement("div");
  let body = document.querySelector("body");
  div.setAttribute("id", "announcements");
  div.setAttribute("class", "results");
  div.style.gridRowStart = 2;
  div.style.gridRowEnd = 3;
  div.style.alignSelf = "end";

  div.textContent = "Make your first move!";
  body.insertBefore(div, results);
}

function restartGame() {

  playerScore = 0;
  computerScore = 0;
  let announcements = document.getElementById("announcements");
  announcements.textContent = "New game!"
  document.removeEventListener("click", restartGame);
  choices.forEach(choice => choice.addEventListener("click", playRound));
}

function updateScorecard() {
 
  results.innerHTML = `The score is <b>${playerScore}</b> to <b>${computerScore}</b>`;
}



function playRound(e) {
  
  let playerSelection = e.target.id;
  let computerSelection = computerPlay();
  let announcements = document.getElementById("announcements");

  function playerLoses() {
    computerScore++;
    announcements.textContent = `You lose! The computer chose ${computerSelection} and beat your ${playerSelection}!`;
    if (computerScore == 5) {
      announcements.textContent = "COMPUTER WINS IT ALL! Click to restart";
      document.addEventListener("click", restartGame);
      choices.forEach(choice => choice.removeEventListener("click", playRound));
    }
  }

  function playerWins() {
    playerScore++;
    announcements.textContent = `You win! Your ${playerSelection} beats the computer's ${computerSelection}!`;
    if (playerScore == 5) {
      announcements.textContent = "PLAYER WINS IT ALL! Click to restart"
      document.addEventListener("click", restartGame);
      choices.forEach(choice => choice.removeEventListener("click", playRound));

    }
  }

  function tieAnnouncement() {
    announcements.textContent = "Tie! Play again!";
  }

  if (computerSelection == "paper" && playerSelection == "rock") {
      return playerLoses();
  }
  if (computerSelection == "rock" && playerSelection == "scissors") {
      return playerLoses();
  }
  if (computerSelection == "scissors" && playerSelection == "paper") {
      return playerLoses();
  }
  if (computerSelection == playerSelection) {
    return tieAnnouncement();
  }
  if (playerSelection == "paper" && computerSelection == "rock") {
      return playerWins();
  }
  if (playerSelection == "rock" && computerSelection == "scissors") {
    return playerWins();
  }
  if (playerSelection == "scissors" && computerSelection == "paper") {
    return playerWins();
  }
}

setupGame("PAPER", "ROCK", "SCISSORS");

//game();