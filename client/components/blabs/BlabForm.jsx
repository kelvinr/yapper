import React from 'react';

export default class BlabForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this); 
  }
  handleSubmit(e) {
    e.preventDefault();
    let content = this.refs.content.getDOMNode().value.trim();
    if (!content) {return;}
    if (this.props.signedIn) {
      this.props.writeBlabToAPI(JSON.stringify({blab: {content: content}}));
      this.refs.content.getDOMNode().value = '';
      this.refs.content.getDOMNode().blur();
    } else {
      alert('Please sign in to post!'); 
    }
  }
  render() {
    return (
      <form className="blabs-form pure-form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Start Blabbing..." ref="content" />
        <button type="submit" className="pure-button pure-button-primary">Blab</button>
      </form>
    );
  }
}
