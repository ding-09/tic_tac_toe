const container = document.getElementById("game-board");

// module to initialize game board 
const displayGameBoard = (() => {
    for (i = 0; i < 3; i++) {
        let firstIdx = i.toString();
        for (j = 0; j < 3; j++) {
            let secondIdx = j;
            let index = firstIdx + secondIdx;
            let button = document.createElement("button");
            button.classList.add("board-space");
            button.setAttribute("data-index", index);
            container.appendChild(button);
        }
    }

})();

const Board = () => {
    let gameBoard = []; 

    // initiate gameBoard with indices matching button data index
    const initBoard = () => {
        let boardSpaces = document.getElementsByClassName("board-space");
        for (i = 0; i < boardSpaces.length; i++) {
            let index = boardSpaces[i].dataset.index;
            gameBoard.push(index);
        }
    }
    initBoard();


    const rowWin = () => {
        if (gameBoard[0] && gameBoard[1] ) {

        }
    }



    return {gameBoard};



    // check if a player's desired move is legal before placing mark

    // winning patterns:

        // row: [00, 01, 02], [10, 11, 12], [20, 21, 22]

        // col: [00, 10, 20], [01, 11, 21], [02, 12, 22]

        // diagonal: [00, 11, 22], [02, 11, 20];

    // tie if board is filled and there is no winning pattern 

}

let board = Board();
console.log(board.gameBoard);






// every player gets to make move on the board

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    
    // make move 
};
    

const Game = (player1, player2) => {
    // new board
    // player1
    // player2

    // player1 make move 

    // place marker on display 

    // check if won or tied 

      // if won, display congratulatory message 

      // if tied, display tie message 

      // restart a new game in both scenarios 

    // if no one wins or ties, 

      // player2 make move 

    // REPEAT until won or tied (will require loop)

};


