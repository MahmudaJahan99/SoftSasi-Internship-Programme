import { useState } from "react";

export default function CubicSecPortal() {
    const [formData, setFormData] = useState({
        secureId: "",
        rsaToken: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove error while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }

    // Validation
    function validate() {
        const newErrors = {};

        if (!formData.secureId.trim()) {
            newErrors.secureId = "Secure ID is required";
        }

        if (!formData.rsaToken.trim()) {
            newErrors.rsaToken = "RSA Token is required";
        } else if (formData.rsaToken.length < 6) {
            newErrors.rsaToken =
                "RSA Token must be at least 6 characters";
        }

        return newErrors;
    }

    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        setTimeout(() => {
            alert("Authentication Successful");

            setLoading(false);

            setFormData({
                secureId: "",
                rsaToken: "",
            });
        }, 1500);
    }

    return (
        <div className="bg-surface-container-lowest text-on-surface font-body-sm min-h-screen relative flex flex-col items-center justify-center p-6 antialiased overflow-hidden">
            <div className="scanline-overlay"></div>
            {/* Background Grid Effect */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
      linear-gradient(#ffd700 1px, transparent 1px),
      linear-gradient(90deg, #ffd700 1px, transparent 1px)
    `,
                    backgroundSize: "24px 24px",
                }}
            ></div>

            <main className="relative z-10 w-full max-w-sm flex flex-col gap-8 items-center">
                {/* Branding Header */}
                <div className="text-center flex flex-col items-center gap-2 w-full">
                    <img
                        alt="CubicSec Logo"
                        className="w-20 h-20 object-contain mb-2"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLWeBt2JUFXYApzY9mWChyhFgKoJhVwW24cvkxQFqFObbIma7akbKO5fllXX4566XFsh9mzhNcfOG4C5oK8zzsa8cQpkoJ8mrcBK3MAkHMX8VT5dGABdqjFxKnY-EEmuN6YG7sF566j90wTcaEtrcNi125KeLiT72rkJEVLox0WFTX2sC28sIDWsxR8uXVMZy21Ucs-BlrtE-Atl-CMFrZqEPIS6hA7sMmfRdEZ_mOD_kbCsOKnRn6A6C8O8B0zCD0cSEairhkFWE"
                    />
                    <h1
                        className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary-container tracking-tighter uppercase"
                    >
                        CubicSec
                    </h1>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">
                        Secure Access Portal
                    </p>
                </div>

                {/* Authentication Protocol Card */}
                <div
                    className="w-full bg-surface-container border border-surface-container-high rounded-none relative overflow-hidden amber-glow flex flex-col"
                >
                    {/* Corner Brackets */}
                    <div
                        className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary-container"
                    ></div>
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary-container"
                    ></div>

                    {/* Card Header */}
                    <div
                        className="border-b border-surface-container-high p-4 flex justify-between items-center bg-surface-container-low"
                    >
                        <h2
                            className="font-label-caps text-label-caps text-primary-fixed uppercase tracking-widest flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]"
                            >shield_lock</span
                            >
                            Auth Protocol
                        </h2>

                        {/* Status Chip */}
                        <div
                            className="border border-outline px-2 py-1 flex items-center gap-2 bg-surface-container-lowest"
                        >
                            <div
                                className="w-2 h-2 bg-primary-container rounded-full animate-pulse"
                            ></div>
                            <span
                                className="font-code-snippet text-[10px] text-primary-container uppercase tracking-wider"
                            >Awaiting Handshake</span
                            >
                        </div>
                    </div>

                    {/* Form Body */}
                    <form
                        className="p-4 flex flex-col gap-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-2 group">
                            <label
                                className="font-code-snippet text-code-snippet text-on-surface-variant group-focus-within:text-primary-container transition-colors"
                                htmlFor="secure_id"
                            >SECURE_ID</label
                            >
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors text-[20px]"
                                >fingerprint</span
                                >
                                <input
                                    autoComplete="off"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary-container focus:ring-0 pl-8 pr-4 py-3 font-code-snippet text-code-snippet text-on-surface placeholder-on-secondary-container/30 transition-colors outline-none rounded-none"
                                    id="secure_id"
                                    name="secureId"
                                    value={formData.secureId}
                                    onChange={handleChange}
                                    placeholder="Enter operator ID"
                                    type="text"
                                />

                                {errors.secureId && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.secureId}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 group">
                            <label
                                className="font-code-snippet text-code-snippet text-on-surface-variant group-focus-within:text-primary-container transition-colors"
                                htmlFor="rsa_token"
                            >RSA_TOKEN</label
                            >
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors text-[20px]"
                                >key</span
                                >
                                <input
                                    autoComplete="off"
                                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary-container focus:ring-0 pl-8 pr-4 py-3 font-code-snippet text-code-snippet text-on-surface placeholder-on-secondary-container/30 transition-colors outline-none rounded-none tracking-[0.3em]"
                                    id="rsa_token"
                                    name="rsaToken"
                                    value={formData.rsaToken}
                                    onChange={handleChange}
                                    placeholder="******"
                                    type="password"
                                />

                                {errors.rsaToken && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.rsaToken}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="pt-2">
                            <button
                                className="w-full bg-primary-container text-on-primary font-label-caps text-label-caps uppercase py-4 px-6 hover:bg-primary-fixed-dim transition-all duration-300 rounded-none border border-primary-container flex justify-center items-center gap-2 hover:amber-glow-strong group"
                                id="login-btn"
                                type="submit"
                            >
                                {loading ? "INITIALIZING..." : "Execute Sequence"}
                                <span className="material-symbols-outlined text-[20px]"
                                >lock_open</span
                                >
                            </button>
                        </div>
                    </form>

                    {/* Terminal Log Footer */}
                    <div
                        className="bg-surface-container-lowest p-3 border-t border-surface-container-high font-code-snippet text-[10px] text-on-surface-variant leading-tight h-20 overflow-hidden relative"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-10"
                        ></div>
                        <ul className="flex flex-col gap-1 opacity-60">
                            <li className="">&gt; ESTABLISHING SECURE CONNECTION... OK</li>
                            <li className="">&gt; VERIFYING ENCRYPTION PROTOCOL... OK</li>
                            <li className="">&gt; REQUESTING OPERATOR CREDENTIALS...</li>
                            <li className="text-primary-container">
                                &gt; WAITING FOR INPUT<span className="terminal-cursor"></span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="w-full flex flex-col gap-4 items-center text-center px-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <span
                            className="font-code-snippet text-[11px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1"
                        ><span className="material-symbols-outlined text-[14px]">mail</span>
                            support@cubicsec.softsasi.com</span
                        >
                        <span
                            className="font-code-snippet text-[11px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1"
                        ><span className="material-symbols-outlined text-[14px]">call</span>
                            +8801342052023</span
                        >
                    </div>
                    <span
                        className="font-code-snippet text-[11px] text-on-surface-variant uppercase tracking-wider flex items-center gap-1"
                    ><span className="material-symbols-outlined text-[14px]"
                    >location_on</span
                        >
                        Poradaha, Kushtia-7031, Bangladesh</span
                    >
                    <p
                        className="font-code-snippet text-[10px] text-on-surface-variant/60 uppercase tracking-widest mt-2"
                    >
                        CubicSec from Softsasi
                    </p>
                </div>
            </main>

        </div>
    );
}