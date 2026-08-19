import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className="container">
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>Signup</button>
                </div>
                {isLogin ? <>
                <div className="form">
                    <h2>Login Form</h2>
                    <input type="email" name="" id="" placeholder="Email" />
                    <input type="password" name="" id="" placeholder="Password" />
                    <a href="#">Forgot Password</a>
                    <button>Login</button>
                    <p>Not already signed up? <a href="#" onClick={() => setIsLogin(false)}>Signup Now</a></p>
                </div>
                </> : <>
                <div className="form">
                    <h2>Signup Form</h2>
                    <input type="text" name="" id="" placeholder="Name" />
                    <input type="email" name="" id="" placeholder="Email" />
                    <input type="password" name="" id="" placeholder="Password" />
                    <input type="password" name="" id="" placeholder="Confirm Password" />
                    <button>Sign up</button>
                </div>
                </>}
            </div>
        </div>
    );
};

export default AuthForm;