# Object basics

## Creating objects

Object consists of members each of which are name value pairs. Members are **,** separated, while name and value are separated by **:**

Objects members can be either a **property** or a **method**.

```Javascript
// syntax
// this is example of an object literal
const object = {
  // below members are properties
  member1_name: member1_value,
  member2_name: member2_value,
  // below defined are methods
  member3_name: function() {

  },
  member4_name: function() {
  }
};

const sampleObject = {
  name: {
    first: 'John',
    last: 'Doe'
  },
  age: 30,
  gender: 'male',
  interests: ['skiing', 'music'],
  greeting: function() {
    return "Hi, I am " + this.name.first + " " + this.name.last;
  }
};

// access object properties and methods using **dot** notation
console.log(sampleObject.name.first);
console.log(sampleObject.greeting());

// accessing members using **bracket notation**
// consider object as an associative array
console.log(sampleObject['name']['first']);
console.log(sampleObject['greeting']());

// updating/setting object members
sampleObject.age = 28;

// dynamic member names can be set only using bracket notation
let uniqueIdName = 'UniqueID';
let uniqueIdValue = 'ABCD-EFGH';
sampleObject[uniqueIdName] = uniqueIdValue;
```

## **this** keyword

**this** refers to the current object

Objects communication - **message passing**.

## Constructor function

* Constructor function is Javascript version of class. This function name follows Pascal case(or CamelCase).

```Javascript
function Person(first, last) {
  this.name = {
    first: first,
    last: last
  };
  this.greeting = function() {
    return 'Hi, I am ' + this.name.first + ' ' + this.name.last + '.';
  };
}
const person1 = new Person('John');

// properties can also be added on specific objects
person1.gender = 'male';
console.log(person1.gender);
console.dir(person1);

// Iterate through the methods and properties
for (let p in person1) {
 console.log(p);
}

const person2 = new Person('Jane');
console.log(person2.gender); // undefined
console.dir(person2);
// Iterate through the methods and properties
for (let p in person2) {
 console.log(p);
}
```

## Constructor returning primitive vs object

* Constructor function on invoking with `new` implicitly return an object that inherits from the contructor prototype.

```javascript
// functions have prototype property which is an object
function Test() {
  this.str = 'Hello';
}

console.log(Test.prototype);

let t = new Test();
console.log(t.__proto__ === Test.prototype);
console.log(t.__proto__ === t.constructor.prototype);
```

* **Constructor functions should not return values explicitly using the `return` keyword**. When a constructor function returns a primitive value (one of string, number, boolean, null, undefined), the newly constructed object is still implicitly returned. But if the constructor function returns an object, then newly **constructed object will not be returned**.

```javascript
function Constrctor1() {
  this.str = 'Hello';
  return 'Hello';
}

let obj1 = new Constrctor1();
console.log(obj1.str);
console.log(typeof(obj1));  //not a string but an object

// Constructor function returning object explicitly
function Constrctor2() {  
  this.str = 'Hello';
  return { name: "John" };
}

let obj2 = new Constrctor2();
// type is an object. Object is the explicitly returned object
console.log(typeof(obj2));
console.log(obj2.name); //prints "John"
console.log(obj2.str);  // undefined
```

## Other ways to create object instances

```Javascript
// creates empty object
const p1 = new Object();
p1.name = 'John';
p1.greeting = function() {
    return 'Hi, I am ' + this.name + '.';
};

// passing object literal to the Object constructor
const p2 = new Object({
  name: 'John',
  greeting: function() {
    return "Hi, I am " + this.name.first;
  }
});

// Creating new object based on existing object
const p3 = Object.create(p2);
```

---

## References

* [Javascript object basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics)
