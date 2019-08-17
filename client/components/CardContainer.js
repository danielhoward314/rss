import React from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import Card from './Card';

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

const CardContainer = ({feedDetails}) => {
  return (
    <Wrapper>
      {feedDetails.map((feed) => {
        return <Card key={uuidv4()} feed={feed} />;
      })}
    </Wrapper>
  );
};

export default CardContainer;
