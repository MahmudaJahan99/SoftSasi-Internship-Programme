const SHIPPING = 10
const TAX_RATE = 0.05

const OrderSummary = ({ items }) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax + SHIPPING

    return (
        // Summary
        <aside className="h-fit rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
            <p className="mt-1 text-sm text-slate-500">Derived values from the cart state</p>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Tax (5%)</span>
                    <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-medium text-slate-900">${SHIPPING.toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
                    </div>
                </div>

                <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
                    Proceed to Checkout
                </button>

                <button className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Apply Coupon
                </button>
            </div>
        </aside>
    );
};

export default OrderSummary;