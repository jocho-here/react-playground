# Step by step introduction

## Introducing JSX
- `const element = <h1>Hello, world!</h1>;`
    - JSX is a syntax extension to JavaScript

### Embedding Expressions in JSX
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

### JSX is an Expression Too
- After compilation, JSX become regular JavaScript function
- https://reactjs.org/docs/introducing-jsx.html#jsx-is-an-expression-too
