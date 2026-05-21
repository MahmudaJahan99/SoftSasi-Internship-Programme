console.log("Start");

setTimeout(() => {
  console.log("Macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("Microtask");
});

console.log("End");

// Expected Output :- Start Macrotask Microtask End
// Actual Output :- Start End Microtask Macrotask
