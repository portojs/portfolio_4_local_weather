import React from 'react';

export default class WeatherInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchItem: ''
    };
  }

  componentWillMount() {
    this.setState({searchItem: this.props.cityName});
  }
  // componentDidMount() {
  //   console.log('this.props.cityName: ' + this.props.cityName);
  //   this.setState({searchItem: this.props.cityName});
  // }

  handleChange(city) {
    this.setState({searchItem: city});
  }

  handleSubmit(event) {
    let city = this.state.searchItem;

    event.preventDefault();
    this.props.submitSearch(city);
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
