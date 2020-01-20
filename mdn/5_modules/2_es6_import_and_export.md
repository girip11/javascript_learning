# ES6 import and export

## Exporting

* `export` keyword used for exporting

* **Exported modules are in strict mode** whether you declare them as such or not.

```javascript
// Exporting individual features
export let name1, name2, …, nameN; // also var, const
export let name1 = …, name2 = …, …, nameN; // also var, const
export function functionName(){...}
export class ClassName {...}

// Export list
export { name1, name2, …, nameN };

// Renaming exports
export { variable1 as name1, variable2 as name2, …, nameN };

// Exporting destructured assignments with renaming
export const { name1, name2: bar } = o;

// Default exports
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };
```

* We can have one default export per module and any number of named exports per module.

```javascript
// song.js

class Song {
  constructor(songId, songName) {
    this.id = songId;
    this.name = songName;
    this.playStatus = 'stopped';
  }

  play() {
    this.playStatus = 'playing';
    alert('playing ' + this.name);
  }

  stop() {
    this.playStatus = 'stopped';
    alert('stoped ' + this.name);
  }
}

// named export
export {
  Song
};

// or using default export
// export default Song;
```

### Named vs default exports

* Named exports are useful to export several values. During the import, it is mandatory to use the same name of the corresponding object.

* Default export can be imported with any name.

## Re-exporting

* One can create a single module concentrating various exports from various modules

```javascript
export foo from 'bar.js';

// above statement is equivalent to
import foo from 'bar.js';
export foo;
```

## Importing

* `import` keyword used for importing

```javascript
// The module to import from. This is often a relative or
// absolute path name to the .js file containing the module
import defaultExport from "module-name";

import * as name from "module-name";

import { export1 } from "module-name";

import { export1 as alias1 } from "module-name";

import { export1 , export2 } from "module-name";

import { foo , bar } from "module-name/path/to/specific/un-exported/file";

import { export1 , export2 as alias2 , [...] } from "module-name";

import defaultExport, { export1 [ , [...] ] } from "module-name";

// Name of the module object that will be used as
// a kind of namespace when referring to the imports.
// functions, classes in that module will be referred
// as name.function(), name.Class
import defaultExport, * as name from "module-name";

// This runs the module's global code,
// but doesn't actually import any values.
import "module-name";

var promise = import("module-name");
```

* **Imported modules are in strict mode** whether you declare them as such or not.

```javascript
// app.js

"use strict";

import { Song } from './song.js'

// If using default export
// import Song from './song.js'
```

### Dynamic imports

* The import keyword may be called as a function to dynamically import a module. When used this way, it returns a promise.

```javascript
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });

// Alternatively
let module = await import('/modules/my-module.js');
```

---

## References

* [ES6 style import and export](https://medium.com/@vishwa.efor/javascript-module-exports-require-import-export-define-cc04461f4d5e)
* [Javascript export statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
* [Javascript import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
