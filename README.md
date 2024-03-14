# Infinite Scroll App

The Infinite Scroll App is a web application built using React.js that allows users to browse and view curated pictures from the Pexels API. It provides an intuitive interface for users to scroll through a collection of high-quality images, view details about each picture, and favorite their preferred ones.


![App Screenshot](src/assets/Screenshot.png)


## Run Locally

Clone the project

```
  git clone https://github.com/rokastas/infinite-scroll-app.git
```

Go to the project directory

```
  cd infinite-scroll-app
```

Before you start the app, create a .env file at the app's root. This file must have the value for the env variable below

```
VITE_PEXELS_API_KEY=
```

Make sure you have nodejs and npm installed on your machine. To check their versions run

```
  node -v
  npm -v
```


Install dependencies

```
  npm install
```

Start the server

```
  npm run dev
```


## Project Structure
```
infinite-scroll-app/
  ├── node_modules/                 # Installed dependencies
  ├── src/                          # Source code
  │   ├── assets/
  │   ├── components/               # React components
  │   │   ├── ButtonFavorite.jsx
  │   │   ├── Picture.jsx
  │   │   └── PictureGrid.jsx
  │   ├── styles/                   # SCSS styles
  │   │   ├── Buttons.scss
  │   |   ├── Picture.scss
  │   │   └── PictureGrid.scss
  │   ├── tests/                    # All tests to be run before running the app
  │   │   ├── Api.test.jsx
  │   │   └── ...
  │   ├── utils/                    # Utility functions and modules
  │   │   ├── api.js                # Module for API interactions
  │   │   └── pictureUtils.js       # Utility functions for picture operations
  |   ├── App.jsx
  │   ├── index.scss
  │   └── main.jsx
  ├── index.html                    # HTML template
  ├── package.json                  # Project dependencies and scripts
  ├── README.md                     # Project documentation
  └── ...

```


## Built with

**Core stack:** React, Javascript, SCSS, Vite, Jest, Babel

**Third party API:** [Pexels](https://www.pexels.com/api/documentation/#photos-curated)


## Author

Made with ❤️, 🍵 and 🥵 by [Rokas Stasiulis](https://github.com/rokastas)
