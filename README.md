# PTS-WebApp
PlacesToStay, a website which allows users to look up information on places they might want to stay whilst away, such as hotels, bed and breakfasts, and hostels. Required to build PlacesToStay using Node and Express as the back-end technology, and  SQLite for the database.

This is a React project created from scratch using npm to install dependencies, Webpack to build, and Babel for transpilation. Formerly, the recommended way of creating a React app was with `create-react-app` which automatically downloads dependencies and writes build scripts for you. However `create-react-app` is no longer maintained and therefore its use is not recommended. It still works, but it may break in the future.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone this repository to your local machine:

git clone [https://github.com/JoatXI/PTS-WebApp.git](https://github.com/JoatXI/PTS-WebApp.git)

2. Navigate to the project directory:

cd PTS-WebApp
   
4. Install dependencies:

### `npm install`

To build the project, run:

### `npm run build`

This will generate the bundled JavaScript file in the public/dist directory.

## Development

Using Webpack to build, you can run the project in development mode. This will start a development server and automatically reload the page when changes are made:

### `npx webpack --watch`

## REST API

The application server-side functionalities are carried out using the REST API created with Node. To access the application through http://localhost:3000 on your browser the node server should be started using:

### `node app.mjs`

Alternatively install pm2 using: `npm install pm2` this installs pm2 in your computer. Then to start the server on live mode:

### `pm2 start app.mjs --watch`

## Required Dependencies

### React

A JavaScript library for building user interfaces.

###React DOM

Provides DOM-specific methods that can be used at the top level of a web app to enable React components.

### Express

Fast, unopinionated, minimalist web framework for Node.js.

### Webpack

A static module bundler for modern JavaScript applications.

### Babel

A toolchain that is mainly used to convert ECMAScript 2015+ code into a backward-compatible version of JavaScript in current and older browsers or environments.

### Better SQLite3

A simple, synchronous, SQLite3 binding for Node.js.

### dotenv

Loads environment variables from a .env file into process.env.

### Express Session

A session middleware for Express.js that protects the API POST and DELETE routes.

### Express Session Better SQLite3

A Better SQLite3 session store for Express.js.

### Leaflet

An open-source JavaScript library for mobile-friendly interactive maps.
