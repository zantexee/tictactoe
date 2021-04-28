const gameBoard = (() => {
  const positionArray = [
    [' ', '0'],
    [' ', '1'],
    [' ', '2'],
    [' ', '3'],
    [' ', '4'],
    [' ', '5'],
    [' ', '6'],
    [' ', '7'],
    [' ', '8'],
  ];

  const currentSign = 'X';
  const currentMove = 1;
  const gameState = 'starting';

  const changeCurrentSign = () => {
    if (gameBoard.currentMove !== 1) {
      gameBoard.currentSign = gameBoard.currentSign === 'X' ? 'O' : 'X';
      return gameBoard.currentMove++;
    }
    return gameBoard.currentMove++;
  };

  const setPosition = (sign, divNumber) => {
    gameBoard.positionArray[divNumber][0] = sign;
  };

  const resetGameboard = () => {
    gameBoard.currentSign = 'X';
    gameBoard.currentMove = 1;
    gameBoard.gameState = 'starting';
    gameBoard.positionArray = [
      [' ', '0'],
      [' ', '1'],
      [' ', '2'],
      [' ', '3'],
      [' ', '4'],
      [' ', '5'],
      [' ', '6'],
      [' ', '7'],
      [' ', '8'],
    ];
  };

  const checkWinner = () => {
    const winningPositions = [
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      ['0', '4', '8'],
      ['2', '4', '6'],
    ];

    const checkWholeArray = (arr, sign) => {
      winningPositions.forEach((winCondition) => {
        const isTrue = winCondition.every((element) => arr.includes(element));

        if (isTrue) {
          if (sign === 'X') {
            displayController.displayWinner('X');
            gameBoard.gameState = 'finished';
            return;
          }
          displayController.displayWinner('O');
          gameBoard.gameState = 'finished';
          return;
        }
      });
    };

    const xArr = gameBoard.positionArray
      .filter((position) => position[0] === 'X')
      .map((arr) => arr[1]);
    const oArr = gameBoard.positionArray
      .filter((position) => position[0] === 'O')
      .map((arr) => arr[1]);

    if (gameBoard.currentSign === 'X') checkWholeArray(xArr, 'X');

    if (gameBoard.currentSign === 'O') checkWholeArray(oArr, 'O');
  };

  return {
    positionArray,
    currentMove,
    currentSign,
    gameState,
    setPosition,
    checkWinner,
    changeCurrentSign,
    resetGameboard,
  };
})();

const displayController = (() => {
  const initializeGameboard = (() => {
    const gameBoardDiv = document.getElementById('gameboard');

    const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
    const boxDivsArr = Array.prototype.slice.call(boxDivs);

    boxDivsArr.forEach((div, divNumber) =>
      div.addEventListener('click', () => {
        if (gameBoard.gameState === 'finished') {
          return displayController.clearGameboard();
        }
        gameBoard.changeCurrentSign();
        if (!div.textContent) div.textContent = gameBoard.currentSign;

        gameBoard.setPosition(gameBoard.currentSign, divNumber);
        gameBoard.checkWinner();
      }),
    );
  })();

  const displayWinner = (winner, clear) => {
    const winnerElement = document.getElementById('player-announce');
    const textNode = document.createTextNode(`${winner} won!`);

    if (clear) return (winnerElement.innerHTML = '');
    winnerElement.appendChild(textNode);
  };
  const clearGameboard = () => {
    const gameBoardDiv = document.getElementById('gameboard');

    const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
    const boxDivsArr = Array.prototype.slice.call(boxDivs);

    boxDivsArr.forEach((div) => {
      div.innerHTML = '';
    });
    displayController.displayWinner('', true);
    gameBoard.resetGameboard();
  };
  return {
    displayWinner,
    clearGameboard,
  };
})();

const player = () => {
  const playerSign = gameBoard.positionArray.length > 0 ? 'O' : 'X';

  return { playerSign };
};

const player1 = player();
const player2 = player();
