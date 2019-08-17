import React from 'react';
import styled from 'styled-components';
import CardContent from './CardContent';

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

const Card = ({feedList}) => {
  return (
    <Wrapper>
      {
         feedList.map((feed, idx) => {
          return <CardContent key={idx} items={feed.items} />;
        })
      }
    </Wrapper>
  );
};

export default Card;
