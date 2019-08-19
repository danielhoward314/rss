# Univision RSS Feed
## Created by Daniel Howard

The code is deployed [here](https://univision-rss.herokuapp.com/)

Instructions for installing and running the code locally:

1. Clone the repo
2. `cd` into the repo and run `npm install`
3. Create environment variable and two postgres databases with these three commands in terminal (MY_APP_NAME should match the name parameter in package.json):
    * export MY_APP_NAME=<name-param-in-package-json>
    * createdb $MY_APP_NAME
    * createdb $MY_APP_NAME-test
4. From terminal run `npm run start-dev`.
5. Open up a browser and go to http://localhost:8080/
6. Run tests with `npm run test`.


Instructions for using the deploy script:

1.Set up the Heroku command line tools.
2. Run `heroku login` and enter your credentials (or set them up if you don't have them).
3. run `heroku create <MY_APP_NAME>`.
4. run `heroku addons:create heroku-postgresql:hobby-dev' to provision a postgres database to your heroku dyno. you can also do this through the heroku ui.

TEST IT OUT!

Find lots of urls to test [here](https://feed.mikle.com/support/rss-feed-sources-online-news-sites/)

Postgres installation instructions [here](http://postgresapp.com/). A full-featured installation of postgres that includes the psql command line tool is what allows us to run the `createdb` command above. Be sure to follow the set up your $PATH link and follow the instructions there. You may need to update your shell profile.

NOTE ABOUT REACT VERSION DEPENDENCY:
React version must be 16.9 or less. Version 17 has breaking changes for deprecated life cycle hooks.
I don't use any of the deprecated hooks, but the infinite scroll npm package used here does use a
deprecated life cycle method.

Should you face a ownership problem with the deploy, script:
1. cd into the script directory.
2. run this command `chmod 755 deploy`

Should you get this error...

> error: insufficient permission for adding an object to repository database .git/objects

...this [article](https://medium.com/@darkrubyist/how-to-fix-git-push-error-insufficient-permission-for-adding-an-object-to-repository-database-git-53d7dc9649e2) gives a one command fix
