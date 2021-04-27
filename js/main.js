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

  let currentSign = 'X';
  let currentMove = 1;

  const changeCurrentSign = () => {
    if (gameBoard.currentMove !== 1) {
      gameBoard.currentSign = gameBoard.currentSign === 'X' ? 'O' : 'X';
      return gameBoard.currentMove++;
    }
    return gameBoard.currentMove++;
  };

  const setPosition = (sign, divNumber) => {
    positionArray[divNumber][0] = sign;
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

    const xArr = gameBoard.positionArray.filter((position) => position[0] === 'X');
    const oArr = gameBoard.positionArray.filter((position) => position[0] === 'O');

    if (gameBoard.currentSign === 'X') {
      for (let i = 0; i < xArr.length; i++)
        for (let j = 0; j < winningPositions.length; j++) {
          if (xArr.length - i - 2 > 0)
            if (xArr[i][1] === winningPositions[j][0]) {
              if (xArr[i + 1][1] && xArr[i + 2][1]) {
                if (
                  xArr[i + 1][1] === winningPositions[j][1] &&
                  xArr[i + 2][1] === winningPositions[j][2]
                ) {
                  console.log('x won');
                  return;
                }
              }
            }
        }
    }

    if (gameBoard.currentSign === 'O')
      for (let i = 0; i < oArr.length; i++) {
        for (let j = 0; j < winningPositions.length; j++) {
          if (oArr.length - i - 2 > 0)
            if (oArr[i][1] === winningPositions[j][0]) {
              if (oArr[i + 1][1] && oArr[i + 2][1]) {
                if (
                  oArr[i + 1][1] === winningPositions[j][1] &&
                  oArr[i + 2][1] === winningPositions[j][2]
                )
                  console.log('o won');
                return;
              }
            }
        }
      }
  };

  return {
    positionArray,
    currentMove,
    currentSign,
    setPosition,
    checkWinner,
    changeCurrentSign,
  };
})();

const displayController = (() => {
  const initializeGameboard = (() => {
    const gameBoardDiv = document.getElementById('gameboard');

    const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
    const boxDivsArr = Array.prototype.slice.call(boxDivs);

    boxDivsArr.forEach((div, divNumber) =>
      div.addEventListener('click', () => {
        gameBoard.changeCurrentSign();
        if (!div.textContent) div.textContent = gameBoard.currentSign;
        gameBoard.setPosition(gameBoard.currentSign, divNumber);
        gameBoard.checkWinner();
      }),
    );
  })();
})();

const player = () => {
  const playerSign = gameBoard.positionArray.length > 0 ? 'O' : 'X';

  return { playerSign };
};

const player1 = player();
const player2 = player();
