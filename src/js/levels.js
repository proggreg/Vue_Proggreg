
function gregsModule() {
  this.setup = function() {
    console.log('hello');
  }

  this.draw = function() {
    console.log('drawing');
  }
}

module.exports = gregsModule;

