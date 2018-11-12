// setInterval.unref polyfill
// eslint-disable-next-line no-underscore-dangle
const _setInterval = setInterval;

function Timer(t) {
  this.t = t;
}

Timer.prototype.valueOf = function valueOf() {
  return this.t;
};

Timer.prototype.unref = function unref() {
  clearInterval(this.t);
};

window.setInterval = function setInterval(fn, timeout) {
  return new Timer(_setInterval(fn, timeout));
};
