// /* global describe beforeEach it */

// const {expect} = require('chai');
// const request = require('supertest');
// const db = require('../db');
// const app = require('../index');
// const Feed = db.model('feed');

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true});
//   });

//   describe('/api/feeds/', () => {
//     const feed = {
//       userUuid: 'f28fb4cb-06de-4940-831e-84c1e07d7b',
//       name: 'css',
//       url: 'https://css-tricks.com/feed/'
//     };

//     beforeEach(() => {
//       return Feed.create(feed);
//     });

//     it('GET /api/feeds', async () => {
//       const res = await request(app)
//         .get('/api/feeds')
//         .expect(200);

//       expect(res.body).to.be.an('array');
//       expect(res.body[0].email).to.be.equal(feed);
//     });
//   }); // end describe('/api/feeds')
// }); // end describe('Feed routes')
