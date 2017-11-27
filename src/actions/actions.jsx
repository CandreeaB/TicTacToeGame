export const moves = {
  X: 'X',
  O: '0'
};

export const winner = {
  FirstPlayer: 'firstPlayer',
  SecondPlayer: 'secondPlayer'
};
export const firstPlayer = (key) => ({
    type: 'FIRST_PLAYER',
    key
});

export const secondPlayer = (key) => ({
    type: 'SECOND_PLAYER',
    key
});

export const playersName = (key, value) => ({
   type: 'PLAYERS_NAME',
    key,
    value
});

export const resetGame = () => ({
    type: 'RESET_GAME'
});

export const addWinner = (winner) => ({
    type: 'ADD_WINNER',
    winner
});

export const newPlayers = () => ({
    type: 'NEW_PLAYERS'
});
