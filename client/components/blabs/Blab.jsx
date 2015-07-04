import React from 'react';

export default class Blab extends React.Component {
  render() {
    console.log(this.props);
    return (
      <li className="blab">
        <span className="blab-author">{this.props.author}:</span>
        <span className="blab-text">{this.props.content}</span>
      </li>
    );
  }
}
