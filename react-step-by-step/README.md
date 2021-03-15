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
- Simplest way to define a component is to write a JavaScript function
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
- With JSX you pass a function as the event handler, rather than a string
```
// Instead of this
<button onclick="activateLasers()">
  Activate Lasers
</button>
// We do this
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
---
- You cannot return `false` to prevent default behavior in React but you should call `preventDefault` explicitly
```
// Instead of this
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
// We do this
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
- When using React, you don't need to call `addEventListener` to add listeners to a DOM element after it is created
    - Instead, provide a listener when the element is initially rendered
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

// If calling bind annoys you, you can get around with using public class fields syntax
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax
  handleClick = () => {
    console.log('this is :', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// Or you can do the following
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```
---
- Passing arguments to event handlers
```
// `id` is the row ID, either of the following would work

// arrow function
// `e` argument representing the React event will be passed
// We have to pass it explicitly here
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

// Function.prototype.bind
// With `bind`, any further arguments are automatically forwarded
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
---

## Conditional Rendering
- Use JavaScript operators like `if` or the `conditional operator` to create elements representing the current state and let React update the UI to match them
```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

// Different greeting and button based on whether the user is logged in
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

- You may embed expressions in JSX by wrapping them in curly braces
```
// Including &&
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
- This works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evalutes to `false`

- We can input `condition ? true : false` inline as well
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

- If you want to hide a component even though it was rendered by another component, return `null` instead of its render output
```
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
  
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

## Lists and Keys
- Transforming lists using `map()`
```
const numbers = [1,2,3,4,5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]
```

- You can build collections of elements and include them in JSX using curly braces `{}`
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
- Keys help React identify which items have changed, are added, or are removed
    - The best way to pick a key is to use a string that uniquely identifies a list item among its sibilings
    - Most often IDs from your data, at least the item index, but not recommended

- Correct Key Usage
```
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
- A good rule of thumb is that elements inside the `map()` call need keys

- Keys used within arrays should be unique among their sibilings
    - Doesn't need to be unique globally
- If you need the same value in your component, pass it explicitly as a prop with a different name
    - Keys don't get passed to your components automatically

- Embedding `map()` in curly braces
```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
- If the `map()` body is too nested, it might be a good time to extract a component

## Forms
- Through a technique called "controlled components", we can have a JavaScript function handle the submission of the form
```
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
---
- In HTML, form elements typically maintain their own state and update it based on user input.
    - In React, mutable state is kept in the state property of components, and only updated with `setState()`
    - We can combine the two by making the React state be the "single source of truth"
    - An input form element whose value is controlled by React in this way is called a "controlled component"
```
// Controlled component to log the name when it is submitted
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
```
- With a controlled component, the input's value is always driven by the React state

---
- `<textarea>` element al uses a `value` attribute instead, like how we used `<input>`
```
... // all the same
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

---
- In HTML, `<select>` creates a drop-down list
```
<select>
  <option value="lime">Coconut</option>
  <option selected value="coconut">Coconut</option>
</select>
```
- Instead of using `selected` to set the default value, we can use the `value` attribute
```
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};
    ...
  }
  ...

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
...
```
---
- When you need to handle multiple controlled `input` elements, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`
- https://reactjs.org/docs/forms.html#handling-multiple-inputs
