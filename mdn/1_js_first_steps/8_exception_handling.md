# Exception handling using try/catch

## Syntax

```javascript
// catch more specific exceptions first and then the more generic ones
try {
  // block of code
} catch(exception1) {

} finally {
  // cleanup code
}
```

Even with return statements inside try and catch clauses, finally block is executed.

Accepted forms of try statement

* try ... finally
* try ... catch
* try ... catch ... finally

## Unconditional exception handling

Below snippet is an example of unconditional catch clause

```javascript
try {
  //block of code
} catch (e) {
  //catches any exception
}
```

## Conditional exception handling

Conditional catch clause that conforms to ECMASCRIPT.

```javascript
try {
  //block of code
} catch (e) {
  if (e instanceof TypeError) {
    // statements to handle TypeError exceptions
  } else if (e instanceof RangeError) {
    // statements to handle RangeError exceptions
  } else if (e instanceof EvalError) {
    // statements to handle EvalError exceptions
  } else {
    // statements to handle any unspecified exceptions
    logMyErrors(e); // pass exception object to error handler
  }
}
```

## Rethrowing the exception

* For rethrowing the caught exception inside the **catch** clause or throwing a new exception from **try** clause, use the **throw** statement.

* Any expression can be thrown using `throw` statement.

```javascript
throw 'Invalid argument';

// throw custom object
throw {
  toString: function() {
    return 'Invalid argument'
  }
}
```

## Return statement inside try block

Return value from return statement inside finally is always the return value of the function.

```javascript
function exceptionHandling() {
  try {
    console.log("Inside try");
    let value = 5/"b";
    console.log(value)

    if(Number.isNaN(value)) {
      throw new Error("Incorrect parameters to divide")
    }

    return value;
  } catch(e) {
    // Error object has name and message properties
    console.log(`Inside catch, Error name:${e.name}`);
    console.log(`Inside catch, Error Message:${e.message}`);
    return 0;
  } finally {
    console.log("Inside finally");
    return 100;
  }
}

console.log(exceptionHandling()) // prints 100 as the return value
```

## Creating custom exceptions

* Define a custom exception class with `name` and `message` properties

```javascript
// object contructor
function CustomException(message) {
  this.name = 'CustomException';
  this.message = message;
}

CustomException.prototype.toString = function() {
  return `${this.name}: ${this.message}`;
}

throw new CustomException('Request failed with status code 500');
```

---

## References

* [try..catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
* [Control flow and exception handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/)Control_flow_and_error_handling
