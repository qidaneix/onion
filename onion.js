const middle = [];

function use(fn) {
  middle.push(fn);
}

function compose(middle) {
  return function (ctx) {
    return dispatch(0);
    function dispatch(i) {
      const fn = middle[i];
      if (!fn) return Promise.resolve();
      return fn(ctx, dispatch.bind(null, i + 1));
    }
  };
}

use(async (ctx, next) => {
  console.log("1 start");
  await next();
  console.log("1 end");
});

use(async (ctx, next) => {
  console.log("2 start");
  await next();
  console.log("2 end");
});

use(async (ctx, next) => {
  console.log("3 start");
  await next();
  console.log("3 end");
});

const fn = compose(middle);

fn();
