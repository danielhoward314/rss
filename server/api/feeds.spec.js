/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Feed = db.model('feed');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/feeds/', () => {
    const feed = {
      userUuid: 'f28fb4cb-06de-4940-831e-84c1e07d7b',
      name: 'css',
      url: 'https://css-tricks.com/feed/'
    };

    beforeEach(() => {
      return Feed.create(feed);
    });

    it('GET /api/feeds/:id', async () => {
      const res = await request(app)
        .get(`/api/feeds/${feed.userUuid}`)
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].userUuid).to.be.equal(feed.userUuid);
      expect(res.body[0].name).to.be.equal(feed.name);
      expect(res.body[0].url).to.be.equal(feed.url);
    });

    it('POST /api/feeds/', async () => {
      const newFeed = {
        userUuid: 'dkdsklwocxckl',
        name: 'git hub',
        url: 'http://github-trends.ryotarai.info/rss/github_trends_javascript_daily.rss'
      };
      const res = await request(app)
        .post('/api/feeds/')
        .type('json')
        .send(newFeed)
        .expect(200);

      expect(res.body.userUuid).to.be.equal(newFeed.userUuid);
      expect(res.body.name).to.be.equal(newFeed.name);
      expect(res.body.url).to.be.equal(newFeed.url);
    });
  }); // end describe('/api/feeds')
}); // end describe('Feed routes')
