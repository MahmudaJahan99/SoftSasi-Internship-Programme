import { ACTIONS } from '../store/cartReducer'

const stockStyles = {
    in_stock: { label: "In stock", className: "bg-emerald-50 text-emerald-700" },
    low_stock: { label: "Low stock", className: "bg-amber-50 text-amber-700" },
}

const CartItem = ({ item, dispatch }) => {
    const { label, className } = stockStyles[item.stock]

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {item.emoji}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
                            {label}
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                            ${item.price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-2xl border border-slate-200">
                    <button
                        onClick={() => dispatch({ type: ACTIONS.DECREMENT, payload: { id: item.id } })}
                        className="px-4 py-2 text-lg text-slate-600 hover:bg-slate-50"
                    >−</button>
                    <span className="min-w-10 px-3 py-2 text-center text-sm font-medium">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: { id: item.id } })}
                        className="px-4 py-2 text-lg text-slate-600 hover:bg-slate-50"
                    >+</button>
                </div>
                <button
                    onClick={() => dispatch({ type: ACTIONS.REMOVE, payload: { id: item.id } })}
                    className="text-sm font-medium text-rose-600 hover:text-rose-700"
                >Remove</button>
            </div>
        </article>
    )
}

export default CartItem