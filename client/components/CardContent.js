import React from 'react';
import styled from 'styled-components';

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

const Title = styled.h2`
margin-top: 0;
margin-bottom: 6px;
font-weight: 400;
font-size: 16px;
letter-spacing: 0.4px;
`;

const Headline = styled.p`
  margin: 0 1rem 1rem 1rem;
  line-height: 1.6;
`;

const CardContent = ({items}) => {
  return (
    <Item>
    {items.map((item, idx) => {
      return (
        <li key={idx}>
          <Title>{item.title}</Title>
          <Headline>Headline here</Headline>
          <a to='google.com'>Url here</a>
        </li>
      );
    })}
    </Item>
);
};

export default CardContent;
