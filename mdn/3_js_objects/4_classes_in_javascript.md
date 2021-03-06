# Classes

Classes was introduced in ES6. Syntactic sugar over prototypical inheritance.

## Class declaration

Classes are **special functions, but class declarations are never hoisted unlike function declarations**

```Javascript
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }
}

// class declarations should come before using them.
let p = new Person('John', 'Doe', 25, 'male');

```

## Class expressions

Class expressions can be either named or unnamed. Same hoisting rules as the class declarations.

```Javascript
// unnamed class expression
let Person = class {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }
};

console.log(Person.name);

// Named class expression
let AnotherPerson = class Person2 {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }
};

console.log(AnotherPerson.name);
```

## Class methods

Class body is executed in **strict mode**.

* Only one method named **constructor** can be used inside a class.

* **super** keyword to call the constructor of the parent class.

* **static** methods cannot be called on class instances.

```Javascript
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  // getter property
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // This method is referred to as prototype method
  greeting() {
    return Person.greetingMessage(this.fullName);
  }

  // static methods of class
  static greetingMessage(fullName) {
    return `Hi, I am ${fullName}`;
  }
}

let person = new Person('John', 'Doe', 25, 'male');
console.log(person.fullName);
console.log(person.greeting());
console.log(Person.greetingMessage(person.fullName));

// This statement would throw a type error
// since class methods cannot be invoked on instances.
// console.log(person.greetingMessage());
```

## Class properties aka static properties

* Static properties got introduced as part of ES7(ES2016). We need transpiler like **Babel** to use this feature.

```javascript
class Person {
  static count = 0;

  constructor(name, gender, age) {
    this._name = name;
    this.gender = gender;
    this.age = age;

    Person.personCount();
  }

  get name() {
    this._name;
  }

  greeting() {
    return `My name is ${this._name}.I am ${this.age} `;
  }

  static personCount() {
      Person.count++;
  }
}
```

## Boxing inside prototype and static methods

Code inside classes always execute in strict mode. So autoboxing never happens. When a static or prototype method returns **this**, the value is always **undefined**. In prototype based implementation, **this** will be set to the global object in **non-strict mode**.

```Javascript
//  using classes
class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  currentInstance() {
    return this;
  }
}

// prints undefined
console.log(new Person('John', 'Doe', 25, 'male').currentInstance());
```

## Instance properties and class properties

* Instance properties - defined inside class body.
* class level properties - defined outside class body or inside the static functions.

```Javascript
class Person {
  constructor(firstName, lastName) {
    // instance level properties.
    this.firstName = firstName;
    this.lastName = lastName;
    Person.personCount();
  }

  static personCount() {
    if (!Person.count) {
      // class variables declared inside the static method
      Person.count = 1;
    } else {
      Person.count++;
    }
  }
}

// class level property defined outside class
Person.active = 0;
```

## Convention: Marking the fields as private through underscore

This is just a convention. Still those fields can be accessed outside.

```Javascript
class Person {
  constructor(fullName) {
    // instance level properties.
    this._fullName = fullName;
  }

  // Getter
  get fullName() {
    return this._fullName;
  }

  // setter
  set fullName(fullName) {
    this._fullName = fullName;
  }
}
```

## Public and private field declarations

**NOTE**: Private and public field declarations are an experimental feature as of now. But can be used with transpiling tools like [**Babel 7** with stage 3 presets](https://babeljs.io/en/repl).

**NOTE**: Private fields should always be declared upfront

```Javascript
class Person {
  // private fields
  #firstName = '';
  #lastName = '';

  constructor(firstName, lastName) {
    // instance level properties.
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}
```

---

## References

* [Javascript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
