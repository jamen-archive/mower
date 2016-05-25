# Mower
> Mow through data using a routine of functions.

Mower allows you to define a set of rules that loop and process data.

## Installation
```shell
$ npm install --save mower
```

## Usage
```javascript
var mower = require('mower');
```

### `mower(ruleset, [options])`
Create a mower function.
 - `ruleset` (`Array`): An array containing your function rules.
 - `options` (`Object`): An object containing options for your mower function.
 - `options.context` (any object): The object to initiate as your context.
 - `options.injectable` (`Boolean`): Make the mower function so you can inject rules.
 - `options.rulesReference` (`Boolean`): Make the rules referenceable on the mower function.
 - `options.contextReference` (`Boolean`): Make the context referenceable on the mower function.

Returns a mower function.

### `fn(input, [ctxOptions, injectedRules])` (mower function)
A mower function allows you to process some input with the rules you defined.
  - `input` (anything): The input that gets put in the context.
  - `ctxOptions` (`Object`): Options for the context.
  - `injectedRules` (`Array`): Rules to inject with the original ruleset.

Returns the initialized and processed context.

### `mower.Linear(input)`
The default context object.
 - `input` (linear object, i.e. `String` or `Array`): Input to track over linearly.

## Examples
Here we can make a mower function for turning a binary string into "tokens"
```javascript
var foo = mower([
  function break(ctx, kill) {
    if (ctx.position >= ctx.length) return kill();
  },

  function bit(ctx) {
    var current = ctx.current();
    if (current === '0' || current === '1') {
      current = parseInt(current);
      ctx.output.push({
        type: current ? 'on' : 'off',
        value: current
      });
      return true;
    }
  },

  function unknown(_, kill) {
    return kill(new Error('Unknown token'));
  }
]);
```
```javascript
var result = foo('0110');

console.log(result.output);
// [{ type: 'off', value: 0 },
//  { type: 'on', value: 1 },
//  { type: 'on', value: 1 },
//  { type: 'off', value: 0 }]
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

## License
[MIT](LICENSE) &copy; Jamen Marzonie

[avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
[github]: https://github.com/jamen
