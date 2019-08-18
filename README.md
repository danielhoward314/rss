Clone the repo
Open up a terminal, cd into the repo and run `npm install`
Create environment variable and two postgres databases with these three commands in terminal (MY_APP_NAME should match the name parameter in package.json):
  export MY_APP_NAME=<name-param-in-package-json>
  createdb $MY_APP_NAME
  createdb $MY_APP_NAME-test
From terminal run `npm run start-dev`
Open up a browser and go to `http://localhost:8080/`

This link has a lot of urls to test https://feed.mikle.com/support/rss-feed-sources-online-news-sites/

React version must be 16.9 or less. Version 17 has breaking changes for deprecated life cycle hooks.
I don't use any of the deprecated hooks, but the infinite scroll npm package used here does use a
deprecated life cycle method.
