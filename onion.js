// const middle = [];

// function use(fn) {
//   middle.push(fn);
// }

// function compose(middle) {
//   return function (ctx) {
//     return dispatch(0);
//     function dispatch(i) {
//       const fn = middle[i];
//       if (!fn) return Promise.resolve();
//       return fn(ctx, dispatch.bind(null, i + 1));
//     }
//   };
// }

// use(async (ctx, next) => {
//   console.log("1 start");
//   await next();
//   console.log("1 end");
// });

// use(async (ctx, next) => {
//   console.log("2 start");
//   await next();
//   console.log("2 end");
// });

// use(async (ctx, next) => {
//   console.log("3 start");
//   await next();
//   console.log("3 end");
// });

// const fn = compose(middle);

// fn();

const middleware = [];

const wa = async function (ctx, next) {
  ctx.wa = {
    start: "start wa",
  };
  console.log(ctx);
  await next();
  ctx.wa.end = "end wa";
  console.log(ctx);
};

const wb = async function (ctx, next) {
  ctx.wb = {
    start: "start wb",
  };
  console.log(ctx);
  await next();
  ctx.wb.end = "end wb";
  console.log(ctx);
};

const wc = async function (ctx, next) {
  ctx.wc = {
    start: "start wc",
  };
  console.log(ctx);
  await next();
  ctx.wc.end = "end wc";
  console.log(ctx);
};

function use(fn) {
  middleware.push(fn);
}

function compose(middleware) {
  return (ctx) => {
    function dispatch(i) {
      const fn = middleware[i];
      if (!fn) return Promise.resolve();
      fn(ctx, dispatch.bind(null, i + 1));
    }
    return dispatch(0);
  };
}

use(wa);
use(wb);
use(wc);

const fn = compose(middleware);
fn({});
