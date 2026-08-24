import type { FormHTMLAttributes, ReactNode } from "react";
import Button from "@monorepo-learning/ui/Button";
import "./AuthForm.css";
import Divider from "./Divider";

type AuthFormProps = FormHTMLAttributes<HTMLFormElement> & {
  eyebrow: string;
  heading: ReactNode;
  subtitle: string;
  children: ReactNode;
  submitText: string;
  googleText: string;
  footer: ReactNode;
};

const AuthForm = ({
  eyebrow,
  heading,
  subtitle,
  children,
  submitText,
  googleText,
  footer,
  ...formProps
}: AuthFormProps) => {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <div className="brand-mark">S</div>

          <p className="eyebrow">{eyebrow}</p>

          <h1>{heading}</h1>

          <p className="subtitle">{subtitle}</p>
        </div>

        <form className="auth-form" {...formProps}>
          {children}

          <Button type="submit" className="signup-button">
            {submitText}
            <span className="btn-arrow">→</span>
          </Button>
        </form>

        <Divider />

        <Button type="button" className="ghost-button">
          <span className="google-icon">G</span>
          {googleText}
        </Button>

        {footer}
      </section>

      <div className="decorative-orb orb-one" />
      <div className="decorative-orb orb-two" />
    </main>
  );
};

export default AuthForm;
