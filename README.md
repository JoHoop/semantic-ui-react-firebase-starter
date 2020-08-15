<img alt="Logo" src="https://semantic-ui.com/images/logo.png" width="100" />

# Semantic UI React starter project with Firebase Auth

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fjohoop%2Fsemantic-ui-react-firebase-starter&c=1)

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/JoHoop/semantic-ui-react-firebase-starter/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/JoHoop/semantic-ui-react-firebase-starter.svg)](https://github.com/JoHoop/semantic-ui-react-firebase-starter/graphs/contributors/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/JoHoop/semantic-ui-react-firebase-starter/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)

![Screenshots](/demo-screenshots/signin-demo.png)

This is a basic web app with boilerplate to get you started with Firebase user authentication with fresh Semantic UI React components.

-   built using [React](https://reactjs.org/)
-   bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
-   styled with [Semantic UI React](https://react.semantic-ui.com/)

You'll get

-   a responsive navbar that collapses on mobile as well as a footer
-   a react-router with public and protected routes and 404 error page
-   lazy loading of componenents once needed with a suspense progress bar and error boundry
-   arrow function components (ES6 syntax)
-   localization / translation with i18next
-   provider for current user object as context to all pages

as well as basic Firebase features for user authentication like

-   Create account
-   Login
-   Login with Google
-   Log out
-   Account page
-   Change username, email, password
-   Verify email
-   Reset password
-   Avatar upload
-   Delete account

## Usage

Feel free to fork this repo and built your project based on it.

If you improve this starter template in any way a pull request would be very much appreciated! ✌️

Start by setting up a project with the Firebase dashboard and adding your credentials to the `.env` file.
Authentication features should work out of the box.
Make sure not to publish your credentials (obviously).

```
## Firebase
REACT_APP_FIREBASE_KEY="AbCDefgHIJklmNOpQrsTUvWxYZ"
REACT_APP_FIREBASE_DOMAIN="project-abCDe.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE="https://project-abCDe.firebaseio.com/"
REACT_APP_FIREBASE_PROJECT_ID="project-abCDe"
REACT_APP_FIREBASE_STORAGE_BUCKET="project-abCDe.appspot.com"
REACT_APP_FIREBASE_SENDER_ID="123456789"
REACT_APP_FIREBASE_APP_ID="1:123456789:web:123456789"
```

## Available Scripts

In the project directory, you can run:

### `npm install`

to install the dependencies.

### `npm start`

to run the app in the development mode at [http://localhost:3000](http://localhost:3000)<br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

![Screenshots](/demo-screenshots/account-demo.png)
![Screenshots](/demo-screenshots/signin-demo.png)
![Screenshots](/demo-screenshots/signup-demo.png)
![Screenshots](/demo-screenshots/reset-demo.png)
![Screenshots](/demo-screenshots/landing-demo.png)
