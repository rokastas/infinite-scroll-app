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

Run tests

```
  npm test
```

Start the server

```
  npm run dev
```


## Project Structure
```
infinite-scroll-app/
  ├── node_modules/                   # Installed dependencies
  ├── src/                            # Source code
  │   ├── assets/
  │   ├── components/                 # React components
  │   │   ├── buttons/
  │   │   │   ├── ButtonFavorite.jsx  # Button that allows favoriting pictures
  │   │   │   └── ...
  │   │   ├── FavoritePicture.jsx     # Favorited picture to be displayed in Favorites Gallery
  │   │   ├── FavoritesGallery.jsx    # Gallery of Favorited pictures
  │   │   ├── Picture.jsx             # Main picture component
  │   │   └── PictureGrid.jsx         # Picture grid that handles loading and layout of all pictures
  │   ├── styles/                     # SCSS styles
  │   │   ├── components/
  │   │   │   ├── Buttons.jsx         # Styling of all buttons
  │   │   │   ├── Picture.jsx         # Styling for the picture in the Picture Grid
  │   │   │   └── ...
  │   │   ├── _index.scss             # Main styling file
  │   │   └── Variables.scss          # Variables used in the project
  │   ├── tests/                      # Tests
  │   │   ├── ButtonFavorite.test.jsx # Test for the button with favoriting functionality
  │   │   └── PictureGrid.test.jsx    # Test for the Picture Grid handling of Pictures
  │   ├── utils/                      # Utility functions and modules
  │   │   ├── api.js                  # Module for API interactions
  │   │   └── pictureUtils.js         # Utility functions for picture operations
  │   ├── App.jsx
  │   ├── index.scss
  │   └── main.jsx
  ├── index.html                      # HTML template
  ├── package.json                    # Project dependencies and scripts
  ├── README.md                       # Project documentation
  └── ...

```


## Built with

This project was bootstrapped with Vite.

**Core stack:** React, Javascript, SCSS

**Third party API:** [Pexels](https://www.pexels.com/api/documentation/#photos-curated)


## Author

Made with ❤️, 🍵 and 🥵 by [Rokas Stasiulis](https://github.com/rokastas)
