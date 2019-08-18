import React from 'react';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Link = styled.a`
  color: ${props => props.theme.primaryBackground};
  &:hover {
    color: ${props => props.theme.primaryBackground};
  }
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  margin: 0 1rem 1rem 1rem;
  line-height: 1.6;
`;

const CardContent = ({feed}) => {
  let latestFeed = feed.items.slice(0, 5);
  return latestFeed.map((item) => {
    return (
      <Wrapper key={uuidv4()} >
        <Link href={item.link}>{item.title}</Link>
      </Wrapper>
    );
  });
};

export default CardContent;
