//@ts-nocheck

Promise.allSettled =
  Promise.allSettled ||
  function (promises) {
    let mappedPromises = promises.map((p) => {
      return p
        .then((value) => {
          return {
            status: 'fulfilled',
            value
          };
        })
        .catch((reason) => {
          return {
            status: 'rejected',
            reason
          };
        });
    });
    return Promise.all(mappedPromises);
  };

Promise.prototype.finally =
  Promise.prototype.finally ||
  function finallyPolyfill(callback) {
    var constructor = this.constructor;
    return this.then(
      function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      },
      function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      }
    );
  };

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length >= targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

if (!('toJSON' in Error.prototype)) {
  Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
      var alt = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key];
      }, this);

      return alt;
    },
    configurable: true,
    writable: true
  });
}

if (!Array.prototype.hasOwnProperty('move')) {
  Object.defineProperty(Array.prototype, 'move', {
    value: function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);
    }
  });
}

//Promise serial - to call promises one by one
(function () {
  if (!Promise.series) {
    Promise.series = function (promiseArr) {
      var results = [];
      var len = promiseArr.length;
      var resolver, rejecter;
      var resPromise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejecter = reject;
      });
      var temp;
      function runOne(index) {
        if (index >= len) {
          return resolver(results);
        }
        temp = promiseArr[index];
        temp = !temp.then ? temp() : temp;
        temp.then((res) => {
          results.push(res);
          runOne(index + 1);
        }, rejecter);
      }
      runOne(0);
      return resPromise;
    };
  }
})();
