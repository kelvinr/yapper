import React from 'react';
import BlabList from './BlabList';
import BlabForm from './BlabForm';

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
    }.bind(this));
  }
  writeBlabToAPI(data) {
    this.props.writeToAPI('post', this.props.origin + '/blabs', data, blab => {
      var blabs = this.state.data;
      blabs.unshift(blab);
      this.setState({data: blabs});
    }.bind(this));
  }
  render() {
    return (
      <div className="blabs-view">
        <BlabForm writeBlabToAPI={this.writeBlabToAPI} signedIn={this.props.signedIn} />
        <BlabList data={this.state.data} />
      </div>
    );
  }
}
