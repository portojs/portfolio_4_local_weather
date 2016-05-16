import React from 'react';

export default class WeatherInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: ''
    };
  }

  handleChange(city) {
    this.setState({searchItem: city});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitSearch(this.state.searchItem);
  }

  render() {
    return (
      <form id="input" role="form" name="search-form" onSubmit={event => this.handleSubmit(event)}>
        <input id="input-field" type="text" placeholder="Enter city here" value={this.state.searchItem} onChange={event => this.handleChange(event.target.value)}></input>
        <button id="input-button" type="submit"><i className="fa fa-search fa-flip-horizontal"></i></button>
      </form>
    );
  }
}
