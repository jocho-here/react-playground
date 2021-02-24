# Step by step introduction

## Introducing JSX
- `const element = <h1>Hello, world!</h1>;`
    - JSX is a syntax extension to JavaScript
```
// You can put any valid JavaScript expression inside the curly braces
const name = 'Joseph';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);

// Like this too
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```
---
- After compilation, JSX evaluate to JavaScript objects
- This means that you can use JSX inside of `if` statements and `for` loops
```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
---
- You can specify attributes with JSX
```
const element = <div tabIndex="0"></div>;
```
- You may also use curly braces to embed a JavaScipt expession in an attributes
```
const element = <img src={user.avatarUrl}></img>;
```
- Don't put quotes around curly braces when embedding a JavaScript expressions in an attributes
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
// is essentially
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

## Rendering Elements
- Elements are the smallest building blocks of React apps
- Unlike browser DOM elements, React elements are plain objects, and arer cheap to create
---
```
<div id="root"></div>
```
- We call this a "root" DOM node because everything inside it will be managed by React DOM
- Applications built with just React usually have a single root DOM node
- If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like
---
- To render a React element into a root DOM node, pass both to ReactDOM.render()
```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
---
- React elements are immutable
- The only way to update the UI is to create a new element, and pass it to ReactDOM.render()
```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));}

setInterval(tick, 1000);
```
- In practice, most React apps only call `ReactDOM.render()` once
---
- React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state
- Thinking ab out how to UI should look at any given moment, rather than how to change it over time eliminates a whole class of bugs

## Components and Props
- Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.
---
- Simplest way to define a component is to write a JavaZScript function
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// Equivalent to
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Renders "Hello, Sara"
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
- Always start component names with a capital letter
---
- You can extrarct components out into smaller components
```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
// Breaking down the component into smaller pieces
// Extracting Avatar
function Avatar(props) {
  return (
    <
      img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

// Extracting UserInfo
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
- A good rule of thumb is that if a part of your UI is used several times, or ris complex enough on its own, it's a good candidate to be extracted to a separate component
---
- Pure functions don't modify its arguments (props). Impure ones do.
- React has a single strict rule: All React components must act like functions with respect to their props.

## State and Lifecycle
```
// Let's make this clock component truly reusable and encapsulated
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

// Ideally we want to wrtie this once and have the Clock update itself
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
---
- State is similar to props, but it is private and fully contorlled by the component
---
- Converting a Function to a Class
1. Create an ES6 class, with the same name, that extends `React.Component`
2. Add a single empty method to it called `render()`
3. Move the body of the function into the `render()` method
4. Replace `props` with `this.props` in the `render()` body
5. Delete the remaining empty function declaration

```
// From this
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

// To this
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
- The `render` method will be called each time an update happens, but only a single instance of the `Clock` class will be used
---
- Converting from using `props` to `state`
1. Replace `this.props.date` with `this.state.date` in the `render()` method
2. Add a class constructor that assigns the initial `this.state`
3. Remove the `date` prop from the `<Clock />` element
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
---
- We want to set up a timer whenever the Clock is rerndered to the DOM for the first time
    - This is called "mounting" in React
- We also want to clear that timer whenever the DOM produced by the `Clock` is removed
    - This is called "unmounting" in React
- These two can be handled by lifecycle methods
    - `componentDidMount() {...}`
        - This method runs after the component output has been rendered to the DOM
        - Good place to set up a timer
    - `componentWillUnmount() {...}`
        - We'll tear down the timer here
```
// Final form
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
- With `this.setState()`, it knows that states are changing
---
- Do not modify state directly
```
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});

// Wrong 
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
// Or
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
---
- `setState()` merges the object you provide into the current state
```
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
// After all, it will leave posts and comments both modified
```
---
- Finally, neither parent nor child components can know if a cetain component is stateful or stateless.
    - This is why state is often called local or encapsulalted
    - Top-Down or Unidirectional data flow
- If you set up 3 clocks, each one sets up its own timer and updates independently

## Handling Events
- https://reactjs.org/docs/handling-events.html
