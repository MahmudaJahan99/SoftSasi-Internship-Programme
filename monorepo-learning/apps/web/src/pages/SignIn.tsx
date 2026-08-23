import { useState, FormEvent } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <main className="signin-page">
      <section className="signin-card">
        <div className="signin-header">
          <div className="brand-mark">S</div>

          <p className="eyebrow">Welcome back</p>

          <h1>
            Sign in to <span>Story Nest</span>
          </h1>

          <p className="subtitle">
            Continue your journey through stories, ideas, and inspiration.
          </p>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>

              <a href="/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button type="submit" className="signin-button">
            Sign in
            <span>→</span>
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button type="button" className="google-button">
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Create an account</a>
        </p>
      </section>

      <div className="decorative-orb orb-one" />
      <div className="decorative-orb orb-two" />
    </main>
  );
};

export default SignIn;
