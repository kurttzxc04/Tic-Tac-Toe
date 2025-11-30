let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const gameBoard = document.getElementById("game");

const winPatterns = [
    [0,1,2], // top row
    [3,4,5], // middle row
    [6,7,8], // bottom row
    [0,3,6], // left column
    [1,4,7], // middle column
    [2,5,8], // right column
    [0,4,8], // diagonal left
    [2,4,6]  // diagonal right
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || gameOver) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winIndex = checkWin();
        if (winIndex !== -1) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            drawWinningLine(winIndex);
            gameOver = true;
            return;
        }

        if (board.every(x => x !== "")) {
            statusText.textContent = "Draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    });
});

function checkWin() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return i;  
        }
    }
    return -1;
}

function drawWinningLine(patternIndex) {
  document.querySelectorAll(".win-line").forEach(l => l.remove());

  const pattern = winPatterns[patternIndex];
  const startIndex = pattern[0];
  const endIndex = pattern[2];

  const boardRect = gameBoard.getBoundingClientRect();
  const startRect = cells[startIndex].getBoundingClientRect();
  const endRect = cells[endIndex].getBoundingClientRect();

  const startCenter = {
    x: startRect.left - boardRect.left + startRect.width / 2,
    y: startRect.top  - boardRect.top  + startRect.height / 2
  };
  const endCenter = {
    x: endRect.left - boardRect.left + endRect.width / 2,
    y: endRect.top  - boardRect.top  + endRect.height / 2
  };

  const dx = endCenter.x - startCenter.x;
  const dy = endCenter.y - startCenter.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx);

  const line = document.createElement("div");
  line.classList.add("win-line");

  
  line.style.width = `${length}px`;
  
  const thickness = 6; 
  line.style.left = `${startCenter.x}px`;
  line.style.top  = `${startCenter.y - thickness / 2}px`;

  
  line.style.transform = `rotate(${angle}rad) scaleX(0)`;

  
  gameBoard.appendChild(line);

  
  void line.offsetWidth;

  
  line.style.transform = `rotate(${angle}rad) scaleX(1)`;
}


resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cells.forEach(c => c.textContent = "");
    statusText.textContent = "Player X's Turn";

    
    document.querySelectorAll(".win-line").forEach(line => line.remove());
});
