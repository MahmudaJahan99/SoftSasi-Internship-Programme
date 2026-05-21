# EVENT LOOP

JavaScript is a language that operates in a single-threaded environment, meaning only one piece of code runs at a given time. The *event loop* enables JavaScript to perform asynchronous operations. The event loop continuously monitors three main components - 
1. **Call Stack** - Synchronous code
2. **Microtask Queue** - High-priority asynchronous tasks (Promises, MutationObserver, queueMicrotask)
3. **Macrotask Queue** - Lower-priority asynchronous tasks (setTimeout, setInterval, I/O operations)

----------------------------------------------------------------------------------

# Microtask vs Macrotask

| Feature | Microtask Queue | Macrotask Queue |
| -------- | -------- | -------- |
| Purpose | Handles high-priority async callbacks | Handles scheduled/background async tasks |
| Runs | Runs after current synchronous code finishes | Runs after current event loop finishes |
| Priority | Higher | Lower |
| Executon Order | All microtasks execute before next macrotask | One macrotask executes per event loop cycle |
| Example | `Promise.then()`, `catch()`, `finally()`, `queueMicrotask()`, `MutationObserver` | `setTimeout()`, `setInterval()`, `setImmediate()` (Node.js), I/O events, UI events |
| Rendering Behavior | Browser rendering waits until microtasks finish | Browser may render between macrotasks |
| Queue Processing | Entire queue drained before moving on | Processes one task, then checks microtasks |
| Executon Order | All microtasks execute before next macrotask | One macrotask executes per event loop cycle |