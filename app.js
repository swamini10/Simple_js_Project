let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //tracks whose turn it is player(O or X)
let count = 0; //tracks the number of moves (to detect a draw).

const winPatterns = [//defines all possible winning combinations
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {//resets the game state
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box, idx) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O (human)
      box.innerText = "O";
      box.disabled = true;
      turnO = false;
      count++;
      let isWinner = checkWinner();
      if (count === 9 && !isWinner) {
        gameDraw();
        return;
      }
      // AI's turn (X)
      setTimeout(aiMove, 400); // slight delay for realism
    }
  });
});

function aiMove() {
  if (turnO) return; // Only move if it's X's turn
  // Find all empty boxes
  let emptyBoxes = [];
  boxes.forEach((box, idx) => {
    if (box.innerText === "") emptyBoxes.push(idx);
  });
  if (emptyBoxes.length === 0) return;
  // Pick a random empty box
  let moveIdx = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  boxes[moveIdx].innerText = "X";
  boxes[moveIdx].disabled = true;
  turnO = true;
  count++;
  let isWinner = checkWinner();
  if (count === 9 && !isWinner) {
    gameDraw();
  }
}

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
