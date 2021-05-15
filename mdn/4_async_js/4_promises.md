# Asynchronous Programming With Promises

Promise - intermediate state of operation which would be completed(success or failure) in the future.

## Callback hell

```Javascript
chooseToppings(function(toppings) {
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

## Promises offer readability

```Javascript
chooseToppings()
.then(toppings => placeOrder(toppings))
.then(order => collectOrder(order))
.then(pizza => eatPizza(pizza))
.catch(failureCallback);
```

* Promise will succeed(Fulfilled state) or fail(Rejected state) exactly once.
* Callback can be added later for events that completed earlier and still have the callbacks invoked.

* [`then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) can accept functions to execute on either promise fulfill or rejection.

```javascript
// p.then(onFulfilled[, onRejected]);

// onFulfilled, onRejected will be called in async
p.then(value => {
  // fulfillment
}, reason => {
  // rejection
});
```

> Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the current thread loop). The behaviour of the handler function follows a specific set of rules. If a handler function:
>
> * returns a value, the promise returned by then gets resolved with the returned value as its value.
> * doesn't return anything, the promise returned by then gets resolved with an undefined value.
> * throws an error, the promise returned by then gets rejected with the thrown error as its value.
> * returns an already fulfilled promise, the promise returned by then gets fulfilled with that promise's value as its value.
> * returns an already rejected promise, the promise returned by then gets rejected with that promise's value as its value.
> * returns another pending promise object, the resolution/rejection of the promise returned by then will be subsequent to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.

## [Promise `then` vs `catch`](https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/the-catch-method)

* `Promise.then` can accept callbacks for both fulfillment as well as rejection, then do we need to use `catch` method at all?

* Its a good practice to always use `catch` because, if the first promise is fulfilled, when the subsequent `then` clause throws some exception, that can also be handled by the `catch` clause.

![`then(onfulfilled, onrejected)` vs `then(fulfilled).catch(rejected)`](./then_vs_catch.png)

## Promise Example

```Javascript
// fetch returns Response
// https://developer.mozilla.org/en-US/docs/Web/API/Response
fetch('https://httpstat.us/200', {
  headers: {
    accept: 'application/json'
  }
})
.then(response => response.text())
.then(str => console.log(str))
.catch(err => console.log(`Exception: ${err.message}`));
```

**NOTE**: The value returned by a fulfilled promise becomes the parameter passed to the next `.then()` block's executor function.

## Running code after fulfilling multiple promises

`Promise.all()` takes a list of promises and returns a promise that will fulfill only when all the promises are fulfilled.

```Javascript
// syntax
// Logical AND of all promises. even if one promise in the list fails, the entire promise is marked rejected
let a = fetch(url1);
let b = fetch(url2);
let c = fetch(url3);
Promise.all([a, b, c]).then(values => {
  // statements
});
```

## Running promise completion code using finally

Async equivalent of `try/catch/finally`.

```Javascript
// Syntax
myPromise
.then(response => {
  doSomething(response);
})
.catch(e => {
  returnError(e);
})
.finally(() => {
  runFinalCode();
});
```

## Building custom promises

```Javascript
let createPromise = (resolve, reject) => {
// generate a value between 0 and 100
let randomValue = Math.floor(Math.random() * 100) + 1;

console.log(`Generated value: ${randomValue}`)

// max 5 seconds
let waitTimeToComplete = Math.floor(Math.random() * 5000);

console.log(`waitTime: ${waitTimeToComplete}`);

// promise if fulfilled only when the randomValue is even number otherwise rejected.
// on fulfilling returns the random value
setTimeout((randomValue) => {
  if(randomValue % 2 == 0) {
    resolve(randomValue);
  } else {
    // pass the reason to reject
    reject('Generated number was odd');
  }
}, waitTimeToComplete, randomValue);

};

let customPromise = new Promise(createPromise);
customPromise.then((value) => {
  console.log(`Generated Even number: ${value}`);
}).catch(e => {
  console.log(`Exception: ${e}`);
});
```

Real world example is creating a promise that encapsulates XHR call to a webserver and returns the response.

```Javascript
function getXhrRequest(responseCode) {
  let xhrRequest = new XMLHttpRequest();
  xhrRequest.open('GET', 'https://httpstat.us/' + responseCode, true);
  xhrRequest.setRequestHeader('accept', 'application/json');
  return xhrRequest;
};

function promisifyRequest(responseCode) {
  return new Promise((resolve, reject) => {
    let httpRequest = getXhrRequest(responseCode);
    httpRequest.onload = () => {
      if(httpRequest.status == 200) {
        resolve(httpRequest.responseText);
      } else {
        reject(httpRequest.responseText);
      }
    };

    httpRequest.onerror = () => {
      reject(httpRequest.responseText || "Unknown error occurred");
    };

    httpRequest.send();
  });
}

promisifyRequest(200).then(response => {
  console.log(`Response: ${response}`);
}).catch(err => {
  console.log(`Exception: ${err}`);
});
```

## Promises chaining

```javascript
Promise.resolve('foo')
.then(function(string) {
  // This then handler returns a promise.
  // Only when this promise resolves, the next then handler
  // in the chain will execute
  return new Promise(function(resolve, reject) {
  setTimeout(function() {
      string += 'bar';
      resolve(string);
    }, 1);
  });
})
.then(function(string) {
  // In this handler, we set a time based callback to execute later
  // and return immediately. Since the handler returns a value in this
  // case, the promise returned by this then() function will resolve
  // immediately with the returned value.
  setTimeout(function() {
    string += 'baz';
    console.log(string);
  }, 1)
  return string;
})
.then(function(string) {
  console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");

    // Note that `string` will not have the 'baz' bit of
    // it at this point. This is because we mocked that to happen
    // asynchronously with a setTimeout function
    console.log(string);
  });

// Output
// Last Then: oops... didn't bother to instantiate and return a promise in the prior then so the sequence may be a bit surprising
// foobar
// foobarbaz
```

* A promise can be chained to different `then` clauses.

```javascript
var p2 = new Promise(function(resolve, reject) {
  resolve(1);
});

// then on p2
p2.then(function(value) {
  console.log(value); // 1
  return value + 1;
}).then(function(value) {
  console.log(value + ' - A synchronous value works');
});


p2.then(function(value) {
  console.log(`Another then on same promise p2: ${value}`); // 1
});
```

* A `then` call will return a rejected promise if the function throws an error or returns a rejected Promise.

```javascript
Promise.resolve()
  .then(() => {
    // Makes .then() return a rejected promise
    throw new Error('Oh no!');
  })
  .then(() => {
    console.log('Not called.');
  }, error => {
    console.error('onRejected function called: ' + error.message);
  });
```

---

## References

* [Async programming with promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
* [Using `fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
* [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
* [Promise then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#Return_value)
