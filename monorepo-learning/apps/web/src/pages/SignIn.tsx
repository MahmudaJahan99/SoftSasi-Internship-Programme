import { useState } from "react";
import "./SignIn.css";
import { Link } from "react-router";
import FormInput from "@monorepo-learning/ui/FormInput";
import AuthForm from "../components/AuthForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });

    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  return (
    <AuthForm
      eyebrow="Welcome back"
      heading={
        <>
          Sign in to <span>Story Nest</span>
        </>
      }
      subtitle="Continue your journey through stories, ideas, and inspiration."
      submitText="Sign in"
      googleText="Sign up with Google"
      onSubmit={handleSubmit}
      footer={
        <p className="signin-text">
          Don't have an account? <Link to="/signup">Create an account</Link>
        </p>
      }
    >
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        required
      />

      <label className="remember-me">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />

        <span>Remember me</span>

        <a href="/forgot-password" className="forgot-link">
          Forgot password?
        </a>
      </label>
    </AuthForm>
  );
};

export default SignIn;
