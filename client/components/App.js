import React, { Component } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';
import AddFeed from './AddFeed';

class App extends Component {
  constructor(props){
    super(props);
    let startInt = window.localStorage.getItem('ordinal');
    this.state = {
      ordinal: +startInt || 0,
      url: '',
      feeds: []
    };
    this.parser = new Parser();
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    window.localStorage.setItem(`feed${this.state.ordinal}`, this.state.url);
    window.localStorage.setItem('ordinal', this.state.ordinal);
    try {
      // rss feed
      let currentFeedUrl = window.localStorage.getItem(`feed${this.state.ordinal}`);
      let feed = await this.parser.parseURL(CORS_PROXY + currentFeedUrl);
      this.setState((state) => {
        let nextOrdinal = ++state.ordinal;
        return {
          ordinal: nextOrdinal,
          url: '',
          name: '',
          feeds: [...state.feeds, feed.items]
        };
      });
    } catch (err) {
      console.log(err);
    }
  }


  async componentDidMount() {
    let feedArrayLength = window.localStorage.getItem('ordinal');
    if (feedArrayLength > 0) {
      console.log(`feed array length ${feedArrayLength}`);
      let i = 0;
      while (i <= feedArrayLength) {
            ++i;
      }
    }
  }

  render() {
    console.log(this.state.feeds)
    return (
      <AddFeed handleChange={this.handleChange} handleSubmit={(evt) => this.handleSubmit(evt)} />
    );
  }
}

export default App;
