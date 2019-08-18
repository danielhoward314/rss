import React from 'react';
import styled from 'styled-components';

import CardContent from './CardContent';

const Item = styled.ul`
  background: ${props => props.theme.secondaryBackground};
  border: solid 5px ${props => props.theme.primaryBackground};
  &:hover {
    background: ${props => props.theme.primaryHover};
    border: solid 5px ${props => props.theme.secondaryHover};
    h2 {
      border-bottom: solid 5px ${props => props.theme.secondaryBackground};
    }
    h2, a {
      color: ${props => props.theme.secondaryBackground};
    }
  }
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
  display: flex;
  justify-content: center;
`;

const Header = styled.h2`
  color: ${props => props.theme.primaryBackground};
  border-bottom: solid 5px ${props => props.theme.primaryBackground};
  font-size: 1.5em;
  padding: 0.5em;
  margin-bottom: 0.5em;
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
