import {moves} from "../actions/actions";


let winnerObj = localStorage.getItem('winners');
winnerObj = JSON.parse(winnerObj);

let playersObj = localStorage.getItem('playersName');
playersObj = JSON.parse(playersObj);

let initialState = {
    data: {
        11: '', 12: '', 13: '',
        21: '', 22: '', 23: '',
        31: '', 32: '', 33: '',
    },
    currentPlayer: 'firstPlayer',
    nextPlayer: 'firstPlayer',
    players: playersObj || {firstPlayer: '', secondPlayer: ''},
    winners: winnerObj || {firstPlayer: 0, secondPlayer: 0},
};



const game = (state = initialState, action) => {
    switch (action.type) {
        case 'PLAYERS_NAME': {
            let previousPlayers = JSON.parse(localStorage.getItem('playersName')) || {firstPlayer: '', secondPlayer: ''};
            let newPlayer = {
                ...previousPlayers,
                [action.key]: action.value
            };
            localStorage.setItem('playersName', JSON.stringify(newPlayer));
            return {
                ...state,
                ...{players: newPlayer},
            }
        }
        case 'FIRST_PLAYER': {
            let updatePlayer = {...state.currentPlayer};
                updatePlayer = 'firstPlayer';
            let updateData = {...state.data};
                updateData[action.key] = moves.X;
            let nextPlayer = {...state.nextPlayer};
                nextPlayer = 'secondPlayer';
            return {
                ...state,
                ...{data: updateData, nextPlayer: nextPlayer, currentPlayer: updatePlayer}
            }
        }
        case 'SECOND_PLAYER': {
            let updatePlayer = {...state.currentPlayer};
                updatePlayer = 'secondPlayer';
            let updateData = {...state.data};
                updateData[action.key] = moves.O;
            let nextPlayer = {...state.nextPlayer};
                nextPlayer = 'firstPlayer';
            return {
                ...state,
                ...state.winners,
                ...{data: updateData, nextPlayer: nextPlayer, currentPlayer: updatePlayer}
            }
        }

        case 'ADD_WINNER': {
            let previousWinners = JSON.parse(localStorage.getItem('winners')) || {firstPlayer: 0, secondPlayer: 0};
            let newWinner = {
                ...previousWinners,
                [action.winner]: previousWinners[action.winner] + 1
            };
            localStorage.setItem('winners', JSON.stringify(newWinner));
                return {
                    ...state,
                    ...{winners: newWinner}
                }
        }

        case 'RESET_GAME': {
            let winnerObj = localStorage.getItem('winners');
            winnerObj = JSON.parse(winnerObj);
            let playersObj = localStorage.getItem('playersName');
            playersObj = JSON.parse(playersObj);
            return {
                ...state = initialState,
                ...{winners: winnerObj},
                ...{players: playersObj}

            }
        }

        case 'NEW_PLAYERS': {
            localStorage.clear();
            return initialState
        }

        default:
            return state
    }
};

export default game;


