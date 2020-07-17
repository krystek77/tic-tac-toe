import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill({player:null,win:false}),coordinate:{x:null,y:null} }],
      isXNext: true,
      stepNumber: 0,
      ascending:true,

    };
  }

  handleClick = (i) => {
    console.log(i);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentHistory = history[history.length - 1];
    const squares = currentHistory.squares.slice();
    
    const coordinate = {...currentHistory.coordinate};
    coordinate.x = i%3;
    coordinate.y = Math.floor(i/3);
    let player = { ...squares[i] };
  
    if (this.calculateWinner(squares) || squares[i].player) return;
    player.player = this.state.isXNext ? 'X' : 'O';
    squares[i] = player;
    
    this.setState({
      history: history.concat([{ squares: squares,coordinate:coordinate }]),
      isXNext: !this.state.isXNext,
      stepNumber: history.length,
    },()=>{
      
      const fields = this.highlightField(this.state.history)
      if(fields){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentHistory = history[history.length - 1];
        const squares = currentHistory.squares.slice();
        fields.forEach(item=>{
          const position = {...squares[item]}
          position.win = true;
          squares[item] =position
        })
        history[this.state.stepNumber].squares = squares;
        this.setState({history})
      }
    });
  };

  highlightField(history){
    const squares = history[history.length-1].squares;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a].player && squares[a].player === squares[b].player && squares[a].player === squares[c].player) {

        return lines[index]
      }
    }
    return null;
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a].player && squares[a].player === squares[b].player && squares[a].player === squares[c].player){

        return squares[a].player;
      }
    }
    return null;
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      //   isXNext: 0 % 2 === 0,
    });
  }
  handleSort(){
      let history = [...this.state.history];
      if (!this.state.ascending) history = history.reverse();
      else history = history.reverse();
      this.setState((prevState)=>({
        ascending:!prevState.ascending,
        history
      }))
  }
  render() {
    let history = this.state.history;
    const currentHistory = history[this.state.stepNumber];
    const winner = this.calculateWinner(currentHistory.squares);
    let status = (
      <h2 className='status p-2 border text-center'>
        Next player: {this.state.isXNext ? 'X' : 'O'}
      </h2>
    );
    if (winner) {
      status = (
        <h2 className='status p-2 border text-center'>
          The winner is: {winner}
        </h2>
      );
    }
    let noMovement = null;
    if(this.state.stepNumber === 9 && winner === null){
      noMovement = <div className="col-10 mt-2 mt-md-0 text-info"><p>No moves possible</p></div>
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className='text-center font-weight-bold py-2'>Tic Tac Toe</h1>
          </div>
        </div>
        <div className='row justify-content-center align-items-center'>
          <div className='col-10 col-md-6'>
            <Board
              squares={currentHistory.squares}
              isXNext={this.state.isXNext}
              onClick={(i) => this.handleClick(i)}
              status={status}
            />
          </div>
          <div className='col-10 mt-2 col-md-6 mt-md-0'>
            <div className='p-2 border'>
                <button 
                  className="btn btn-info d-block mx-auto"
                  onClick = {()=>this.handleSort()}
                  >
                  {this.state.ascending ? "descending":"ascending"}
              </button>
              <ol className='mb-0'>
                {history.map((step, move) => {
                  let desc = null;
                  let coordinate = null;
                  let classItem = null;
                  if(this.state.ascending){
                    desc = move
                      ? 'Przejdź do ruchu #' + move
                      : 'Przejdź na początek gry';
                      
                      if(step.coordinate.x !== null){
                        coordinate = <span>{` ,coordinate, last move: (${step.coordinate.x},${step.coordinate.y})`}</span>
                      }

                  }
                  else {
                      desc = move === history.length -1
                        ? 'Przejdź na początek gry'
                        : 'Przejdź do ruchu #' + (history.length - 1 -move);
                      
                      if (step.coordinate.x !== null) {
                        coordinate = <span>{` ,coordinate, last move: (${step.coordinate.x},${step.coordinate.y})`}</span>
                      }
                    }
                    classItem = this.state.stepNumber === move ? "font-weight-bold" : "font-weight-lighter";
                  

                  return (
                    <li className={classItem} key={move} onClick={() => this.jumpTo(move)}>
                      {desc}
                      {coordinate}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          {noMovement}
        </div>
      </div>
    );
  }
}
