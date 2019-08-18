import React from 'react';
import styled from 'styled-components';

import CardContent from './CardContent';

const Item = styled.ul`
  background-color: ${props => props.theme.primaryBackground};
  border: solid 1px ${props => props.theme.primaryBackground};
  ::placeholder {
    color: silver;
  }
  &:hover {
    background: ${props => props.theme.secondaryHover};
    border: solid 1px ${props => props.theme.secondaryBackground};
    color: white;
    ::placeholder {
      color: white;
    }
  }
  z-index: 10;
  border-radius: 4px;
  border-radius: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
  @media screen and (min-width: 40em) {
    flex: 0 1 calc(32% - 1em);
  }
`;

const Wrapper = styled.div`
`;

const Header = styled.h2`
  font-size: 1.5em;
  padding: 1em;
  align-self: center;
`;

const Card = ({feed}) => {
  return (
    <Item >
      <Wrapper>
        <Header>{feed.feedName}</Header>
      </Wrapper>
      <CardContent feed={feed} />
    </Item>
  );
};

export default Card;
