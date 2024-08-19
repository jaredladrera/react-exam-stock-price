# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Stock Price Search Application

This repository contains a ReactJS application styled with Bootstrap that allows users to search for the latest stock prices. The app integrates with a third-party API to fetch stock data, but please note that the API has a limited number of requests available. If the data is not fetched, it might be because the API has exhausted its request credits.

Features
Stock Search: Users can search for the latest stock prices by entering a stock symbol.
Debounce Implementation: To optimize API usage, a debounce function is implemented to limit the number of API calls made as the user types in the search field.

Technologies Used
ReactJS: The app is built using ReactJS, a popular JavaScript library for building user interfaces.
Bootstrap 5: The user interface is styled with Bootstrap 5 for a modern and responsive design.

Getting Started

Prerequisites
Node.js and npm installed on your local machine.

Installation

Clone the repository: git clone https://github.com/jaredladrera/react-exam-stock-price.git

Install the dependencies: npm install

If you have encounterring some babel issue try to install this package
npm install --save-dev @babel/plugin-proposal-private-property-in-object

Start the development server: npm start

Usage
Enter a stock symbol in the search bar to fetch the latest stock price.
Due to API limitations, the app may not fetch data if the request quota has been exceeded. Please register for new account for new api key or consider using a different API key.

This is the link for api key
https://rapidapi.com/realiz-so-realiz-so-default/api/real-time-stock-finance-quote/playground/apiendpoint_ae324ecb-7e32-4224-9ca7-cb393589902f

register an email and subscribe for free
get the x-rapidapi-key and put on the .env file on the project

REACT_APP_RAPID_API_KEY= value of x-rapidapi-key


