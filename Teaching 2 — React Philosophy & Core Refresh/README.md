# State-Driven UI & Component Responsibility

In React, the UI should always reflect the current state of the application. State-driven UI means the UI automatically updates whenever the component state changes instead of manually changing the DOM. When state changes:
- React automatically re-renders the UI
- The screen updates dynamically
- No manual DOM manipulation is needed

----------------------------------------------------------------------------------

# Poorly designed components

##  1. The "God" Component (Over-Engineered Reusability)

```
function Dashboard() {
  const [users, setUsers] = useState([]); // Fetch users
  const [theme, setTheme] = useState("dark"); // Handle theme
  const [search, setSearch] = useState(""); // Search filtering
  const [loading, setLoading] = useState(false); // API calls
  const [notifications, setNotifications] = useState([]); // Notifications logic

  return (
    <div>
      {/* 500+ lines of JSX */}
    </div>
  );
}
```

**Problems**
1. Too many responsibilities and it violates the *Single Responsibility Principle*.
2. Difficult to maintain - debug, test, and scale
3. Poor reusability as this logic cannot easily be reused elsewhere.


##  2. The "God" Component (Over-Engineered Reusability)

```
function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Header inputValue={inputValue} />
      <Sidebar inputValue={inputValue} />
      <Footer inputValue={inputValue} />

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
}
```

**Problems**
1. State is lifted too high and is shared with components that may not need it. This causes unnecessary re-renders.
2. Poor component isolation
3. Performance issues because every keystroke re-renders: Header, Sidebar, & Footer

## Mixing UI and Logic

```
function Checkout() {
  const [cart, setCart] = useState([]);

  function calculateTotal() {
    let total = 0;

    for (let item of cart) {
      total += item.price * item.quantity;

      if (item.category === "electronics") {
        total += total * 0.15;
      }

      // Complex discount logic
      // Tax calculations
      // Shipping rules
    }

    return total;
  }

  return (
    <div>
      <h1>Total: {calculateTotal()}</h1>
    </div>
  );
}
```

**Problems**
1. Calculation logic is inside UI component and so it becomes cluttered.
2. Hard to test
3. Poor reusability