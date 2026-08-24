import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;