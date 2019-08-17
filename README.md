Clone the repo
Open up a terminal, cd into the repo and run `npm install`
Create environment variable and two postgres databases with these three commands in terminal (MY_APP_NAME should match the name parameter in package.json):
  export MY_APP_NAME=<name-param-in-package-json>
  createdb $MY_APP_NAME
  createdb $MY_APP_NAME-test
From terminal run `npm run start-dev`
Open up a browser and go to `http://localhost:8080/`
