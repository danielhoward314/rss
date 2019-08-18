import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import GlobalStyle from './GlobalStyle';
import CardContainer from './CardContainer';
import AddFeed from './AddFeed';
import Spinner from './Spinner';
import InfoMsg from './InfoMsg';
import {
  getFeeds, getFeedDetails, emitLoadStatus, LOAD_CONSTS
} from '../store/feed';

class App extends PureComponent {
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
            <AddFeed props={this.props} userUuid={this.state.userUuid} />
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
            <AddFeed props={this.props} userUuid={this.state.userUuid} />
            <Spinner />
          </Fragment>
        );
    } else if (loadStatus === LOAD_CONSTS.ADDING) {
        return (
          <Fragment>
            <GlobalStyle />
            <AddFeed props={this.props} userUuid={this.state.userUuid} />
            <InfoMsg content={`Fresh display of that new feed comin' right up.`} />
          </Fragment>
        );
    } else if (loadStatus === LOAD_CONSTS.SUCCEEDED) {
      return (
        <Fragment>
          <GlobalStyle />
          <AddFeed props={this.props} userUuid={this.state.userUuid} />
          <CardContainer feedDetails={feedDetails} />
        </Fragment>
      );
    } else if (loadStatus === LOAD_CONSTS.FAILED) {
      return (
        <InfoMsg content={`That url didn't work. Let's reload the page so you can try another.`} />
      );
    } else {
      return (
        <Fragment>
          <GlobalStyle />
          <AddFeed props={this.props} userUuid={this.state.userUuid} />
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
