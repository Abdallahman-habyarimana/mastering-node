// const p = Promise.resolve({ id:1})
// p.then(result => console.log(result))

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Async operation 1...");
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Async operation 2...");
  }, 2000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));
