"use strict";

const squares = document.querySelectorAll(".square");
const panel = document.getElementById("panel");
const xButton = document.getElementById("xButton");
const oButton = document.getElementById("oButton");
const app = document.querySelector(".app");
const canvas = document.getElementById("gameCanvas");
const humanScore = document.getElementById("humanScoreNumber");
const aiScore = document.getElementById("aiScoreNumber");
const score = document.getElementById("score");
const html0 = '<div id="o">O</div>';
const htmlx = '<div id="x">✘</div>';
const panelSwitch = document.getElementById("switchPanel");
const changeToO = document.getElementById("changeToO");
const stayWithX = document.getElementById("stayWithX");
// Convert the content to numbers
const humanScoreValue = Number(humanScore.textContent);
const aiScoreValue = Number(aiScore.textContent);

let aiMark = null;
let humanMark = null;
let currMark = null;
let humanOTurn = true;
let humanXTurn = false;
let aiTurn = false;
let xHasWon = false;
let oHasWon = false;
let currentBoardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const currentBoardCopy = [...currentBoardState];
let aiCount = 0;
let humanCount = 0;
let gameCount = 0;
let panelSwitchPoped = false;

stayWithX.addEventListener("click", function (event) {
  panelSwitch.style.display = "none";
  app.style.display = "flex";
  currentBoardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xHasWon = false;
  oHasWon = false;
  humanXTurn = true;
  console.log(
    xHasWon,
    oHasWon,
    currentBoardState,
    humanMark,
    aiMark,
    humanOTurn
  );
  event.preventDefault(); // Prevent form submission
  return false;
});

changeToO.addEventListener("click", function (event) {
  humanMark = "o";
  aiMark = "x";
  panelSwitch.style.display = "none";
  app.style.display = "flex";
  currentBoardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xHasWon = false;
  oHasWon = false;
  humanXTurn = true;
  humanOTurn = false;
  playAITurn();
  event.preventDefault(); // Prevent form submission
  return false;
});

xButton.addEventListener("click", function () {
  humanMark = "x";
  aiMark = "o";
  currMark = "x";
  humanXTurn = true;
  // Hide the form
  panel.style.display = "none";

  // Show the game board
  app.style.display = "flex";
  // Show scores
  score.style.display = "flex";
  // Prevent the form submission
  event.preventDefault();
});

oButton.addEventListener("click", function () {
  humanMark = "o";
  aiMark = "x";
  currMark = "x";
  aiTurn = true;
  humanOTurn = false;
  // Hide the form
  panel.style.display = "none";

  // Show the game board
  app.style.display = "flex";
  //Show scores
  score.style.display = "flex";

  // Prevent the form submission
  event.preventDefault();

  playAITurn();
});

// click event listeners for numbers
squares.forEach((square, index) => {
  square.addEventListener("click", () => {
    if (
      typeof currentBoardState[index] === "number" &&
      !xHasWon &&
      !oHasWon &&
      ((humanMark === "o" && !humanOTurn) || (humanMark === "x" && humanXTurn))
    ) {
      square.insertAdjacentHTML(
        "afterbegin",
        humanMark === "o" ? html0 : htmlx
      );
      currMark = aiMark;

      currentBoardState[index] = humanMark;
      checkForWinner();

      // Only proceed to AI's turn if the game is not won by the human
      if (!xHasWon && !oHasWon) {
        setTimeout(() => {
          playAITurn();
        }, 300);
      }
    }
  });
});

function playAITurn() {
  // Use the minimax function to get the best move
  const bestMoveInfo = minimax(currentBoardState, aiMark, aiMark);
  const bestMoveIndex = bestMoveInfo.index;
  // Make the move on the board
  squares[bestMoveIndex].insertAdjacentHTML(
    "afterbegin",
    aiMark === "x" ? htmlx : html0
  );

  // Update the current board state
  currentBoardState[bestMoveIndex] = aiMark;

  // Check for a winner after the AI move
  checkForWinner();
}

function changeBackgroundColorWithDelay(square, times) {
  let count = 0;

  function toggleColor() {
    if (count % 2 === 0) {
      square.style.backgroundColor = "rgb(196, 196, 196)";
    } else {
      square.style.backgroundColor = "rgb(59, 206, 208)";
    }

    count++;

    if (count < times * 2) {
      setTimeout(toggleColor, 300); // 200 milliseconds delay
    }
  }

  toggleColor();
}

// Step 5 - Create a winner determiner function:

function checkForWinner() {
  if (
    currentBoardState[0] === "x" &&
    currentBoardState[1] === "x" &&
    currentBoardState[2] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[1], 3);
    changeBackgroundColorWithDelay(squares[2], 3);
    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });

    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[3] === "x" &&
    currentBoardState[4] === "x" &&
    currentBoardState[5] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[3], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[5], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[6] === "x" &&
    currentBoardState[7] === "x" &&
    currentBoardState[8] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[6], 3);
    changeBackgroundColorWithDelay(squares[7], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[0] === "x" &&
    currentBoardState[3] === "x" &&
    currentBoardState[6] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[3], 3);
    changeBackgroundColorWithDelay(squares[6], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[1] === "x" &&
    currentBoardState[4] === "x" &&
    currentBoardState[7] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[1], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[7], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[2] === "x" &&
    currentBoardState[5] === "x" &&
    currentBoardState[8] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[2], 3);
    changeBackgroundColorWithDelay(squares[5], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[0] === "x" &&
    currentBoardState[4] === "x" &&
    currentBoardState[8] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[2] === "x" &&
    currentBoardState[4] === "x" &&
    currentBoardState[6] === "x"
  ) {
    xHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[2], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[6], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[0] === "o" &&
    currentBoardState[1] === "o" &&
    currentBoardState[2] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[1], 3);
    changeBackgroundColorWithDelay(squares[2], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[3] === "o" &&
    currentBoardState[4] === "o" &&
    currentBoardState[5] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[3], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[5], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[6] === "o" &&
    currentBoardState[7] === "o" &&
    currentBoardState[8] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[6], 3);
    changeBackgroundColorWithDelay(squares[7], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[0] === "o" &&
    currentBoardState[3] === "o" &&
    currentBoardState[6] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[3], 3);
    changeBackgroundColorWithDelay(squares[6], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[1] === "o" &&
    currentBoardState[4] === "o" &&
    currentBoardState[7] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[1], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[7], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[2] === "o" &&
    currentBoardState[5] === "o" &&
    currentBoardState[8] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[2], 3);
    changeBackgroundColorWithDelay(squares[5], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[0] === "o" &&
    currentBoardState[4] === "o" &&
    currentBoardState[8] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[8], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState[2] === "o" &&
    currentBoardState[4] === "o" &&
    currentBoardState[6] === "o"
  ) {
    oHasWon = true;
    gameCount++;
    changeBackgroundColorWithDelay(squares[2], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[6], 3);

    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  } else if (
    currentBoardState.every((element) => element === "x" || element === "o")
  ) {
    gameCount++;
    changeBackgroundColorWithDelay(squares[0], 3);
    changeBackgroundColorWithDelay(squares[1], 3);
    changeBackgroundColorWithDelay(squares[2], 3);
    changeBackgroundColorWithDelay(squares[3], 3);
    changeBackgroundColorWithDelay(squares[4], 3);
    changeBackgroundColorWithDelay(squares[5], 3);
    changeBackgroundColorWithDelay(squares[6], 3);
    changeBackgroundColorWithDelay(squares[7], 3);
    changeBackgroundColorWithDelay(squares[8], 3);
    squares.forEach((square) => {
      square.style.pointerEvents = "none";
    });
    //Increment scores and reset game state
    addScore();
  }
}

function addScore() {
  if (humanMark === "x" && xHasWon) {
    humanCount++;
  } else if (aiMark === "x" && xHasWon) {
    aiCount++;
  } else if (aiMark === "o" && oHasWon) {
    aiCount++;
  } else if (humanMark === "o" && oHasWon) {
    humanCount++;
  }

  squares.forEach((square) => {
    square.style.pointerEvents = "none";
  });

  setTimeout(() => {
    squares.forEach((square) => {
      square.innerHTML = "";
      square.style.pointerEvents = "auto";
    });
    currentBoardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xHasWon = false;
    oHasWon = false;
    humanXTurn = true;

    // Update scores
    humanScore.textContent = humanCount;
    aiScore.textContent = aiCount;

    if (aiMark === "x") {
      playAITurn();
    } else {
      // Check for the condition when to display panelSwitch
      if (
        humanMark === "x" &&
        humanCount === 0 &&
        gameCount === 4 &&
        !panelSwitchPoped
      ) {
        panelSwitch.style.display = "flex";
        app.style.display = "none";
        panelSwitchPoped = true;
      }
    }
  }, 1500);
}

function checkIfWinnerFound(currentBoardCopy, currMark) {
  if (
    (currentBoardCopy[0] === currMark &&
      currentBoardCopy[1] === currMark &&
      currentBoardCopy[2] === currMark) ||
    (currentBoardCopy[3] === currMark &&
      currentBoardCopy[4] === currMark &&
      currentBoardCopy[5] === currMark) ||
    (currentBoardCopy[6] === currMark &&
      currentBoardCopy[7] === currMark &&
      currentBoardCopy[8] === currMark) ||
    (currentBoardCopy[0] === currMark &&
      currentBoardCopy[3] === currMark &&
      currentBoardCopy[6] === currMark) ||
    (currentBoardCopy[1] === currMark &&
      currentBoardCopy[4] === currMark &&
      currentBoardCopy[7] === currMark) ||
    (currentBoardCopy[2] === currMark &&
      currentBoardCopy[5] === currMark &&
      currentBoardCopy[8] === currMark) ||
    (currentBoardCopy[0] === currMark &&
      currentBoardCopy[4] === currMark &&
      currentBoardCopy[8] === currMark) ||
    (currentBoardCopy[2] === currMark &&
      currentBoardCopy[4] === currMark &&
      currentBoardCopy[6] === currMark)
  ) {
    return true;
  } else {
    return false;
  }
}

//find the empty cells
function getAllEmptyCellsIndexes(currentBoardCopy) {
  return currentBoardCopy.reduce((acc, cell, index) => {
    if (typeof cell === "number") {
      acc.push(index);
    }
    return acc;
  }, []);
}

function minimax(currentBoardCopy, currMark, aiMark) {
  //store the empty cells
  let availCellsIndexes = getAllEmptyCellsIndexes(currentBoardCopy);

  // check for a terminal state
  if (checkIfWinnerFound(currentBoardCopy, humanMark)) {
    return { score: -1 };
  } else if (checkIfWinnerFound(currentBoardCopy, aiMark)) {
    return { score: 1 };
  } else if (availCellsIndexes.length === 0) {
    return { score: 0 };
  }

  //store the result of the test plays
  const allTestPlayInfos = [];

  for (let i = 0; i < availCellsIndexes.length; i++) {
    // step 11. store the test play info
    const currentTestPlayInfo = {};
    //store the index of the cell that the loop is currently testing
    currentTestPlayInfo.index = currentBoardCopy[availCellsIndexes[i]];
    // place the mark of the current player on the currently processed cell
    currentBoardCopy[availCellsIndexes[i]] = currMark;
    //run the minimax on the new board since it changed
    let result;
    if (currMark === aiMark) {
      result = minimax(currentBoardCopy, humanMark, aiMark);
      currentTestPlayInfo.score = result.score;
    } else {
      result = minimax(currentBoardCopy, aiMark, aiMark);
      currentTestPlayInfo.score = result.score;
    }
    // reset the game to the initial state before the test
    currentBoardCopy[availCellsIndexes[i]] = currentTestPlayInfo.index;
    // save the result of the current test for future use
    allTestPlayInfos.push(currentTestPlayInfo);
  }

  // create a place to store the best possible play for the AI
  let bestTestPlay = null;

  // get a reference for the best play for the current player
  if (currMark === aiMark) {
    let bestScore = -Infinity;
    for (let i = 0; i < allTestPlayInfos.length; i++) {
      if (allTestPlayInfos[i].score > bestScore) {
        bestScore = allTestPlayInfos[i].score;
        bestTestPlay = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < allTestPlayInfos.length; i++) {
      if (allTestPlayInfos[i].score < bestScore) {
        bestScore = allTestPlayInfos[i].score;
        bestTestPlay = i;
      }
    }
  }
  // return the best test play info
  return allTestPlayInfos[bestTestPlay];
}

let bestPlayInfo = minimax(currentBoardCopy, currMark, aiMark);
