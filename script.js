const container = document.getElementById("game-board");
const boardSpaces = document.getElementsByClassName("board-space");

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
const Board = (() => {
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

    return {gameBoard, removeIndex};
})(); 

const Player = (name, mark) => {
    return {name, mark};
}

const CompPlayer = (name, mark) => {
    // place mark on any current available index
    const makeMove = () => {
        const max = Board.gameBoard.length;
        
        // generate a random number between 0 and max array length
        let randomIndex = Math.floor(Math.random() * max);

        let compChoice = Board.gameBoard[randomIndex];
        
        // place marker
        for (i = 0; i < boardSpaces.length; i++) {
            let currentIndex = boardSpaces[i].dataset.index;
            if (compChoice == currentIndex) {
                boardSpaces[i].textContent = mark;
                boardSpaces[i].style.cursor = "default";
                boardSpaces[i].classList.add("selected");
            }
        }
        // remove computer choice from gameboard array
        Board.removeIndex(Board.gameBoard.indexOf(compChoice));

    };
    return {name, mark, makeMove};
}

const Game = () => {
    // initiate players and board
    let player = Player("Player", "X");
    let computer = CompPlayer("Computer", "O");
    let board = Board.gameBoard;

    // human player makes first move 
    let currentPlayer = player;
    
    container.addEventListener("click", (e) => {
        // player makes move 
        if (currentPlayer == player) {
            let flag = true;
            while (flag) {
                if (e.target.textContent == "") {
                    // if space is empty, place marker, adjust board, and switch turns
                    let boardSpace = e.target;
                    boardSpace.textContent = currentPlayer.mark;
                    Board.removeIndex(board.indexOf(boardSpace.dataset.index));
                    currentPlayer = computer;
                    boardSpace.classList.add("selected");
                    boardSpace.style.cursor = "default";
                    flag = false;
                } else {
                    alert("This space is already taken!");
                    return;
                };
            }
        } 

        // computer makes move 
        setTimeout(function() {
            computer.makeMove();
        }, 600);
        currentPlayer = player;

        // alternate until board is filled 
            // check who won
            // or if tie
    });
}

let game = Game();
