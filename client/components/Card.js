import React from 'react';

import CardContent from './CardContent';

const Card = ({feedList}) => {
  return feedList.map((feed) => {
    return <CardContent items={feed.items} />
  });
};

export default Card;
