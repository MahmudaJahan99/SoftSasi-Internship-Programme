import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router";
import FormInput from "@monorepo-learning/ui/FormInput";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    console.log({
      name,
      username,
      email,
      password,
    });
  };

  return (
    <AuthForm
      eyebrow="Join the nest"
      heading={
        <>
          Create your <span>Story Nest</span> account
        </>
      }
      subtitle="Find your voice, share your ideas, and discover stories worth reading."
      submitText="Create account"
      googleText="Sign up with Google"
      onSubmit={handleSubmit}
      footer={
        <p className="signup-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      }
    >
      <FormInput
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoComplete="name"
        required
      />

      <FormInput
        id="username"
        label="Username"
        type="text"
        placeholder="@johndoe"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        autoComplete="username"
        required
      />

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
        autoComplete="new-password"
        required
        minLength={8}
      />

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Enter your password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        autoComplete="new-password"
        required
      />

      <label className="terms">
        <input
          type="checkbox"
          checked={agreeToTerms}
          onChange={(event) => setAgreeToTerms(event.target.checked)}
          required
        />

        <span>
          I agree to the{" "}
          <a href="/terms">Terms of Service and Privacy Policy</a>.
        </span>
      </label>
    </AuthForm>
  );
};

export default SignUp;
