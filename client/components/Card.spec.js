
/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './Card';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Card', () => {

  it('renders the title in an h2', () => {
    const userUuid = 'f28fb4cb-06de-4940-831';
    const feed = {
      name: 'sports',
      url: 'http://www.si.com/rss/si_topstories.rss',
      userUuid
     };
    const card = shallow(
      <Card feed={feed} />
    ).dive();
    expect(card.find('h2').text()).toEqual('sports');
  });
});
