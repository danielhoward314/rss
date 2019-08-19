/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import Parser from 'rss-parser';

import feedReducer, {
  LOAD_CONSTS, EMIT_LOAD_STATUS, GET_FEEDS, ADD_FEED, GET_FEED_DETAILS, LOAD_MORE_FEEDS, emittedLoadStatus,gotFeeds, gotFeedDetails, addedFeed, loadedMoreFeeds, emitLoadStatus, getFeeds, getFeedDetails, addFeed, loadMoreFeeds
} from './feed';
import hasDuplicateValue from '../util/hasDuplicateValue';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
let parser = new Parser({ timeout: 6000 });

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {
    loadStatus: LOAD_CONSTS.UNASKED,
    feeds: [],
    feedDetails: []
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('initializer behavior, gotFeeds, gotFeedDetails and ', () => {
    it('starts with an initital state of empty feeds, feedDetails and loadStatus: unasked', () => {
      const newState = feedReducer(undefined, '@@INIT');
      expect(newState).to.deep.equal(initialState);
    });
    it('puts feeds onto state when gotFeeds action is dispatched', async () => {
      const userUuid = 'f28fb4cb-06de-4940-831';
      const feeds = [
        {
        name: 'sports',
        url: 'http://www.si.com/rss/si_topstories.rss',
        userUuid
       },
       {
        name: 'tech world',
        url: 'https://www.techworld.com/news/rss',
        userUuid
       }
      ];
      const newState = feedReducer(initialState, gotFeeds(feeds));
      expect(newState.feeds).to.deep.equal(feeds);

      await store.dispatch(emitLoadStatus(LOAD_CONSTS.SUCCEEDED));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal(EMIT_LOAD_STATUS);
      expect(actions[0].loadStatus).to.be.equal(LOAD_CONSTS.SUCCEEDED);
     });
     it('adds feeds to state when addFeed action is dispatched', async () => {
      const userUuid = 'f28fb4cb-06de-4940-831';
      const feedToAdd = {
        name: 'sports',
        url: 'http://www.si.com/rss/si_topstories.rss',
        userUuid
       };
      mockAxios.onPost('/api/feeds').replyOnce(200, feedToAdd);
      await store.dispatch(addedFeed(feedToAdd));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal(ADD_FEED);
      expect(actions[0].feed).to.be.deep.equal(feedToAdd);
    });
  });
});
