## 1. Why This Component Structure

The structure follows one responsibility per file:

- **cartReducer.js** owns all state logic. No component decides how state changes — they only say what happened via dispatch.
- **useCart.js** is a custom hook that wraps useReducer and adds localStorage sync. Separating this means App.jsx stays clean, and persistence logic is in one place.
- **CartItem.jsx** is extracted because it's a repeated element. If you render something in a .map(), it belongs in its own component. It receives a single item and dispatch — nothing else.
- **CartList.jsx** manages the list-level concerns: the empty state, the item count label, and the Clear Cart button.
- **OrderSummary.jsx** is the only component with local useState — for the coupon text input. That input value is UI state, not cart state. It doesn't belong in the reducer.
- **App.jsx** is the single source of truth. It holds state and dispatch and passes them down. No Context is needed at this scale — prop drilling two levels is fine and more explicit.

---

## 2. How the Reducer Works
 
The reducer is a **pure function**: `(state, action) => newState`.
 
It receives the current state and an action object, then returns a brand-new state object. It never touches the original.
 
```js
export function cartReducer(state, action) {
  switch (action.type) {
 
    case ACTIONS.INCREMENT:
      return {
        ...state,                          // copy everything
        items: state.items.map((item) =>   // new array
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }  // new object
            : item                                       // untouched ref
        ),
      };
 
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };
 
    case ACTIONS.CLEAR_CART:
      return { ...state, items: [] };
 
    // ... other cases
  }
}
```
 
Each action type maps to exactly one state transition. The `payload` carries just enough data to identify what changed (usually just an `id`).
 
**Selectors** (like `selectTotal`, `selectSubtotal`) are separate pure functions that derive computed values from state. They are not stored in the reducer — they are calculated fresh on every render. This keeps the state shape minimal and avoids storing values that can be derived.
 
---
 
## 3. Why `useReducer` Is a Good Fit
 
`useState` works well when state is a single, independent value. The cart has **interconnected, multi-field state** where many actions affect the same `items` array in structured ways. `useReducer` is the better tool because:
 
| Concern | `useState` | `useReducer` |
|---|---|---|
| Multiple related fields | Requires multiple `useState` calls | One state object |
| Complex update logic | Scattered across event handlers | Centralized in reducer |
| Predictability | Logic lives in components | Logic lives in one file |
| Testing | Must render a component | Call `cartReducer(state, action)` directly |
| Action history / debugging | Hard | Each dispatch is a named action |
 
The rule of thumb: when a state update depends on the previous state **and** involves branching logic (like "if quantity > 1, decrement; else do nothing"), reach for `useReducer`.
 
---

## 4. How State Is Updated Without Mutation
 
React's re-render is triggered by **reference changes**. If you mutate the existing object, the reference stays the same, React sees no change, and the UI doesn't update.
 
Every case in the reducer returns a new object using three immutable patterns:
 
**Spread to copy objects:**
```js
// ❌ Mutation — same reference, React won't re-render
state.items[0].quantity = 2;
 
// ✅ New object — new reference, React re-renders
{ ...item, quantity: item.quantity + 1 }
```
 
**`map` to update one item in an array:**
```js
// Returns a new array. Items that don't match are returned as-is (same ref).
// Items that match get a new object via spread.
state.items.map((item) =>
  item.id === id ? { ...item, quantity: item.quantity + 1 } : item
)
```
 
**`filter` to remove an item:**
```js
// Returns a new array without the removed item.
state.items.filter((item) => item.id !== id)
```
 
**Spread to copy top-level state:**
```js
// Always wrap the result so non-modified fields are preserved.
return { ...state, items: newItems };
```
 
The key insight: `map` and `filter` always return **new arrays**. Spread (`...`) always creates a **new object**. Neither touches the original. React detects the new reference, compares with the previous render, and updates only what changed.
 
---