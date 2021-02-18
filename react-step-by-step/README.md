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
- https://reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary
