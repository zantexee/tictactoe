const player = (sign) => {
  const playerSign = sign;
  let playerName = '';

  return { playerSign, playerName };
};

const player1 = player('x');
const player2 = player('o');

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
    gameBoard.gameState = 'started';
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
        if (gameBoard.gameState === 'finished') return;

        const isTrue = winCondition.every((element) => arr.includes(element));
        if (arr.length === 5 && isTrue === false) {
          displayController.displayWinner('tie');
          gameBoard.gameState = 'finished';
          return;
        }
        if (isTrue) {
          if (sign === 'X') {
            displayController.displayWinner(player1.playerName);
            gameBoard.gameState = 'finished';
            return;
          }
          displayController.displayWinner(player2.playerName);
          gameBoard.gameState = 'finished';
          return;
        }
      });
    };

    // constructs an array of every pair that has the X element from the gameBoard.positionsArray and returns the position
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
  const formIsExpanded = () => {
    const formElement = document.getElementById('player-data-container');
    if (formElement.classList.contains('minimized')) return false;
    return true;
  };

  const initializeGameboard = (() => {
    const gameBoardDiv = document.getElementById('gameboard');

    const boxDivs = gameBoardDiv.getElementsByClassName('gamebox');
    const boxDivsArr = Array.prototype.slice.call(boxDivs);

    boxDivsArr.forEach((div, divNumber) =>
      div.addEventListener('click', () => {
        if (div.textContent) return;
        if (gameBoard.gameState === 'starting') {
          if (!formIsExpanded()) return expandUserData();
          return;
        }

        if (gameBoard.gameState === 'finished') {
          return displayController.clearGameboard();
        }
        gameBoard.changeCurrentSign();

        div.textContent = gameBoard.currentSign;
        gameBoard.setPosition(gameBoard.currentSign, divNumber);
        gameBoard.checkWinner();
      }),
    );
  })();

  //  displays winner in designated box
  const displayWinner = (winner, clear) => {
    const winnerElement = document.getElementById('player-announce');
    if (clear) return (winnerElement.innerHTML = '');
    if (winner !== 'tie') {
      const textNode = document.createTextNode(`${winner} won!`);

      return winnerElement.appendChild(textNode);
    }
    const textNode = document.createTextNode("It's a tie!");
    return winnerElement.appendChild(textNode);
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
  const expandUserData = () => {
    if (gameBoard.gameState === 'started') return;
    const element = document.getElementById('player-data-container');
    const formElement = document.getElementById('player-data-form');
    if (element.classList.contains('minimized')) {
      formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        player1.playerName = e.target[0].value;
        player2.playerName = e.target[1].value;
        expandUserData();
        gameBoard.gameState = 'started';
      });
      return (element.classList = 'container flex usr');
    }

    return (element.classList = 'minimized container flex usr');
  };
  return {
    displayWinner,
    clearGameboard,
    expandUserData,
    formIsExpanded,
  };
})();
