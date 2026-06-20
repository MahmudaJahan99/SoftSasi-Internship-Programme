import { ACTIONS } from "../store/cartReducer";
import CartItem from "./CartItem";

const CartList = ({ items, dispatch }) => {
    return (
        //    Cart items
        <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Cart Items</h2>
                    <p className="text-sm text-slate-500">3 items in your cart</p>
                </div>
                <button
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                >
                    Clear Cart
                </button>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} dispatch={dispatch} />
                ))}
            </div>
        </section>
    );
};

export default CartList;