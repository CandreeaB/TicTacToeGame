import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {firstPlayer, secondPlayer, resetGame, addWinner, playersName, newPlayers} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = store => ({game: store.game});
const mapDispatchToProps = dispatch => bindActionCreators({
    firstPlayer,
    secondPlayer,
    resetGame,
    addWinner,
    playersName,
    newPlayers
}, dispatch);

class GameTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOne: '',
            playerTwo: '',
        };
    }

    componentWillReceiveProps(newProps) {
        let won = this.checkWin(newProps.game);
        if (won) {
            // alert(this.props.game.nextPlayer);
            this.props.addWinner(this.props.game.nextPlayer);
            this.props.resetGame();
        }
    }


    handleClick = (key) => {
        if (this.props.game.data[key] !== '') {
            return;
        }
        if (this.props.game.nextPlayer === 'firstPlayer') {
            this.props.firstPlayer(key);
        } else {
            this.props.secondPlayer(key);
        }
    };


    // this.props.addWinner(game.currentPlayer);
    // alert(`${game.currentPlayer} has won`);
    // this.props.resetGame(game.currentPlayer);
    checkWin = (game) => {
        let data = game.data;

        for (let i = 1; i < 4; i++) {
            let row = 0;
            let column = 0;
            let dp = 0;
            let ds = 0;
            for (let j = 1; j < 4; j++) {
                let rowValue = (data[String(i) + String(j)] === 'X' && 1) || (data[String(i) + String(j)] === '0' && -1 ) || 0;
                let columnValue = (data[String(j) + String(i)] === 'X' && 1) || (data[String(j) + String(i)] === '0' && -1) || 0;
                if (i === 1) {
                    let dpValue = (data[String(j) + String(j)] === 'X' && 1) || (data[String(j) + String(j)] === '0' && -1 ) || 0;
                    let dsValue = (data[String(j) + String(4 - j)] === 'X' && 1) || (data[String(j) + String(4 - j)] === '0' && -1 ) || 0;
                    dp += dpValue;
                    ds += dsValue;
                    if (j === 3) {
                        if (Math.abs(ds) === 3 || Math.abs(dp) === 3) {
                            return true
                        }
                    }
                }
                row += rowValue;
                column += columnValue;
                if (j === 3) {
                    if (Math.abs(row) === 3 || Math.abs(column) === 3) {
                        return true
                    }
                }
            }
        }
    };

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    handleAdd = (fp, sp) => {
        this.props.playersName(fp, this.state.playerOne );
        this.props.playersName(sp, this.state.playerTwo );
        this.setState({
            playerOne: '',
            playerTwo: ''
        });
    };

    render() {
        let data = this.props.game.data;

        return (
            <div>
                <div>
                <span className='input-name'>Player One:
                    <input value={this.state.playerOne} type='text'
                           onChange={(e) => this.handleChange(e, 'playerOne')}/>  </span>

                    <span className='input-name'>Player Two:
                    <input value={this.state.playerTwo} type='text'
                           onChange={(e) => this.handleChange(e, 'playerTwo')}/> </span>

                    <button onClick={() => this.handleAdd('firstPlayer', 'secondPlayer')}>
                        Submit
                    </button>
                </div>
                {this.props.game.players.firstPlayer && this.props.game.players.secondPlayer ?
                    <div className='player-name'>
                        <span>{this.props.game.players.firstPlayer} vs. </span>
                        <span>{this.props.game.players.secondPlayer}</span>
                    </div> : null}

                <div className="board-holder">
                    {Object.keys(data).map(key =>
                        <span className='board' onClick={() => this.handleClick(key)} key={key}> {data[key]}</span>
                    )}
                </div>

                <div className='score-board'>Leader
                    board: {Object.entries(this.props.game.players).map(([key, value]) =>
                        <div className='score-board-players' key={key}> {value}: {this.props.game.winners[key]} </div>
                    )}
                </div>
                <button onClick={this.props.resetGame}> CLEAR TABLE</button>
                <button onClick={this.props.newPlayers}>NEW PLAYERS</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);