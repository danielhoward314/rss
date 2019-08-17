import axios from 'axios';
import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
export const LOAD_CONSTS = {
  UNASKED: 'UNASKED',
  REQUESTED: 'REQUESTED',
  SUCCEEDED: 'SUCCEEDED',
  ADDING: 'ADDING',
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
  feedDetails: [],
  rangeTuple: [0, 6]
};

/**
 * ACTION TYPES
 */
const EMIT_LOAD_STATUS = 'EMIT_LOAD_STATUS';
const GET_FEEDS = 'GET_FEEDS';
const ADD_FEED = 'ADD_FEED';
const GET_FEED_DETAILS = 'GET_FEED_DETAILS';
const UPDATE_RANGE_TUPLE = 'UPDATE_RANGE_TUPLE';
/**
 * ACTION CREATORS
 */
const emittedLoadStatus = loadStatus => ({type: EMIT_LOAD_STATUS, loadStatus});
const gotFeeds = feeds => ({type: GET_FEEDS, feeds});
const addedFeed = feed => ({type: ADD_FEED, feed});
const gotFeedDetails = feedDetails => ({type: GET_FEED_DETAILS, feedDetails});
const gotUpdatedTuple = updatedTuple => ({type: UPDATE_RANGE_TUPLE, updatedTuple});
/**
 * THUNK CREATORS
 */
export const emitLoadStatus = loadStatus => dispatch => {
  return dispatch(emittedLoadStatus(loadStatus));
};

export const getFeedDetails = (feedsArr, rangeTuple) => async dispatch => {
  try {
    let rangedFeedsArr = feedsArr.slice(rangeTuple[0], rangeTuple[1]);
    let feedPromisesArr = rangedFeedsArr.map(async (feed) => {
      let rssJson = await parser.parseURL(CORS_PROXY + feed.url);
      return rssJson;
    });
    let feedDetailsArr = await Promise.all(feedPromisesArr);
    return dispatch(gotFeedDetails(feedDetailsArr));
  } catch (err) {
    console.error(err);
  }
};

export const getUpdatedTuple = (tuple) => dispatch => {
  try {
    let updatedTuple = [
      (6 + tuple[0]),
      (6 + tuple[1])
    ];
    return dispatch(gotUpdatedTuple(updatedTuple));
  } catch (err) {
    console.error(err);
  }
};

export const getFeeds = (uuid) => async dispatch => {
  try {
    const res = await axios.get(`/api/feeds/${uuid}`);
    return dispatch(gotFeeds(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addFeed = (uuid, name, url) => dispatch => {
  try {
    parser.parseURL((CORS_PROXY + url), async (err) => {
      if (!err) {
        let feedObj = { userUuid: uuid, name, url };
        const res = await axios.post('/api/feeds', feedObj);
        await dispatch(addedFeed(res.data));
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
        feedDetails: [...state.feedDetails, action.feedDetails]
      };
    }
    case UPDATE_RANGE_TUPLE: {
      return {
        ...state,
        rangeTuple: action.updatedTuple
      };
    }
    default:
      return state;
  }
}
