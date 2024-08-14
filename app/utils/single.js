const FEED_KEY = 'feedKey';

class Single {
  constructor() {
    this.tableHeight = 0;
  }
}
Single.prototype.onTableHeight = function (lh) {
  console.log(lh);
  this.tableHeight = lh;
};

Single.getInstance = (function () {
  let instance;
  return function () {
    instance = instance ? instance : new Single();
    return instance;
  };
})();

const single = Single.getInstance();

export default single;
