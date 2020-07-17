import React, { Component } from 'react';
import styled from 'styled-components';

export default class Square extends Component {
  
  render() {
    return <Button win={this.props.win}
    clicked={this.props.value}
    onClick={()=>this.props.onClick()}
    disabled = {this.props.value === null ? false : true}
    >
      {this.props.value}
      </Button>;
  }
}

const Button = styled.button`
  font-weight: bold;
  border: none;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  background-color: ${(props)=>props.win ? "var(--red)":"transparent"};
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  font-size: 32px;
  &:nth-child(3n) {
    border-right-color: transparent;
  }
  &:nth-child(9) {
    border-bottom-color: transparent;
  }
  &:nth-child(8) {
    border-bottom-color: transparent;
  }
  &:nth-child(7) {
    border-bottom-color: transparent;
  }
  &:hover {
    background-color: var(--yellow);
  }
  &:disabled {
    /* color:${props=>props.clicked === 'X' ? "var(--orange)" : "var(--purple)"} */
    color:var(--dark)
  }
`;
