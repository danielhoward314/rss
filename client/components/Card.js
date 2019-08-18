import React, { useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import CardContent from './CardContent';
import { loadMoreFeeds, getFeedDetails } from '../store/feed';

const Item = styled.ul`
  border-radius: 4px;
  border: 1px solid palevioletred;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  &:hover {
    background: palevioletred;
  }
  transition: background 0.2s;
  @media screen and (min-width: 40em) {
    flex: 0 1 calc(32% - 1em);
  }
`;

const FeedHeader = styled.h2`
  padding: 1em;
  align-self: center;
`;

const Card = ({feed, onLoadMoreFeeds}) => {
  const feedReducer = useSelector(state => state.feedReducer);
  const feeds = feedReducer.feeds;
  const feedDetails = feedReducer.feedDetails;
  const [isFetching, setIsFetching] = useState(false);

  function handleScroll() {
    console.log()
    console.log(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  function debouncedHandleScroll() {
    console.log('fired')
    return debounce(handleScroll(), 3000);
  }

  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    setTimeout(onLoadMoreFeeds(feeds, feedDetails, getFeedDetails.length), 500);
    setIsFetching(false);
  }, [isFetching]);

  return (
    <Item >
      <FeedHeader>{feed.feedName}</FeedHeader>
      <CardContent feed={feed} />
    </Item>
  );
};

const mapDispatch = (dispatch) => ({
  onLoadMoreFeeds: async (feeds, feedDetails, sliceStart) => {
    await dispatch(loadMoreFeeds(feeds, feedDetails, sliceStart));
  }
});

export default connect(null, mapDispatch)(Card);
