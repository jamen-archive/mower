exports.mower = function mower(ruleset, options) {
  ruleset = ruleset || [];
  options = options || {};

  var Context = options.context || exports.Linear;
  var max = ruleset.length;

  var procedure = function procedure(input, ctxOptions, inject) {
    var ctx = new Context(input, ctxOptions);
    var rules = ruleset;
    if (options.injectable) {
      rules = rules.concat(inject);
    }

    var kill = {};
    kill.running = true;
    kill.switch = function(err) {
      kill.running = false;
      if (err) {
        throw err;
      }
      return false;
    };

    while (kill.running) {
      for (var i = 0; i < max; i++) {
        var proceed = rules[i](ctx, kill.switch);
        if (proceed) {
          break;
        }
      }
    }

    return ctx;
  };

  if (options.rulesReference) {
    for (var i = 0; i < max; i++) {
      var rule = ruleset[i];
      procedure[rule.name] = rule;
    }
    delete procedure[undefined];
  }

  if (options.contextReference) {
    procedure.Context = Context;
  }

  return procedure;
};

var Linear = exports.Linear = function(input) {
  this.position = 0;
  this.source = input;
  this.length = input.length;
  this.output = [];
};

Linear.prototype.current = function(compare) {
  if (compare) {
    return this.source[this.position] === compare;
  }

  return this.source[this.position];
};
