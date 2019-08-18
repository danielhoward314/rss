import axios from 'axios';
import Parser from 'rss-parser';

import hasDuplicateValue from '../util/hasDuplicateValue';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
export const LOAD_CONSTS = {
  UNASKED: 'UNASKED',
  REQUESTED: 'REQUESTED',
  SUCCEEDED: 'SUCCEEDED',
  ADDING: 'ADDING',
  DUPLICATE: 'DUPLICATE',
  FAILED: 'FAILED',
  NO_DATA: 'NO_DATA'
};
let parser = new Parser({ timeout: 6000 });
/**
 * INITIAL STATE
 */
const defaultState = {
  loadStatus: LOAD_CONSTS.UNASKED,
  feeds: [],
  feedDetails: []
};

/**
 * ACTION TYPES
 */
const EMIT_LOAD_STATUS = 'EMIT_LOAD_STATUS';
const GET_FEEDS = 'GET_FEEDS';
const ADD_FEED = 'ADD_FEED';
const GET_FEED_DETAILS = 'GET_FEED_DETAILS';
const LOAD_MORE_FEEDS = 'LOAD_MORE_FEEDS';
/**
 * ACTION CREATORS
 */
const emittedLoadStatus = loadStatus => ({type: EMIT_LOAD_STATUS, loadStatus});
const gotFeeds = feeds => ({type: GET_FEEDS, feeds});
const addedFeed = feed => ({type: ADD_FEED, feed});
const gotFeedDetails = feedDetails => ({type: GET_FEED_DETAILS, feedDetails});
const loadedMoreFeeds = feedDetails => ({type: LOAD_MORE_FEEDS, feedDetails});
/**
 * THUNK CREATORS
 */
export const emitLoadStatus = loadStatus => dispatch => {
  return dispatch(emittedLoadStatus(loadStatus));
};

export const getFeeds = (uuid) => async dispatch => {
  try {
    const res = await axios.get(`/api/feeds/${uuid}`);
    return dispatch(gotFeeds(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const getFeedDetails = (feedsArr) => async dispatch => {
  try {
    let rangedFeedsArr = feedsArr.slice(0, 6);
    let feedPromisesArr = rangedFeedsArr.map(async (feed) => {
      let rssJson = await parser.parseURL(CORS_PROXY + feed.url);
      let feedNameProp = {feedName: feed.name};
      let mergedJson = Object.assign(feedNameProp, rssJson);
      return mergedJson;
    });
    let feedDetailsArr = await Promise.all(feedPromisesArr);
    return dispatch(gotFeedDetails(feedDetailsArr));
  } catch (err) {
    console.error(err);
  }
};

export const loadMoreFeeds = (feeds, feedDetails) => async dispatch => {
  try {
    let sliceStart = feedDetails.length;
    let sliceEnd = (sliceStart + 3);
    let rangedFeedsArr = feeds.slice(sliceStart, sliceEnd);
    if (rangedFeedsArr.length) {
      let feedPromisesArr = rangedFeedsArr.map(async (feed) => {
        let rssJson = await parser.parseURL(CORS_PROXY + feed.url);
        let feedNameProp = {feedName: feed.name};
        let mergedJson = Object.assign(feedNameProp, rssJson);
        return mergedJson;
      });
      let feedDetailsArr = await Promise.all(feedPromisesArr);
      return dispatch(loadedMoreFeeds(feedDetailsArr));
    } else {
        return dispatch(loadedMoreFeeds([]));
    }
  } catch (err) {
    console.error(err);
  }
};

export const addFeed = (uuid, name, url, feeds) => async dispatch => {
  await dispatch(emitLoadStatus(LOAD_CONSTS.ADDING));
  let feedObj = { userUuid: uuid, name, url };
  let isDuplicate = hasDuplicateValue('url', feeds, feedObj);
  if (isDuplicate) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    return dispatch(emitLoadStatus(LOAD_CONSTS.DUPLICATE));
  }
  try {
    parser.parseURL((CORS_PROXY + url), async (err) => {
      if (!err) {
        const res = await axios.post('/api/feeds', feedObj);
        await dispatch(addedFeed(res.data));
        await dispatch(getFeeds(uuid)).then(async (action) => {
          try {
            await dispatch(getFeedDetails(action.feeds));
            await dispatch(emitLoadStatus(LOAD_CONSTS.SUCCEEDED));
          } catch (error) {
              console.error(error);
              await dispatch(emitLoadStatus(LOAD_CONSTS.FAILED));
          }
        });
      } else {
          await dispatch(emitLoadStatus(LOAD_CONSTS.FAILED));
          setTimeout(() => {
            window.location.reload();
          }, 3000);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case EMIT_LOAD_STATUS: {
      return {
        ...state,
        loadStatus: action.loadStatus
      };
    }
    case GET_FEEDS: {
      return {
        ...state,
        feeds: action.feeds
      };
    }
    case ADD_FEED: {
      return {
        ...state,
        feeds: [...state.feeds, action.feed]
      };
    }
    case GET_FEED_DETAILS: {
      return {
        ...state,
        feedDetails: action.feedDetails
      };
    }
    case LOAD_MORE_FEEDS: {
      return {
        ...state,
        feedDetails: state.feedDetails.concat(action.feedDetails)
      };
    }
    default:
      return state;
  }
}
