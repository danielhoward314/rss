import React from 'react';
import styled from 'styled-components';

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
`

// const Item = styled.ul`
//   position: relative;
  // border: 1px solid blue;
  // border-radius: 2px;
//   margin: 0 0 1em 0;
//   width: 100%;
//   transition: background 0.2s;
//   @media screen and (min-width: 40em) {
//     flex: 0 1 calc(32% - 1em);
//   }
//   &:hover {
//     background: palevioletred;
//   }
//   a {
//     display: flex;
//     flex-flow: column;
//     height: 100%;
//     width: 100%;
//     color: blue;
//     text-decoration: none;
//   }
// `;

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
    <Wrapper>
      <Item>
      {items.map((item) => {
        return (
          <li>
            <Title>{item.title}</Title>
            <Headline>Headline here</Headline>
            <a to='google.com'>Url here</a>
          </li>
        )
      })}
      </Item>
    </Wrapper>
  );
};

export default CardContent;
