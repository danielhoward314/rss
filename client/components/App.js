import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import GlobalStyle from './GlobalStyle';
import Container from './Container';
import Card from './Card';
import AddFeed from './AddFeed';
import Spinner from './Spinner';
import InfoMsg from './InfoMsg';
import feed, {
  getFeeds, getFeedDetails, getUpdatedTuple, emitLoadStatus, LOAD_CONSTS
} from '../store/feed';

class App extends Component {
  constructor(props) {
    super(props);
    // initializing user either from localStorage or with defaults
    const keyConst = 'univisionRssUuid';
    let userUuid = null;
    if (window.localStorage.getItem(keyConst) === null) {
      userUuid = uuidv4();
    } else {
        userUuid = window.localStorage.getItem(keyConst);
    }
    this.state = {
      userUuid
    };
  }

  componentDidMount() {
    return this.props.onGetFeeds(this.state.userUuid, this.props.rangeTuple);
  }

  render() {
    let { feeds, feedDetails, loadStatus } = this.props;
    console.log('feedDetails in App')
    console.log(feedDetails)
    if (loadStatus === LOAD_CONSTS.UNASKED) {
        return (
          <Fragment>
            <GlobalStyle />
            <InfoMsg
            content="Welcome to the RSS feed app by Daniel Howard."
            />
          </Fragment>
        );
    } else if (!feeds.length && (loadStatus === LOAD_CONSTS.NO_DATA)) {
        return (
          <Fragment>
            <GlobalStyle />
            <AddFeed userUuid={this.state.userUuid} />
            <InfoMsg
            content={`Looks like you don't have any feeds yet.
            Add some rss feeds and give them nicknames.`}
            />
          </Fragment>
        );
    } else if (loadStatus === LOAD_CONSTS.REQUESTED) {
        return (
          <Fragment>
            <GlobalStyle />
            <AddFeed userUuid={this.state.userUuid} />
            <Spinner />
          </Fragment>
        );
    } else if (loadStatus === LOAD_CONSTS.ADDING) {
        return (
          <Fragment>
            <GlobalStyle />
            <AddFeed userUuid={this.state.userUuid} />
            <InfoMsg content="Adding to your feeds" />
          </Fragment>
        );
    } else if (loadStatus === LOAD_CONSTS.SUCCEEDED) {
      return (
        <Fragment>
          <GlobalStyle />
          <AddFeed userUuid={this.state.userUuid} />
          {feedDetails.map((feedList) => {
            return <Card feedList={feedList} />
          })}
        </Fragment>
      );
    } else if (loadStatus === LOAD_CONSTS.FAILED) {
      return (
        <InfoMsg content='Something went wrong...' />
      );
    } else {
      return (
        <Fragment>
          <GlobalStyle />
          <AddFeed userUuid={this.state.userUuid} />
          <InfoMsg
          content={`Looks like you don't have any feeds yet.
          Add some rss feeds and give them nicknames.`}
          />
        </Fragment>
      );
    }
  }
}

const mapState = ({ feedReducer }) => ({
  loadStatus: feedReducer.loadStatus,
  rangeTuple: feedReducer.rangeTuple,
  feeds: feedReducer.feeds,
  feedDetails: feedReducer.feedDetails
});

const mapDispatch = (dispatch) => ({
  onGetFeeds: (uuid, rangeTuple) => {
    dispatch(emitLoadStatus(LOAD_CONSTS.REQUESTED));
    dispatch(getFeeds(uuid)).then(async action => {
      if (!action.feeds.length) {
        await dispatch(emitLoadStatus(LOAD_CONSTS.NO_DATA));
        return action;
      }
      try {
        await dispatch(getFeedDetails(action.feeds, rangeTuple));
        dispatch(emitLoadStatus(LOAD_CONSTS.SUCCEEDED));
      } catch (err) {
          console.error(err);
          dispatch(emitLoadStatus(LOAD_CONSTS.FAILED));
      }
    });
  }
});

export default connect(mapState, mapDispatch)(App);
