import React from 'react';
import styled from 'styled-components';

import CardContent from './CardContent';

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

const Card = ({feed}) => {
  return (
    <Item >
      <FeedHeader>{feed.feedName}</FeedHeader>
      <CardContent feed={feed} />
    </Item>
  );
};

export default Card;
