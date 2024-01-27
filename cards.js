

// todo show snak peek bar until end of sneak show
// todo on p1 turn it does 2 flashes instead of 1


var errors = 0;
var matches = 0;
var timeInSecs = 0;
var mascotNumber = 0;
var mascotSource = "";
var mascotDirection = 0; // direction 1 = left, 2 = right
var p1Mascot = 0; // 1-4
var p2Mascot = 0; // 1-4
var p1Turn = true;
var player1Points = 0;
var player2Points = 0;
var cardSet;
var board = [];
var rows = 3;
var columns = 4;
var card1Selected;
var card2Selected;
var p1TurnLoaded = false;
var p2TurnLoaded = false;
var gameUnderwayButtonDisabled = false;
var randomNumber1 = 0;
var randomNumber2 = 0;

var cardList = [];

var mixedCards1 = [
  "alien1",
  "smalleyecat1",
  "bigeyecat1",
  "manish2",
  "furryclothes1",
  "alien6",
]

var mixedCards2 = [
  "alien3",
  "manish1",
  "bigeyecat3",
  "furryclothes2",
  "smalleyecat3",
  "alien5",
]

var mixedCards3 = [
  "bigeyecat2",
  "manish3",
  "alien4",
  "alien2",
  "smalleyecat2",
  "bigeyecat1",
]


window.onload = function() {
  let button = document.getElementById("buttonStart");
  button.addEventListener("click", runAPlayerTurn);
  button.innerText = "";
  chooseTwoNumbers();
  let reactionBar = document.getElementById("buttonStart");
  reactionBar.style.backgroundImage = "url('reaction_bar_button1.png')";
}

function chooseTwoNumbers() {
  randomNumber1 = Math.floor(Math.random() * 3) + 1;
  if (randomNumber1 == 1) {
    randomNumber2 = 3;
  } else if (randomNumber1 == 2) {
    randomNumber2 = 1;
  } else if (randomNumber1 == 3) {
    randomNumber2 = 2;
  }
}

function runAPlayerTurn() {
  if (!gameUnderwayButtonDisabled) { // dont allow clicks during turns
    if (p1Turn) {
      runP1Turn();
      gameUnderwayButtonDisabled = true;
    } else {
      runP2Turn();
      gameUnderwayButtonDisabled = true;
    }
  }
}

function runP1Turn() {
  if (!p1TurnLoaded) {
    let reactionBar = document.getElementById("buttonStart");
    reactionBar.style.backgroundImage = "url('reaction_bar_sneak.png')";
    setTimeout(player1DelayedActions, 1300);
  }
}

function runP2Turn() {
  if (!p2TurnLoaded) {
    let reactionBar = document.getElementById("buttonStart");
    reactionBar.style.backgroundImage = "url('reaction_bar_sneak.png')";
    hideCards();
    setTimeout(player2DelayedActions, 1300);
  }
}

function player1DelayedActions() {
  p1TurnLoaded = true;
  shuffleCards();
  loadBoard();
}

function player2DelayedActions() {
  matches = 0;
  misses = 0;
  p2TurnLoaded = true;
  shuffleCards();
  continueGame();
}


function resetReactionBar() {
  let reactionBar = document.getElementById("buttonStart");
  if (p1Turn) {
    reactionBar.style.backgroundImage = "url('reaction_bar_p1.png')";
  } else {
    reactionBar.style.backgroundImage = "url('reaction_bar_p2.png')";
  }
}

function shuffleCards() {

  if (p1Turn) {
    if (randomNumber1 == 1) {
      cardList = mixedCards1;
    } else if (randomNumber1 == 2) {
      cardList = mixedCards2;
    } else if (randomNumber1 == 3) {
      cardList = mixedCards3;
    }
  } else {
    if (randomNumber2 == 1) {
      cardList = mixedCards1;
    } else if (randomNumber2 == 2) {
      cardList = mixedCards2;
    } else if (randomNumber2 == 3) {
      cardList = mixedCards3;
    }
  }

  cardSet = cardList.concat(cardList); // makes 2 of each card
  console.log(cardSet);

  //shuffleCards
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length); // get random index
    //swap
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  console.log(cardSet);
}

function loadBoard() {
  for (let r = 0; r < rows; r++) {
    let row = [];

    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg); // JS
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardImg + ".png";
      console.log(card.src);
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
      // creates this for html: <img id="0-0" class="card" src="water.png">
    }
    board.push(row);
  }
  console.log(board);
  setTimeout(hideCards, 1300);
  setTimeout(resetReactionBar, 1300);
}

function continueGame() {
  // re-writes stored data for board array and displays back.png for all cards
  var cardIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let theCard = document.getElementById(r.toString() + "-" + c.toString());
      let cardImg = cardSet[cardIndex];
      board[r][c] = cardImg; // store new card img in the board array
      theCard.src = cardImg + ".png"; // show new card on screen
      cardIndex++;
      console.log(cardImg);
      console.log(theCard);
      console.log(cardIndex);
    }
  }
  console.log(board);
  setTimeout(hideCards,1300);
  setTimeout(resetReactionBar, 1300);
}

function hideCards() {
  for (let r=0; r < rows; r++) {
    for (let c=0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.png";
    }
  }
}

function selectCard() {

  if (this.src.includes("back")) { // if not already selected or matched
    if (!card1Selected) {
      card1Selected = this;
      let coords = card1Selected.id.split("-"); // 0-1 -> ["0", "1"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Selected.src = board[r][c] + ".png";
    }
    else if (!card2Selected && this != card1Selected) {
      card2Selected = this;
      let coords = card2Selected.id.split("-"); // 0-1 -> ["0", "1"]
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Selected.src = board[r][c] + ".png";
      setTimeout(compareCards,800); // now check selected cards
    }
  }
}

// function resetMatchesMistakes() {
//   matches = 0;
//   document.getElementById("matches").innerText = matches;
//   errors = 0;
//   document.getElementById("errors").innerText = errors;
// }

function compareCards() {

  if (card1Selected.src != card2Selected.src) { // if cards aren't the same, flip both back
    card1Selected.src = "back.png";
    card2Selected.src  = "back.png";

    errors += 1;
    // document.getElementById("errors").innerText = errors;

    if (p1Turn) { // check player turn to know which points to store
      player1Points -= 25;
      document.getElementById("points1").innerText = player1Points;
    } else {
      player2Points -= 25;
      document.getElementById("points2").innerText = player2Points;
    }

    let reactionBar = document.getElementById("buttonStart");
    reactionBar.style.backgroundImage = "url('reaction_bar_no.png')";

  } else {

    matches += 1;
    // document.getElementById("matches").innerText = matches;

    if (p1Turn) {
      player1Points += 100;
      document.getElementById("points1").innerText = player1Points;
    } else {
      player2Points += 100;
      document.getElementById("points2").innerText = player2Points;
    }
    let reactionBar = document.getElementById("buttonStart");
    reactionBar.style.backgroundImage = "url('reaction_bar_found.png')";
  }

  card1Selected = null;
  card2Selected = null;

  if (matches == 6) { // either next player turn or game over
    if (p1Turn) {
      let reactionBar = document.getElementById("buttonStart");
      reactionBar.style.backgroundImage = "url('reaction_bar_button2.png')";
      p1Turn = false; // p2 turn starts
      gameUnderwayButtonDisabled = false;
    } else {
      let reactionBar = document.getElementById("buttonStart");

      if (player1Points > player2Points) {
        reactionBar.style.backgroundImage = "url('reaction_bar_over_p1.png')";
      } else if (player2Points > player1Points) {
        reactionBar.style.backgroundImage = "url('reaction_bar_over_p2.png')";
      } else {
        reactionBar.style.backgroundImage = "url('reaction_bar_over_draw.png')";
      }

    }
  } else {
    setTimeout(resetReactionBar,1000); // don't run this when last match as display is updated elsewere
  }

}
