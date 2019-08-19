/* global describe beforeEach it */

const {expect} = require('chai');
const db = require('../index');
const Feed = db.model('feed');

describe('Feed model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('instanceMethods', () => {
    const feedToCreate = {
      userUuid: 'f28fb4cb-06de-4940-831e-84c1e07d7b',
      name: 'css',
      url: 'https://css-tricks.com/feed/'
    };

    it('can find newly created feed with where predicate', async () => {
      let createdFeed = await Feed.create(feedToCreate);
      const foundByName = await Feed.findOne({
        where: {
          name: createdFeed.name
        },
      });
      const foundByUrl = await Feed.findOne({
        where: {
          name: createdFeed.name
        },
      });
      expect(foundByName.userUuid).to.be.equal(feedToCreate.userUuid);
      expect(foundByName.name).to.be.equal(feedToCreate.name);
      expect(foundByName.url).to.be.equal(feedToCreate.url);
      expect(foundByUrl.userUuid).to.be.equal(feedToCreate.userUuid);
      expect(foundByUrl.name).to.be.equal(feedToCreate.name);
      expect(foundByUrl.url).to.be.equal(feedToCreate.url);
    });
  }); // end describe('instanceMethods')
}); // end describe('User model')
