# Arrow functions (ES6 feature)

* Arrow functions are anonymous functions. This makes debugging harder since the function name is not present in the stacktrace. Also recursive call is not possible.

* If the function body is of single line, `return` keyword is optional and the value of the statement is returned implicitly.

* If the arrow function body contains a block of statements, then `return` keyword is mandatory if the function should return a value.

```javascript
// example to demonstrate the syntax of arrow functions with default arguments
let simpleArrowFunction = (name = 'Jane Doe') => `Hi, ${name}`;

// paranthesis are optional in arrow functions with single parameter
// multiple parameter requires paranthesis
let greeting = message => {
  console.log(message);
};


let arrowFuncNoParam = () => {
  console.log('Hello World');
};

// alternatively with _
let arrowFuncNoParam2 = _ => console.log('Hello World');


greeting(simpleArrowFunction('John Doe'));
greeting(simpleArrowFunction());
```

* Unlike regular functions, arrow functions do not have their own `this`. With arrow functions however, `this` is lexically bound. Since ES6 arrow functions can’t be bound to a `this` keyword, so it will lexically go up a scope, and use the value of this in the scope in which it was defined.

```javascript
var obj = {
  id: 42,
  counter: function counter() {
    setTimeout(() => {
      // this makes sense here since `this` inside the function counter refers to the obj
      console.log(this.id);
    }, 1000);
  }
};

// arrow functions cannot be used as object methods directly with the usage of `this`
var cat = {
  lives: 9,
  jumpsA: () => {
    // this.lives is undefined
    console.log(this.lives);
    this.lives--;
  },
 jumpsF: function() {
    console.log(this.lives);
    this.lives--;
  },  
};

cat.jumpsA();
cat.jumpsF();
```

* **Arrow functions shine best with anything that requires this to be bound to the context, and not the function itself**.

* Regular functions created using function declarations or expressions are **constructible** and **callable**. Since regular functions are constructible, they can be called using the `new` keyword. However, the arrow functions are **only callable and not constructible**.

```javascript
// works fine. Remember constructor functions
let x = function(){
  console.log(arguments);
};
new x =(1,2,3);

// Error
let x = ()=> {
  console.log(arguments);
};
new x(1,2,3);
```

---

## References

* [Arrow Functions](https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/)
