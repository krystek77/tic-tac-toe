import React, { Component } from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare(i) {
    
    return (
      <Square
        key={i}
        value={this.props.squares[i].player}
        win ={this.props.squares[i].win}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
      let squares = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          squares.push(this.renderSquare((row*3 + col)*1))
        }
      }
    
    return (
      <div className='game-board'>
        {this.props.status}
        <div className='board p-2 border d-flex flex-wrap justify-content-center align-items-center'>
          {squares}
          {/* {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)} */}
        </div>
      </div>
    );
  }
}
