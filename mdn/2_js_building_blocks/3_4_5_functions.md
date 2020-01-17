# Functions in javascript

* Functions are also objects themselves.

## Defining functions

parameters are comma separated

```Javascript
function functionName(param1, param2, ..) {
  // statements
}

//  function call/invocation
// paranthesis is must unlike ruby
functionName();

typeof(functionName);
```

## Anonymous functions

**Commonly used with event handlers**. Hence function itself can be passed as parameters to other functions.

```Javascript
let submitBtn = document.querySelector(".submit-button");

submitBtn.addEventHanlder('click', function() {
  console.log("Button clicked !!");
});

// assign function to a variable
var say_hello =  function() {
  console.log("hello");
}

say_hello();
```

## Function scope

* Scope outside all the functions - **global scope**. Accessible anywhere in the code. Variables declared inside a function are visible only within that function - **local scope**

* Functions can call other functions. Split large functions in to smaller functions and have the large function call these smaller functions to get the functionality done.

* Function can contain other functions with in it.

```javascript
function outer() {
  console.log("Outer function");

  function inner(msg) {
    console.log(`${msg}`);
  }

  inner('Calling inner function from outer function');

  // if required this function can return another function object
  return inner;
}

let ret = outer();
ret('Calling inner function from the return object');
```

## Function return values

Use **`return`** keyword to return values from functions. Usage of this keyword is not optional in javascript.

## Default arguments

* Default parameters can be specified in any order.

```javascript
// default parameters can be assigned using a method call as well
function getUrl(host, port = 80, protocol = getDefaultProtocol()) {
  return `${protocol}://${host}:${port}`
}

function getDefaultProtocol() {
  return config.httpsEnabled ? 'htpps' : 'http';
}


// default value can be any javascript expression
// including a function object
function handleResponse(response, responseHandler = defaultHandler) {
  responseHandler(response);
}

function defaultHandler(response) {
  if (response.ok) {
    console.log(response.json());
  } else {
    console.log(response.statusText);
  }
}
```

---

## References

* [Functions in javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions)
* [Building own functions](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Build_your_own_function)
