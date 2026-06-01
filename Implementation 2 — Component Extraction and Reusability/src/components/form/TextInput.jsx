export default function TextInput({
    label,
    icon,
    id,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
}) {
    return (
        <div className="flex flex-col gap-2 group">
            <label
                htmlFor={id}
                className="font-code-snippet text-code-snippet text-on-surface-variant group-focus-within:text-primary-container transition-colors"
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <span
                        className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors text-[20px]"
                    >
                        {icon}
                    </span>
                )}

                <input
                    autoComplete="off"
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary-container focus:ring-0 pl-8 pr-4 py-3 font-code-snippet text-code-snippet text-on-surface placeholder-on-secondary-container/30 transition-colors outline-none rounded-none tracking-[0.2em]"
                />
            </div>

            {error && (
                <p className="text-red-400 text-xs mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}