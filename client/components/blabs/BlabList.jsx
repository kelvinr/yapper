import React from 'react';
import Blab from './Blab';

export default class BlabList extends React.Component {
  render() {
    var blabs = this.props.data.map(blab => {
      console.log(blab.user);
      return (
        <Blab key={blab.id} content={blab.content} author={blab.user}/>
      );
    })
    return (
      <ul className="blabs-list">
        {blabs}
      </ul>
    );
  }
}
