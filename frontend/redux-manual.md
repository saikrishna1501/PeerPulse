# Configuring Redux

## Step 1 - Creating the store

We create a `store` directory under `src`, this directory would house state-management code and configurations.

```
cd frontend/src && mkdir store
cd store && touch configureStore.ts
```

After which, we need to create `middleware` directory, which house middleware functions which are tasked with executing side-effects related to state-management. For example, an `api.js` file would house a middleware solely tasked to communicate with the backend.

```
cd store && mkdir middleware
```

## Step 2 - Creating slices

Before we jump into creating slices we must learn about 4 core concepts for state-management in Redux,

1. actions
2. action creators
3. reducers
4. dispatch

Each of which serves a distinct function in the redux's state management approach. An `action` object is a plain JavaScript object which has 2 properties `type` & `payload`. The `type` property signifies the action type, for example a `blogAdd` action object would look something like this,

```
// Action Object for adding a blog
const blogAdd = {
    type: 'blogAdd',
    payload: {
        title: 'Life @ Boston',
        content: 'lorem epsum',
        author: 'ae13r24edada',
        tag: ['#Boston', '#NEU'],
    }
}
```

However, we must delegate the creation of action object to a function called as `action creator`. This function may or may not accept an argument and only return an `action object`.

```
// Action creator
const blogAdd = (payload) => ({
    type: 'blogAdd',
    payload,
})

// Payload
const payload = {
        title: 'Life @ Boston',
        content: 'lorem epsum',
        author: 'ae13r24edada',
        tag: ['#Boston', '#NEU'],
    };

// Invoking the creator
const action = blogAdd(payload);
```

So the above code would be written in a file dedicate for housing blog related `actions` & `creators`.

```
cd store && touch blogs.ts
```

Now we must only move `creators` in `blogs.ts`. We have slightly modified the code, here is how it looks like

```
// blogs.ts
import Blog from "../models/blogs";

// Action creator
const blogAddCreator = (payload: Blog) => ({
    type: 'blogAdd',
    payload,
});
```

In this code, we're taking advantage of TypeScript's type-checking capability to ensure that the structure of the payload conforms to the defined Blog model.

Now that we've grasped the concepts of a `creator` and an `action`, let's transition to discussing the `reducer`. Essentially, a reducer is a function that receives the current state and an action object as arguments, and it returns the new state.

Assume, the initialState of blogs to be modelled by an empty array(initialState = []), so when a reducer related to `blogAdd` action is invoked, it expects `currentState` and `action` as parameters, after which it would simply push the `action.payload` in `currentState`.

```
const blogAddReducer = (currentState, action) => {
    currentState.push(action.payload);
}
```

Now that we have understood `creators`, `action` & `reducers`, we need to understand how they interact with other. This interaction is facilitated by `dispatch`. So, the `dispatch` expects an `action` object ( we can also send function using custom middleware) and internally it sends it to the reducer of the dispatched `action` object.

```
const store = configureStore(); // discussed later

// Payload
const payload = {
        title: 'Life @ Boston',
        content: 'lorem epsum',
        author: 'ae13r24edada',
        tag: ['#Boston', '#NEU'],
    };

store.dispatch(blogAddCreator(payload)); // this would create action object and send it to reducer
```

Finally, we have covered all the 4 core concepts in Redux, now we can use third-party libraries like `redux-toolkit` to help manage these concepts easily.

We must replace the contents of `blogs.ts` by using the `createSlice` function which creates appropriate `creators` and `reducer`.

## Step 3 - Create hierarchy of reducer

To put it simply, the heirarchy would look like this

 - store
    - root reducer (store/reducer.ts no reference required)
        - entities (store/entities.ts)
            - blogs (store/blogs.ts)
            - events (TBD)
            - housing (TBD)
        - auth (TBD)
        - ui (TBD)

Lets create the necessary file structure,

```
cd store && touch reducer.ts entities.ts events.ts housing.ts
```

Now write the below in `entities.ts` and `reducer.ts`,

```
// entities.ts
import { combineReducers } from 'redux';
import blogsReducer from './blogs';

export default combineReducers({
    blogs: blogsReducer
})
```

```
// reducer.ts
import { combineReducers } from 'redux';
import entitiesReducer from './entities';

// root-reducer
export default combineReducers({
    entities: entitiesReducer
})
```

## Step 4 - Configuring the store

Now that we have created slice and linked the reducers, we must now configure our store to leverage our work. We can use `configureStore()` from `@reduxjs/toolkit`. This file must return a no-args function which internally returns the result of invoking `configureStore({..});`

```
// configureStore.ts
import { configureStore } from "@reduxjs/toolkit";
import reducer from './reducer';

export default function(){
    return configureStore({
        reducer: reducer
    });
}
```

## Step 5 - Linking this to App.tsx

Now that we have a function that helps us configure store, we must give the store's access to `App` component. After which we pass the store object to `Provider` component as store, using which any component nested within the `Provider` can access the `store`.

```
import React from "react";
import "./App.scss";
import Blogs from "./components/blogs";
import configureMyStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureMyStore();

function App() {
  return (
    <Provider store={store}>
      <Blogs />
    </Provider>
  );
}

export default App;
```


# Auth in redux using middleware

Create a new slice `auth` in `store` directory to manage authentication related state in redux for frontend. This slice can include information about the user, authentication status, and the JWT token.

```
cd store && touch auth.ts
```