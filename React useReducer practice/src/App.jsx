import { useReducer } from 'react'
import CartList from './components/CartList'
import Header from './components/Header'
import OrderSummary from './components/OrderSummary'
import { cartReducer, initialState } from './store/cartReducer'

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <>
      <Header />

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        <CartList itemCount={state.items.length} items={state.items} dispatch={dispatch} />
        <OrderSummary items={state.items} />
      </div>
    </>
  )
}

export default App
