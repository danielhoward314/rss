import React from 'react';
import { useSelector, connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import Card from './Card';
import Spinner from './Spinner';
import { loadMoreFeeds } from '../store/feed';

const Wrapper = styled.section`
margin: 0 auto auto;
width: 100%;
max-width: '1050px';
padding: 3em 1.5em 2em;
flex-grow: 1;
@media screen and (min-width: 40em) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
`;

const CardContainer = ({onLoadMoreFeeds}) => {
  const feedReducer = useSelector(state => state.feedReducer);
  const feeds = feedReducer.feeds;
  const feedDetails = feedReducer.feedDetails;
  return (
    <InfiniteScroll
        dataLength={feedDetails.length}
        next={() => onLoadMoreFeeds(feeds, feedDetails)}
        hasMore={(feeds.length > feedDetails.length)}
        loader={<Spinner />}
      >
        <Wrapper>
          {feedDetails.map((feed) => {
            return <Card key={uuidv4()} feed={feed} />;
          })}
        </Wrapper>
    </InfiniteScroll>
  );
};


const mapDispatch = (dispatch) => ({
  onLoadMoreFeeds: (feeds, feedDetails) => {
    return dispatch(loadMoreFeeds(feeds, feedDetails));
  }
});

export default connect(null, mapDispatch)(CardContainer);
