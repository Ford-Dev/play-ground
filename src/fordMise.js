export class FordMise {
  constructor(callback) {
    this.status = "Pending";
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    callback(this.resolve, this.reject);
    this._resolveValue = undefined;
    this._nextResolve = undefined;
    this._thenableCallBack = undefined;
  }

  resolve(value) {
    this.status = "Fulfilled";
    this._resolveValue = value;
    this.resolveValue(value);
  }

  resolveValue() {
    if (this._thenableCallBack) {
      const responseOfCallback = this._thenableCallBack(this._resolveValue);
      if (responseOfCallback) {
        if (responseOfCallback.constructor.name === "FordMise") {
          responseOfCallback.then((value) => {
            this._nextResolve(value);
          });
        } else {
          this._nextResolve(responseOfCallback);
        }
      }
    }
  }

  reject() {
    this.status = "Rejected";
  }

  then(callback) {
    this._thenableCallBack = callback;
    if (this.status === "Fulfilled") {
      this.resolveValue();
    }
    return new FordMise((res) => {
      this._nextResolve = res;
    });
  }
}
