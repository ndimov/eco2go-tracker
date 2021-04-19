# Synopsis

Use facial recognition and dynamic leaderboards to improve the use of resuable Eco2Go Boxes on WashU's Campus.

[This project](https://devpost.com/software/eco2go-tracker/) won the best Environment & Sustainability hack at [Hacktech 2021](https://hacktech2021.devpost.com/).

# Project Details
## Inspiration
WashU Dining offers reusable Eco2Go containers, which are a great alternative to disposable plastic ones. They have many benefits for the environment. A promotion for Earth Day gives students a free meal for every 10 Eco2Go containers they return, but this is tracked by punch cards which take a long time to fill out and are an antiquated solution. We thought there was a better way to track returns on Eco2Go containers while also encouraging people to use them throughout the school year as much as possible.

## What it does
Eco2Go Tracker offers a convenient input panel for the hospitality coordinators to track students' return of these boxes. They can take a picture of a student and quickly associate it with a student ID and name to log a return via facial recognition. It is also possible to input a student ID directly.

This website also encourages students to return more boxes. Students can compete to be on the top of the leaderboard for who returned the most Eco2Go boxes. They can also see a history of recent entries, showing how popular and convenient Eco2Go boxes are.

## How we built it
The front-end is built in React. It interfaces with Firebase, using a Cloud Firestore to store data as well as Cloud Functions to update the leaderboard server-side whenever a new entry is logged. We use a tensorflow-js wrapper for our computer vision component to recognize faces and use Firebase Cloud Storage to associate them with student IDs.

## Challenges we ran into
We ran into some trouble getting our models to a well-performing state. We also had some trouble with the Firebase integration, and spent some time grappling with unfamiliar APIs. Dealing with asynchronous computations in JavaScript was one of our biggest pitfalls.

## Accomplishments that we're proud of  
We're most proud of how our project is set up to interface well with university systems through design choices like identifying students by ID instead of name. We're also proud of learning so much about these APIs in such a short time span when we didn't know anything about them before this hackathon.

## What we learned
We learned quite a bit about React and Firebase integrations. We also gained some experience in deploying computer vision models in the browser.

## What's next for Eco2Go Tracker
With some feature improvements, this is something we'd like to see used by our university to better implement our Eco2Go box program and help improve sustainable recycling across the WashU campus.

# Build and Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

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
