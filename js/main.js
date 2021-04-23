const gameBoard = (() => {
  const positionArray = [];
  const addPosition = (sign, divNumber) => {
    const arr = [sign, divNumber];
    positionArray.push(arr);
  };

  return { positionArray, addPosition };
})();

const displayController = (() => {
  const gameBoardDiv = document.getElementById('gameboard');

  const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
  const boxDivsArr = Array.prototype.slice.call(boxDivs);

  boxDivsArr.forEach((div, divNumber) =>
    div.addEventListener('click', () => {
      const arrLength = gameBoard.positionArray.length;
      const lastSign = arrLength > 0 ? gameBoard.positionArray[arrLength - 1][0] : 'X';
      const currSign = lastSign === 'X' && arrLength > 0 ? 'O' : 'X';
      if (!div.textContent) div.textContent = currSign;

      gameBoard.addPosition(currSign, divNumber);
    }),
  );
})();

const player = () => {
  const playerSign = gameBoard.positionArray.length > 0 ? 'O' : 'X';

  return { playerSign };
};

const player1 = player();
const player2 = player();
