# Module import and export using CommonJS

* This style is commonly used in **nodejs**.

## Exporting

* `module.exports` - set of objects that should be available to other modules.

```javascript
// Song.js
function Song(songId, songName) {
  this.id = songId;
  this.name = songName;
  this.playStatus = 'stopped';
}

Song.prototype.play = function() {
  this.playStatus = 'playing';
  alert('playing ' + this.name);
};

Song.prototype.stop = function() {
  this.playStatus = 'stopped';
  alert('stoped ' + this.name);
};

module.exports = Song;
```

## Importing

* `require()` - import those objects exported using `module.exports`

```javascript
// App.js
let Song = require('./song.js');
```

---

## References

* [Module import and export using CommonJS](https://medium.com/@vishwa.efor/javascript-module-exports-require-import-export-define-cc04461f4d5e)
