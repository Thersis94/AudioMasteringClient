This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## AI Audio Client

Live Page: https://aiaudio.now.sh/home

## API DOCUMENTATION

Setting Up

    Install dependencies: npm install
    Create development and test databases: createdb PLACEHOLDER_DB, createdb PLACEHOLDER_DB_TEST
    Create database user: createuser USER_PLACEHOLDER
    Grant privileges to new user in psql:
        GRANT ALL PRIVILEGES ON DATABASE "PLACEHOLDER_DB" TO "USER_PLACEHOLDER";
        GRANT ALL PRIVILEGES ON DATABASE "PLACEHOLDER_test" TO "PLACEHOLDER_TEST";
    Prepare environment file: cp example.env .env
    Replace values in .env with your custom values.
    Bootstrap development database: npm run migrate
    Bootstrap test database: npm run migrate:test

Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

    Locate the postgresql.conf file for your Postgres installation.
        OS X, Homebrew: /usr/local/var/postgres/postgresql.conf
    Uncomment the timezone line and set it to UTC as follows:

# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone

Sample Data

    To seed the database for development: psql -U USER_PLACEHOLDER -d PLACEHOLDER_DB -a -f seeds/seed.PLACEHOLDER_TABLES.sql
    To clear seed data: psql -U USER_PLACEHOLDER -d PLACEHOLDER_DB -a -f seeds/trunc.PLACEHOLDER_TABLES.sql
    To seed Heroku with data (replace postgres URL with your Heroku URI): psql -U USER_PLACEHOLDER -d postgres://ncfuvjkvpxjvsj:4d58e0f44dfdddf5a82636b4155c7adfe6c25b12a8b517bcf712b64b70be3e7a@ec2-174-129-255-37.compute-1.amazonaws.com:5432/d5vd5fdg9njarh -a -f seeds/seed.PLACEHOLDER_TABLES.sql

Scripts

    Start application for development: npm run dev
    Run tests: npm test

Endpoints

User Endpoints

Post /api/users
Requires password and username in the request body.

Auth Endpoints

Post /api/auth
Requires password and username in the request body.

Audio Endpoints

Post /api/audio-master
Requires user_name as header. Setup to recieve files as blobs.

Get /api/audio-master
Requires user_name as header. Returns a list of persisted tracks for that user.

Return Download link /api/audio-master
Requires user_name and track_name as headers.

Delete /api/audio-master
Requires user_name and track_name as headers.

## Screen Shots
Landing Page
![Alt text](https://raw.githubusercontent.com/Thersis94/AudioMasteringClient/master/Pictures/ReadmeScreenshots/LandingPage.PNG "LandingPage")
User Home Page
![Alt text](https://raw.githubusercontent.com/Thersis94/AudioMasteringClient/master/Pictures/ReadmeScreenshots/HomePage.PNG "HomePage")
Mastering Page
![Alt text](https://raw.githubusercontent.com/Thersis94/AudioMasteringClient/master/Pictures/ReadmeScreenshots/MasteringPage.PNG "MasteringPage")

## Summary Section
AI Audio strives to make mastering services accessable to musicians by using AI to master their songs.

Mastering is the final process that music undergoes before being published. We use mastering to ensure that your songs sound the same in every listening environment. In short, mastering takes WAV files and equalizes, compresses, limits, and enhances the sound across different environments.

AI Audio uses a combination of Equalization, Stereo Polarization, and Limiting to match the heatmap of your song to the average heatmaps of thousands of industry standard songs.


## Technologies Used

This app was developed using the React library.

Some of the technologies that are being utalized are HTML, CSS, JSX, and React Context.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
