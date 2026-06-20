const Header = () => {
    return (
        <header className='mb-8 flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between'>
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">E-commerce</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Shopping Cart</h1>
                <p className="mt-2 text-sm text-slate-500">Use this as the UI template for your useReducer assignment.</p>
            </div>

            <div className="flex items-center gap-3">
                <label className="relative">
                    <span className="sr-only">Search products</span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-500 sm:w-80"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">⌕</span>
                </label>
                <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800">
                    Checkout
                </button>
            </div>
        </header>);
};

export default Header;