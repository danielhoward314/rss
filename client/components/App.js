import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import GlobalStyle from './GlobalStyle';
import CardContainer from './CardContainer';
import AddFeed from './AddFeed';
import InfoMsg from './InfoMsg';
import Spinner from './Spinner';
import {
  getFeeds, getFeedDetails, emitLoadStatus, LOAD_CONSTS
} from '../store/feed';

function App({ onGetFeeds }) {
  // initializing user from localStorage or with defaults
  const keyConst = 'univisionRssUuid';
  let userInit = null;
  if (window.localStorage.getItem(keyConst) === null) {
    userInit = uuidv4();
    window.localStorage.setItem(keyConst, userInit);
  } else {
      userInit = window.localStorage.getItem(keyConst);
  }
  // setting state with initialized user
  const [userUuid, setUserUuid] = useState(userInit);
  // react-redux hook that provides mapState functionality while playing nice with react hooks
  const feedReducer = useSelector(state => state.feedReducer);
  let feeds = feedReducer.feeds;
  let feedDetails = feedReducer.details
  let loadStatus = feedReducer.loadStatus
  // useEffect is like componentDidMount, but not really: https://overreacted.io/a-complete-guide-to-useeffect/
  // second arg is a dependency that determines whether to fire useEffect for a given render
  useEffect(() => {
    onGetFeeds(userUuid)
  }, [feedDetails]);

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
          <AddFeed userUuid={userUuid} />
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
          <AddFeed userUuid={userUuid} />
          <Spinner />
        </Fragment>
      );
  } else if (loadStatus === LOAD_CONSTS.ADDING) {
      return (
        <Fragment>
          <GlobalStyle />
          <AddFeed userUuid={userUuid} />
          <InfoMsg content={`Fresh display of that new feed comin' right up.`} />
        </Fragment>
      );
  } else if (loadStatus === LOAD_CONSTS.SUCCEEDED) {
    return (
      <Fragment>
        <GlobalStyle />
        <AddFeed userUuid={userUuid} />
        <CardContainer feedDetails={feedDetails} />
      </Fragment>
    );
  } else if ((loadStatus === LOAD_CONSTS.FAILED) || (loadStatus === LOAD_CONSTS.DUPLICATE)) {
    return (
      <InfoMsg content={`That url didn't work. Either it's a bum feed or you've already got it. Let's bring you home so you can try another.`} />
    );
  } else {
    return (
      <Fragment>
        <GlobalStyle />
        <AddFeed userUuid={userUuid} />
        <InfoMsg
        content={`Looks like you don't have any feeds yet.
        Add some rss feeds and give them nicknames.`}
        />
      </Fragment>
    );
  }
}

const mapState = ({ feedReducer }) => ({
  loadStatus: feedReducer.loadStatus,
  feeds: feedReducer.feeds,
  feedDetails: feedReducer.feedDetails
});

const mapDispatch = (dispatch) => ({
  onGetFeeds: (uuid) => {
    dispatch(emitLoadStatus(LOAD_CONSTS.REQUESTED));
    dispatch(getFeeds(uuid)).then(async action => {
      if (!action.feeds.length) {
        await dispatch(emitLoadStatus(LOAD_CONSTS.NO_DATA));
        return action;
      }
      try {
        await dispatch(getFeedDetails(action.feeds));
        dispatch(emitLoadStatus(LOAD_CONSTS.SUCCEEDED));
      } catch (err) {
          console.error(err);
          dispatch(emitLoadStatus(LOAD_CONSTS.FAILED));
      }
    });
  }
});

export default connect(mapState, mapDispatch)(App);
