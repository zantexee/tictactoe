const gameBoard = (() => {
  const positionArray = [
    ['X', '0'],
    ['X', '1'],
    ['X', '2'],
    ['O', '3'],
    ['O', '4'],
    ['O', '5'],
    ['X', '6'],
    ['X', '7'],
    ['X', '8'],
  ];
  return { positionArray };
})();

const displayController = (() => {
  const gameBoardDiv = document.getElementById('gameboard');

  const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');

  //dummy render
  gameBoard.positionArray.forEach((pair) => {
    boxDivs[pair[1]].textContent = pair[0];
  });
})();
