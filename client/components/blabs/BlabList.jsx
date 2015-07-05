import React from 'react';
import Blab from './Blab';

export default class BlabList extends React.Component {
  render() {
    var blabs = this.props.data.map(blab => {
      return (
        <Blab key={blab.id} content={blab.content} author={blab.handle}/>
      );
    })
    return (
      <ul className="blabs-list">
        {blabs}
      </ul>
    );
  }
}
