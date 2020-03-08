# Javascript scope and closure

* Each function creates a new scope. The scope contains all the variables declared within the function.

* Function arguments (parameters) work as local variables inside functions. Local variables inside function cannot be accessed from outside creating a function private scope.

* Function scope has a parent scope and that leads to a scope chain. **Root of every scope's chain is the global scope**.

* With JavaScript, the global scope is the **complete JavaScript environment**. In HTML, **the global scope is the window object**. All global variables belong to the window object.

```javascript
// variable in global scope
let str = 'Hello';

let simpleFunc = function() {
  let name = 'John';
  // variable name is in this function's scope
  // This function's parent scope is the global scope
  // This function will be able to reference **str** through its scope chain
  console.log(`${str}, ${name}`);
}

simpleFunc();
```

## Scope of named vs anonymous functions

* Due to hoisting, named functions have the scope present at the top of whatever block they belong to, but anonymous functions have whatever scope exists at the line they are initialized.

## Closures

> Closure is the act of capturing an object and separating it from its original scope, making it available to the capturing function forever.

```javascript
let helloStr = 'world';

// name is now part of the function' scope which cannot accessed
// from outside. Private to the function only.
let sayHello = function(name){
  return function(){
    console.log('Hello ' + name + '!');
  }
}

// by passing the helloStr to parameter name
// we have stored the state of the helloStr variable
// inside the function's scope and even if the value of
// helloStr changes, the greeting message is always
// going to be same
let sayGreeting = sayHello(helloStr);

helloStr = 'Foo';
sayGreeting(); //Hello world!

```

## How are Closures related to the Scope Chain

> When a variable is used, the program traverses the scope chain until it finds an entry for that variable. **Redeclaring a variable or passing it into a function is a way of separating it** from its previous existence in the scope chain.

## Immediately Invoked Functional Expression (IIFE)

> IIFE are a pattern in Javascript that allow variables and methods to be made private by declaring them inside a scope.

```javascript
(function(global){
  var privateVariable = 'No one can ever see me or change me outside of this scope';
  var publicVariable = 'No one can change me, but some can see me';

  global.getPublicVariable = function(){
    return publicVariable;
  };
})(window);
```

---

## References

* [JS scopes](https://www.w3schools.com/js/js_scope.asp)
* [Explaining JavaScript Closure & Scope Chain with Examples](https://community.risingstack.com/explaining-javascript-closure-scope-chain-examples/)
