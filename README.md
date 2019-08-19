# Univision RSS Feed
## Created by Daniel Howard

Instructions for installing and running the code:

1. Clone the repo
2. `cd` into the repo and run `npm install`
3. Create environment variable and two postgres databases with these three commands in terminal (MY_APP_NAME should match the name parameter in package.json):
\* export MY_APP_NAME=<name-param-in-package-json>
\* createdb $MY_APP_NAME
\* createdb $MY_APP_NAME-test
4. From terminal run `npm run start-dev`
5. Open up a browser and go to http://localhost:8080/

[This link has a lot of urls to test] (https://feed.mikle.com/support/rss-feed-sources-online-news-sites/)

If you're on a Mac, you can head right over to http://postgresapp.com/ and follow the instructions there to get a full-featured installation of postgres, including the psql command line tool. Be sure to follow the set up your $PATH link and follow the instructions there. Note that if you need to update your shell profile, bash uses ~/.bash_profile and zsh uses ~/.zshrc.

React version must be 16.9 or less. Version 17 has breaking changes for deprecated life cycle hooks.
I don't use any of the deprecated hooks, but the infinite scroll npm package used here does use a
deprecated life cycle method.
