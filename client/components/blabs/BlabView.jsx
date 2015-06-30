import React from 'react';
import BlabList from './BlabList';

export default class BlabView extends React.Component {
  constructor() {
    super();
    this.state = {data: []};
  }
  componentDidMount() {
    this.readBlabsFromAPI();
  }
  readBlabsFromAPI() {
    this.props.readFromAPI(this.props.origin + '/blabs', blabs => {
      this.setState({data: blabs});
    });
  }
  render() {
    return (
      <div className="blabs-view">
        <BlabList data={this.state.data} />
      </div>
    );
  }
}
