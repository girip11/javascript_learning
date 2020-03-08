# `this` usage

> In JavaScript the value of `this` does not refer to the function in which it is used or it’s scope but is determined mostly by the invocation context of function (context.function()) and where it is called.

```javascript
//this in foo function does not refer to the lexical scope
//of the function, but refers to global scope because
// it’s the invocation context of the function (window.foo()).
function foo(){
 var a =2 ;
 this.bar();
}
```

## 1. Default binding

* When a function is called without an owner object, the value of `this` becomes the global object.

```javascript
function foo() {
  // prints Window
  console.log(this.constructor.name);
}

// invoked in the context of the window object
foo();

// above call is same as below one.
window.foo();
```

## 2. Implicit binding

```javascript
var name = 'Window';

function foo() {
  // prints Window
  console.log(this.name);
}

let simpleObj = {
  name: 'Object',
  foo: foo
};

// The object that is standing before **the dot**
// is what this keyword will be bound to.
simpleObj.foo();

let fooFunc = simpleObj.foo;

// references the foo function and hence this will point to
// window object in this case as it is same as window.foo()
fooFunc();
```

## 3. Explicit binding

* We explicitly say to a function what object it should use for this — using functions such as call, apply and bind

* The apply function is similar to call with the difference that the function arguments are passed as an array.

* The bind function creates a new function that will act as the original function but with this predefined.

```javascript
var name = 'Window';

function foo() {
  // prints Window
  console.log(this.name);
}

let simpleObj = {
  name: 'Object',
  foo: foo
};

let fooFunc = simpleObj.foo;

fooFunc.call(simpleObj);
fooFunc.apply(simpleObj);

let fooBind = foo.bind(simpleObj);
fooBind();
```

## 4. `new` binding

When the function is called with `new` operator the following things happen:

1- An empty object is created and referenced by `this` variable, inheriting the prototype of the function.

2- Properties and methods are added to the object referenced by `this`.

3- The newly created object referenced by this is returned at the end implicitly if no other object was returned explicitly).

```javascript
function Foo() {

  // `this` in this context is equivalent to
  // let this = {}';

  // name property added to the object created
  this.name = "John";
  // greet function added to `this` object
  this.greet = function() {
    return `I am ${name}`;
  }

  // Implicitly returns `this` when used with `new`
}

let foo = new Foo()
console.log(foo.greet());
```

## Binding priority

* `new` Binding - Highest
* Explicit binding
* Implicit binding.
* Default binding - Lowest

**NOTE** -  These rules donot apply to arrow functions.

## Arrow functions and `this` binding

```javascript
const outerThis = this;

// this here always refers to the lexical scope.
const func = () => {
    console.log(this === outerThis);
};

// raises error. new cannot be used with arrow functions
new func();
func.call(null);        //true
func.apply(undefined);  //true
func.bind({})();       //true
```

---

## `this` behavior

`this` behaves differently as below. The value of `this` is usually determined by a function's invocation context.

1. The value of this is usually determined by a functions execution context.

2. In the global scope, `this` refers to the global object (the window object).

3. The object that is standing before the dot is what the `this` keyword will be bound to.

4. We can set the value of this explicitly with `call()`, `bind()`, and `apply()`

5. When the `new` keyword is used(a constructor), `this` is bound to the new object being created.

6. Arrow Functions don’t bind `this` — instead, this is bound lexically (i.e. based on the original context)

## Access class data from within callbacks

### 1. Using self

```javascript
function MyConstructor(data, transport) {
    this.data = data;
    var self = this;
    transport.on('data', function () {
        alert(self.data);
    });
}
```

### 2. Using [`bind()`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

```javascript
function MyConstructor(data, transport) {
    this.data = data;
    transport.on('data',(function() {
        alert(this.data);
    }).bind(this);
```

### 3. Using [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```javascript
function MyConstructor(data, transport) {
    this.data = data;
    transport.on('data',()=> {
        alert(this.data);
    });
}
```

**NOTE**: Arrow function approach is preferred.

## Example of issues with `this` usage

* `this` referring to the window object.

```javascript
class SimpleClass {
  constructor(message) {
    this.message = message;
    setTimeout(this.asyncGreet, 10);
  }
  
  asyncGreet() {
    // In this scenario, `this` refers to the window object
    console.log(`Message: ${this.constructor.name}`);
    console.log(`Message: ${this.message}`);  // prints undefined
  }
  
}

let obj = new SimpleClass("Hello World");
```

* Passing a function as callback.

```javascript
class SimpleClass {
  constructor(message) {
    this.message = message;

    // Here the function will be invoked by setTimeout
    // and this will not refer to the object of SimpleClass
    // Error: this.asyncGreet is not a function
    setTimeout(function() {
      this.asyncGreet();
    }, 10);
  }
  
  asyncGreet() {
    console.log(`Message: ${this.constructor.name}`);
    console.log(`Message: ${this.message}`);
  }
  
}

let obj = new SimpleClass("Hello World");
```

* Passing arrow function as callback. (Solves the problem)

```javascript
class SimpleClass {
  constructor(message) {
    this.message = message;

    // Within arrow function `this` takes the lexical scope
    setTimeout(() => {
      this.asyncGreet();
    }, 10);
  }
  
  asyncGreet() {
    // In this scenario, `this` refers to the SimpleClass object
    console.log(`Message: ${this.constructor.name}`);
    console.log(`Message: ${this.message}`);
  }
  
}

let obj = new SimpleClass("Hello World");
```

---

## References

* [`this` keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
* [JS function invocation](https://www.w3schools.com/js/js_function_invocation.asp)
* [How to access the correct `this` inside a callback?](https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback)
* [Javascript ‘this’ Keyword, How it works?](https://medium.com/tech-tajawal/javascript-this-4-rules-7354abdb274c)
