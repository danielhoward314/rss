
/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CardContainer from './CardContainer';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('CardContainer', () => {
  const userUuid = 'f28fb4cb-06de-4940-831';
  const feedDetails = [
    {
    name: 'sports',
    url: 'http://www.si.com/rss/si_topstories.rss',
    userUuid
   },
   {
    name: 'tech world',
    url: 'https://www.techworld.com/news/rss',
    userUuid
   }
  ];
  it('renders the email in an h3', () => {
    const wrapper = shallow(<CardContainer feedDetails={feedDetails} />);
    expect(wrapper.find('ul').children()).to.have.lengthOf(feedDetails.length);
  });
});
