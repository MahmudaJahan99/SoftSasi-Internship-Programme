import { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { Link, useNavigate } from "react-router";
import FormInput from "@monorepo-learning/ui/FormInput";
import AuthForm from "../components/AuthForm";

type SignUpFieldErrors = Partial<
  Record<"name" | "username" | "email" | "password", string>
>;

type SignUpErrorResponse = {
  error: string;
  details?: Record<string, string[] | undefined>;
};

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    if (password !== confirmPassword) {
      setFieldErrors({ password: "Passwords do not match." });
      return;
    }

    if (!agreeToTerms) {
      setFormError("Please agree to the terms and conditions.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post("/api/users", { name, username, email, password });
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError<SignUpErrorResponse>(error) && error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.details) {
          const nextFieldErrors: SignUpFieldErrors = {};
          for (const [field, messages] of Object.entries(data.details)) {
            if (messages?.[0]) {
              nextFieldErrors[field as keyof SignUpFieldErrors] = messages[0];
            }
          }
          setFieldErrors(nextFieldErrors);
        } else if (status === 409) {
          setFormError(data.error);
        } else {
          setFormError("Something went wrong. Please try again.");
        }
      } else {
        setFormError("Unable to reach the server. Check your connection.");
      }
    } finally {
      setSubmitting(false);
    }
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
      submitText={submitting ? "Creating account…" : "Create account"}
      googleText="Sign up with Google"
      onSubmit={handleSubmit}
      footer={
        <p className="signup-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      }
    >
      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

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
      {fieldErrors.name && <p className="field-error">{fieldErrors.name}</p>}

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
      {fieldErrors.username && (
        <p className="field-error">{fieldErrors.username}</p>
      )}

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
      {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}

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
      {fieldErrors.password && (
        <p className="field-error">{fieldErrors.password}</p>
      )}

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
