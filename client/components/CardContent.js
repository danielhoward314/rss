import React from 'react';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';

const LinkRow = styled.li`
  padding: 0.5em;
`;

const Link = styled.a`
  color: black;
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
  let latestFeed = feed.items.slice(0, 14);
  return latestFeed.map((item) => {
    return (
      <LinkRow key={uuidv4()}>
        <Link href={item.link}>{item.title}</Link>
      </LinkRow>
    );
  });
};

export default CardContent;
