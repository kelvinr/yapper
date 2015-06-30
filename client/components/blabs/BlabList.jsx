import React from 'react';
import Blab from './Blab';

export default class BlabList extends React.Component {
  render() {
    let blabs = this.props.data.map(blab => {
      return (
        <Blab key={blab.id} content={blab.content} />
      );
    })
    return (
      <ul className="blabs-list">
        {blabs}
      </ul>
    );
  }
}
