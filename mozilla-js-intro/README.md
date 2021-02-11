# Mozilla: A re-introduction to JavsScript
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

## Numbers
```
// Everything is float.

// Built-in Math
Math.sin(3.5);
var circumference = 2 * Math.PI * r;

// Built-in parseInt()
parseInt('123', 10); // 123
parseInt('010', 10); // 10
parseInt('11', 2); // 3 in binary

// Use unary + operator to convert values to numbers
b = + '42';  // 42

// NaN = Not a Number
parseInt('hello', 10); // NaN
a = NaN;
isNaN(a); // true

// Infinity!
aa = 1 / 0;  // Infinity
bb = -1 / 0;  // -Infinity

isFinite(aa);  // false
``

## Strings
```
// Sequences of Unicode characters (UTF-16)
// Strings are objects

'hello'.length;  // 5
'hello, world'.rreplace('world', 'mars'); // "hello, mars"
'hello'.toUpperCase(); // "HELLO"
```

## Other types
```
// null is a non-value
// undefined indicates an uninitialized variable
Boolean('');  // false
Boolean(false);  // false
Boolean(0);  // false
Boolean(NaN);  // false
Boolean(null);  // false
Boolean(undefined);  // false
// All others are true
```

## Variablles
```
// let allows you to declare block-level variables. It's available from its block.
let a;
let name = 'Simon';

for (let i = 0; i < 5; i++) {
    // i is only visible in here
}
// i is *not* visible out here

// const are for values that are never intended to change. It's available from its block.
const Pi = 3..14;  // variable Pi is set
Pi = 1; // will throw an error because Pi is a const

// var doesn't have any restrictions. It is avaiable from the function it's in.
var a;
var name = 'Simon';

for (var i = 0; i < 5; i++) {
    // i is visibe to the whole function
}
// i *is* visible out here
```

## Operator
```
var x = 1;
x += 5;  // 6

'hello' + ' world'; // "hello world"

'3' + 4 + 5; //  "345"
3 + 4 + '5'; //  "75"

// double-equals operator performs type coercion if you give it different types
123 == '123'; // true
1 == true; // true

// To avoid type coercion, use the triple-equals operator
123 === '123'; // false
1 === true; // false

// Also there are != and !==
```

## Control structures
```
if (...) {
} else if (...) {
  ...
} else {
  ...
}

// while vs. do-while loops: do-while loops ensure that the body of the loop is
// executed at least once
while (true) {
  ...
}

do {
  ...
} while (true);

// for loops
for (var i = 0; i < 5; i ++) {
  ...
}
for (let value of array) {
  ...
}
for (let property in object) {
  ...
}

// && and || operators
var name = o && o.getName(); // ensures o exists
var name = cachedName || (cachedName = getName()); // Caching on 2 variables
var allowed = (age > 18) ? 'yes' : 'no';
switch (action) {
  case 'draw':
    drawIt();
    break
  case 'eat':
    eatIt();
    break
  default:
    doNothing();
}
```

## Objects
```
// objects can be thought of as a dictionary in Python
var obj = new Object(); // or
var obj = {};  // Object literal syntax. Preferred way.

// Initializing an object
var obj = {
  name: 'Carrot',
  _for: 'Max',  // 'for' is a reserved word, use '_for' instead
  details: {
    color: 'orange'
  }
}

// Attribute access
obj.details.color;  // orange
obj['details']['color'];  // orange

// An object creation
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var you = new Person('You', 24);
you.name;  // 'You'
you['age'];  // 24

var aa = 'column';
var bb = {[aa]: 1234};  // This will use the value of aa ('column') as the key

// Retrieving the length of an object
var obj = {1:1, 2:2};
Object.keys(obj).length;  // 2
```

## Arrays
```
var a = [1,2,3,4];
a.length;  // 4

// length isn't necessarily the number of items in the array
var a = ['dog', 'cat', 'hen'];
a[100] = 'fox';
a.length; // 101

a.push(item); // Adding an item to the array
```

## Functions
```
function add(x, y) {
  var total = x + y;
  return total;
}

add();  // It will assign undefined to x and y
add(2,3,4); // It will add the first two and ignore an extra parameter

// functions have access to additiona variables inside their body calleld arguments
function add() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum;
}

add(1,2,3,4); // 1 + 2 + 3 + 4
add(1,2,); // 1 + 2

// We can reduce it by using Rest Parameter Syntax
function add(...args) {
  var sum = 0;
  for (let value of args) {
    sum += value;
  }
  return sum;
}
add.apply(null, [1,2,3,4]); // 2.5

// anonymous function; this lets you pass around functions like an object
var avg = function() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
};

// Hiding some local variables
var a = 1;
var b = 2;
(function() {
  var b = 3;  // b available ONLY during the scope of this function
  a += b;
})();
a;  // 4
b;  // 2

// Recursive call with named function expression or IIFE (Immediately Invoked Function Expressions)
var charsInBody = (function counter(elm) {
  if (elm.nodeType == 3) { // TEXT_NODE
    return elm.nodeValue.length;
  }
  var count = 0;
  for (var i = 0, child; child = elm.childNodes[i]; i++) {
    count += counter(child);
  }
  return count;
})(document.body);
```

## Custom objects
- TBD: https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript#custom_objects
