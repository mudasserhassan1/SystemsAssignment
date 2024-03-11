This is a new [**React Native**](https://reactnative.dev) project which I built for my Systems Limited Interview process. It is a simple app that displays a list of Gifs and rate these Gifs. The app is built using **TypeScript** and **React Navigation** for navigation.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Reasoning behind the approach taken

In one of my application there is a scenario to show list of products and there is a search bar on top of screen when enters character in search bar a new view shows the results of searched character, I have applied the same approach in this application. 
I have applied debounce on the search bar to avoid the multiple api calls on each character entered in search bar.


### Total Time Taken
I have completed the application in 4 hours.
I am not calculating the time taken in writing this Read.me file.

### Assumptions made
I have assumed that on first rendering there will be 15 gifs shown on the screen and upon scrolling the next 15 gifs will be loaded from the api.
I have assumed that the user will search the gifs and the gifs will be shown on the screen and upon scrolling the next 15 gifs will be loaded from the api.
I have assumed that the user will rate the gifs and the rating will be saved in local storage.
Since This app needs to be build in TypeScript and I had no prior experience of TypeScript so I could not spend much time on UI.

### What would you do differently if you had more time
If I had more time I would have sync the rating of gifs and will be comparing Ids of gifs to update the rating of gifs on Feedback screen.
I would have have worked on the UI of the application.
Debounce is not working, I would have worked on it to make it work.

### Googling
I have used google for the following:
Gifs API to understand the response and how to use it.
React Navigation to slide in next screen from right to left.
Star Rating library to use it in the application.
mmkv library to store the data in local storage.
Toast library to show the toast message on the screen.
Since I had no experience in TypeScript so I have used google to understand the syntax of TypeScript.
Faced some installation issues in installing Flash list so to save time I have used FlatList instead of FlashList.

# SystemsAssignment
