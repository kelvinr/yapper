import React from 'react';
import BlabList from './BlabList';
import BlabForm from './BlabForm';

export default class BlabView extends React.Component {
  constructor() {
    super();
    this.writeBlabToAPI = this.writeBlabToAPI.bind(this);
    this.optimisticUpdate = this.optimisticUpdate.bind(this);
    this.state = {data: []};
  }
  componentDidMount() {
    this.readBlabsFromAPI();
  }
  readBlabsFromAPI() {
    this.props.readFromAPI(this.props.origin + '/blabs', blabs => {
      this.setState({data: blabs})
    });
  }
  writeBlabToAPI(data) {
    this.props.writeToAPI('post', this.props.origin + '/blabs', data, blab => {
      let blabs = this.state.data;
      blabs.shift();
      blabs.unshift(blab);
      this.setState({data: blabs});
    });
  }
  optimisticUpdate(blab) {
    let blabs = this.state.data;
    blabs.unshift(blab);
    this.setState({data: blabs});
  }
  render() {
    return (
      <div className="blabs-view">
        <BlabForm writeBlabToAPI={this.writeBlabToAPI} optimisticUpdate={this.optimisticUpdate} userHandle={this.props.currentUser} signedIn={this.props.signedIn} />
        <BlabList data={this.state.data} />
      </div>
    );
  }
}
