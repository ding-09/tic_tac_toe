const container = document.getElementById("game-board");
const boardSpaces = document.getElementsByClassName("board-space");
const modalBg = document.querySelector(".modal-bg");


const addCSS = (item) => {
    item.style.cursor = "default";
    item.style.animationName = "text";
    item.style.animationDuration = "0.5s";
    item.style.pointerEvents = "none";
    
    if (item.textContent == "X") {
        item.style.color = "#3DBBFE";
    } else {
        item.style.color = "#F49CC8";
    };
}

// module to initialize game board display
const displayGameBoard = (() => {
    for (i = 0; i < 3; i++) {
        let firstIdx = i.toString();
        for (j = 0; j < 3; j++) {
            let secondIdx = j;
            let index = firstIdx + secondIdx;
            const button = document.createElement("button");
            button.classList.add("board-space");
            button.setAttribute("data-index", index);
            container.appendChild(button);
        }
    }
})();

// module to initialize game board array
const Board = () => {
    let gameBoard = []; 

    // initiate gameBoard with indices matching button data index
    for (i = 0; i < boardSpaces.length; i++) {
        let index = boardSpaces[i].dataset.index;
        gameBoard.push(index);
    };

    // function to remove selected array
    const removeIndex = (index) => {
        gameBoard.splice(index, 1);
    }

    const checkIfWon = (mark) => {
        let board = [];
        for (i = 0; i < boardSpaces.length; i++) {
            board.push(boardSpaces[i].textContent);
        }

        if (rowWin(board, mark) || colWin(board, mark) || diagonalWin(board, mark)) {
            return true;
        };
    }

    const checkIfTie = () => {
        // check if tie 
        let board = [];
        for (i = 0; i < boardSpaces.length; i++) {
            board.push(boardSpaces[i].textContent);
        }
        for (i = 0; i < board.length; i++) {
            if (board[i] == "") {
                return false;
            }
        }
        return true;
    }
    

    const rowWin = (board, mark) => {
        const isEqual = (ele) => ele == mark;
        for (i = 0; i < boardSpaces.length; i+=3) {
            let row = board.slice(i, i+3);
            if (row.every(isEqual)) {
                return true; 
            } 
        }
    }

    const colWin = (board, mark) => {
        const isEqual = (ele) => ele == mark;
        for (i = 0; i < 3; i++) {
            let col = [board[i], board[i+3], board[i+6]];
            if (col.every(isEqual)) {
                return true;
            } 
        }
    }

    const diagonalWin = (board, mark) => {
        const isEqual = (ele) => ele == mark;
        let diagonals = "";
        for (i = 0; i < 3; i++) {
            if (i == 0) {
                diagonals = [board[i], board[i+4], board[i+8]];
            } else if (i == 1) {
                continue;
            } else if (i == 2) {
                diagonals = [board[i], board[i+2], board[i+4]];
            }
            if (diagonals.every(isEqual)) {
                return true;
            }
        }
    }

    return {gameBoard, removeIndex, checkIfWon, checkIfTie};
}; 

const Player = (name, mark) => {
    const makeMove = (board, boardSpace) => {
        boardSpace.textContent = mark;
        board.removeIndex(board.gameBoard.indexOf(boardSpace.dataset.index));
        addCSS(boardSpace);
    }
    return {name, mark, makeMove};
}

const CompPlayer = (name, mark) => {
    // place mark on any current available index
    const makeMove = (board) => {
        const max = board.gameBoard.length;
        
        // generate random position for computer
        let randomIndex = Math.floor(Math.random() * max);
        let compChoice = board.gameBoard[randomIndex];
        
        // place marker
        for (i = 0; i < boardSpaces.length; i++) {
            let currentIndex = boardSpaces[i].dataset.index;
            if (compChoice == currentIndex) {
                boardSpaces[i].textContent = mark;
                addCSS(boardSpaces[i]);
            }
        }
        // remove computer choice from gameboard array
        board.removeIndex(board.gameBoard.indexOf(compChoice));

    };
    return {name, mark, makeMove};
}

const Game = (() => {
    // initiate players and board
    let player = Player("Player", "X");
    let computer = CompPlayer("Bot", "O");
    let board = Board();

    // human player makes first move 
    let currentPlayer = player;

    const runGame = (e) => {
        // player makes move 
        if (currentPlayer == player) {
            if (e.target.textContent == "") {
                // if space is empty, place marker, adjust board, and switch turns
                let boardSpace = e.target;
                player.makeMove(board, boardSpace);
                if (board.checkIfWon(player.mark)) {
                    setTimeout(function() {
                        displayModal(player.name);
                    }, 1000);
                    return false;
                };
                currentPlayer = computer;
            }
        }
        setTimeout(function() {
            computer.makeMove(board);
            if (board.checkIfWon(computer.mark)) {
                setTimeout(function () {
                    displayModal(computer.name);
                }, 800);
                return false;
            };   
        }, 800);

        // switch player turn
        currentPlayer = player;

        if (!board.checkIfWon(player.mark) && !board.checkIfWon(computer.mark)) {
            if (board.checkIfTie()) {
                setTimeout(function() {
                    displayModal("tie");
                }, 1000);
                return false;
            }
        }
    };

    for (i = 0; i < boardSpaces.length; i++) {
        boardSpaces[i].addEventListener("click", runGame)
    }


})();

const resetGame = () => {
    location.reload();
}

const displayModal = (name) => {
    modalBg.style.display = "block";
    const winnerDisplay = document.getElementById("winner");
    if (name == "tie") {
        winnerDisplay.textContent = "It's a tie!";
    } else {
        winnerDisplay.textContent = `${name} wins!`;
    }
    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => {
        resetGame();
    })
}

