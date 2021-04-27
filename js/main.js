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
  let currentMove = 0;

  const changeCurrentSign = () => {
    if (gameBoard.currentMove !== 0) {
      gameBoard.currentSign = gameBoard.currentSign === 'X' ? 'O' : 'X';
      return gameBoard.currentMove++;
    }
    return gameBoard.currentMove++;
  };

  const setPosition = (sign, divNumber) => {
    positionArray[divNumber][0] = sign;
  };

  const checkWinner = () => {
    const xArr = positionArray.filter((arr) => arr[0] === 'X');
    const oArr = positionArray.filter((arr) => arr[0] === 'O');

    let winCond = [];
    xArr.forEach((arr) => winCond.push(arr[2]));
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
  const gameBoardDiv = document.getElementById('gameboard');

  const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
  const boxDivsArr = Array.prototype.slice.call(boxDivs);

  boxDivsArr.forEach((div, divNumber) =>
    div.addEventListener('click', () => {
      gameBoard.changeCurrentSign();
      if (!div.textContent) div.textContent = gameBoard.currentSign;
      gameBoard.setPosition(gameBoard.currentSign, divNumber);
    }),
  );
})();

const player = () => {
  const playerSign = gameBoard.positionArray.length > 0 ? 'O' : 'X';

  return { playerSign };
};

const player1 = player();
const player2 = player();
