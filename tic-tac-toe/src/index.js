import React from 'react';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquares() {
    let board = [];

    for (var i = 0; i < 3; i++) {
      let row = [];
      for (var j = 0; j < 3; j++) {
        row.push(this.renderSquare(i*3 + j));
      }
      board.push(<div className="board-row">{row}</div>);
    }

    return board;
  }

  render() {
    return (
      <div>
        {
          [0, 1, 2].map( (i) => {
            const row = [0, 1, 2].map( (j) => {
              return this.renderSquare(i*3 + j);
            });
            return (<div className="board-row">{row}</div>);
          })
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      descendingOrder: false,
    };
  }

  ToggleButton() {
    this.setState((state) => ({
      descendingOrder: !state.descendingOrder,
    }));
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (!(calculateWinner(squares) || squares[i])) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState((step, props) => {
        return {
          history: history.concat([{squares: squares,}]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        }
      });
    }
  }

  jumpTo(step) {
    this.setState((step, props) => {
      return {
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      }
    });
  }

  setButtonFontWeight(move) {
    return this.state.stepNumber === move ? 'bold' : 'normal';
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    let prevSquares;

    let moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move :
        'Go to game start';

      if (move > 0) {
        for (var i = 0; i < 9; i++) {
          if (step["squares"][i] !== prevSquares[i]) {
            const col = (i % 3) + 1;
            const row = Math.floor(i / 3) + 1;
            desc += " (" + col + "," + row + ")";
          }
        }
      }

      prevSquares = step["squares"];

      return (
        <li key={move}>
          <button
           style={{ fontWeight: this.setButtonFontWeight(move) }}
           onClick={() => this.jumpTo(move)}>
          {desc}
          </button>
        </li>
      );
    });

    if (this.state.descendingOrder) {
      moves = moves.reverse();
    }

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ToggleSwitch Name='descendingOrder' />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
