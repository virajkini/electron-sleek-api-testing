# Electron Env Sandboxing PoC

![image](https://user-images.githubusercontent.com/6417910/54875839-fc011380-4e2b-11e9-8db5-f981d1186426.png)

## Setting up the project

- Clone the repository
- Install the dependencies
  ```
  $ npm install
  ```
- Start the Electron App.
  ```
  $ npm start
  ```

This will start the client app via [webpack-dev-server](https://github.com/webpack/webpack-dev-server) on port 3000 and the electron app which loads `http://localhost:3000` on load.

**Note**

There is a tiny timing issue that I haven't been able to solve yet. When the electron app boots, it loads a blank page since the webpack-dev-server build has not completed. Just refresh the app page to fetch the built react app.


## Setting a Session ID to enable a Logged In session

In `evaluations.js`, you can add a session token to the sessionId field to start the evaluation with that session ID set.

![image](https://user-images.githubusercontent.com/6417910/54878603-fcfa6b00-4e54-11e9-981b-e6c201a0ea9b.png)
