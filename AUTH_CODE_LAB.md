# Auth Module Challenge

In this extended challenge you are being asked to implement the NgRx State portion of a new authentication module. The auth system you are integrating with is pretty straightforward:

1.  When the application launches reach out to the API via the AuthService to check and see if you are authenticated
2.  When the user attempts to login, use the `login` method on the AuthService to attempt to login supplying a username and password. Note that this service call MAY FAIL and you should attempt to handle errors for it
3.  When the user logs out simply call the synchronous `logout` method on the AuthService

## Step One: User Actions

There are really only two ways the user can interact with the authentication module: they can login via the login page or they can logout by pressing the logout icon button in the navigation drawer. With this in mind, the first part of the challenge is to define some **actions** that model all of the ways the user can interact with the authentication module.

In the previous sections of this workshop we've used the `props<>()` utility function to define additional properties on actions. For this section, try out this alternative syntax:

```ts
export const createBook = createAction(
  "[Books Page] Create Book",
  (book: BookRequiredProps) => ({ book })
);
```

This syntax allows you to customize the function signature of the action creator that is returned from `createAction`.

### Challenge: Auth User Actions

**PR: 12-auth-user-actions**

1. Open **auth-user.actions.ts** and define actions for when the user **logs in** and **logs out**. What additional data should you put on these actions to give them context?
2. Open **login-page.component.ts** in the Auth module and have it dispatch your new **login** action in the `onLogin` method.
3. Open **user.component.ts** in the Auth module and have it dispatch your new **logout** action in the `onLogout` method.

## Step Two: Auth State

The components your team has implemented for the Auth module care about three pieces of state: who is the currently authenticated user? Am I currently retrieving the authentication status? And was there an error when the user attempted to login?

With this in mind your next challenge is to define an auth reducer that can manage these three pieces of state. It should also be setup to hand the new `logout` and `login` actions you created in the previous step.

### Challenge: Auth State

**PR: 13-auth-state**

1. Open **auth.reducer.ts** in the State module and define an interface called `State` with properties for `gettingStatus`, `user`, and `error`.
2. Define a constant called `initialState` that implements the `State` interface. What should these properties of state be initialized to when the application launches?
3. Define a reducer called `authReducer` using the `createReducer` helper, passing `initialState` in as the first argument
4. Add a state transition function that handles the `logout` action. When the user logs out what should state look like?
5. Add a state transition function that handles the `login` action. When the user starts to authenticate what should state look like÷
6. Define a statically analyzable function simply called `reducer` that wraps `authReducer` to make it AOT-compatible

## Step Three: Auth Selectors

Now that you have a reducer defined it is time to author some selectors to read the state it manages and then connect the reducer to the Store so that it starts receiving actions.

### Challenge: Auth Selectors

**PR: 14-auth-selectors**

1. Open **auth.reducer.ts** and define three **getter selectors** for the `gettingStatus`, `user`, and `error` properties
2. Open `state/index.ts` and register the auth reducer's `State` interface and `reducer` function in the global `State` interface and the global `reducers` object respectively
3. Define a **getter selector** for selecting the **auth state**
4. Use the **auth state selector** and `createSelector` to export the three selectors you authored in step 1

## Step Four: Reading Auth State

There are two components in the Auth module that are expecting to be able to read in authentication state from the store.

The first is the `login-page` component. It uses an `*ngIf` directive on the top level `<router-outlet/>` to prevent any route from being displayed until the user has authenticated. While the user is authenticating or while the app is retrieving authentication status it shows a spinner. If the app is not actively authenticating and there is not a user authenticated it shows the login form. Finally, if the user is not authenticated and has failed to authenticate it passes down an error message to the login form.

The second component is the `user` component. It shows the username of the currently authenticated user and a logout button.

In this next challenge you'll need to use the selectors you've authored to connect these two components to the Store.

### Challenge: Reading Auth State

**PR: 15-reading-auth-state**

1. Open `login-page.component.ts` in the Auth module and remove the mock data observables being assigned to the `gettingStatus$`, `user$`, and `error$` properties.
2. Use the selectors you authored in the previous challenge to initialize these properties in the component's constructor.
3. Open `user.component.ts` in the Auth module and remove the mock data observable being assigned to the `user$` property.
4. Use the selectors you authored in the previous challenge to initialize the `user$` property.

## Step Five: Auth API Actions

At this point your application should be showing the login page. If you attempt to authenticate it will perpetually show a spinner. That's because we haven't written actions for the Auth API and there aren't any effects to dispatch them.

The first auth API you will have to interact with is `getStatus()`. For the purpose of this exercise assume it never fails. It will return to you either a `UserModel` if there is an authenticated user or `null` if there is not an authenticated user.

The second API you will interact with is `login()`. This method requires a username and password. If the username and password are correct the observable will return the `UserModel` for the newly authenticated user. If the username or password is incorrect the service with throw an error. The error will be a string and describes the reason why authentication failed.

The third API you will interact with is `logout()`. It is completely synchronous and does not return an observable. It will always succeed and logs the user out immediately.

### Challenge: Auth API Actions

**PR: 16-auth-api-actions**

1. Open `auth-api.actions.ts` in the Auth module
2. Define actions that capture all of the unique events `getStatus()` could emit (is there more than one?)
3. Define actions that capture all of the unique events that `login()` could emit (should be two: success and failure)
4. Define any actions that are needed to capture the unique events that `logout()` could emit (are there any?)

## Step Six: Auth Effects

In the previous challenge you should have authored a total of three actions: `getStatusSuccess`, `loginSuccess`, and `loginFailure`. If you didn't get that right review the PR and adjust your application as needed.

The idea here is to pair one action for each emmission type of the observables that are returned by the service. Since `getStatus` can only succeed we write one action for it. Since `login` can succeed or fail we write an action for each case. Finally, `logout` does not emit anything at all and just happens. There isn't a need to model this with an action.

Now that the actions have been authored it is time to write effects that interact with the `AuthService`. Keep in mind a few things from our previous lesson advanced effects: not all effects need to start with the `Actions` service, you can use `catchError` with `of` to map errors into actions, and not all effects need to dispatch actions.

### Challenge: Auth Effects

**PR: 17-auth-effects**

1. Open `auth.effects.ts` in the Auth module
2. Create an effect class called `AuthEffects` and apply the `@Injectable()` decorator to it.
3. Inject the `Actions` service and `AuthService` into the effects class
4. Define an effect called `getAuthStatus$` that immediately gets the authentication status on bootup and dispatches the appropriate action when complete
5. Define an effect called `login$` that calls the `login()` method when the user logs in. Be sure to map its success and error emmissions into actions.
6. Define an effect called `logout$` that simply calls the `logout()` method when the user logs out. This effect doesn't need to dispatch any actions.
7. Open `auth.module.ts` and register your new effect in the `imports` of the `AuthModule` using `EffectsModule.forFeature([...])`

## Step Seven: Handling Auth API Actions

Now that effects are running and are dispatching actions for the API it is time to update our auth reducer to handle these actions.

### Challenge: Handling Auth API Actions

**PR: 18-handling-auth-api-actions**

1. Open `auth.reducer.ts` in the State module
2. Add a state transition function that handles the `getAuthStatusSuccess` action. How should state change when this action is handled?
3. Add a state transition function that handles the `loginSuccess` action. How should state change when this action is handled?
4. Add a state transition function that handles the `loginFailure` action. How should state change when this action is handled?

## Step Eight: Resetting State on Logout

By this point the app should run and you should be able to authenticate successfully, logout successfully, and even show errors if you fail to authenticate. There's just one problem though: if you use the Redux Devtools you'll see that when you logout all of the books are kept in state! This could be sensitive information so you'll need to reset all of this state when the user logs out.

To do this, you are going to write a meta-reducer that handles the `logout` action. When a `logout` action is dispatched your metareducer can send `undefined` to all of your other reducers to reset their state. All other actions should be processed as normal.

### Challenge: Logout Meta-Reducer

**PR: 19-logout-metareducer**

1. Open `logout.metareducer.ts` and implement a meta-reducer that resets all of state when a `logout` action is dispatched
2. Open `state/index.ts` and register the meta-reducer in the `metaReducers` array

Now when you logout the state should be completely reset! Push your code to your personal fork and let us know that you've completed this code lab.
