import type { InputHTMLAttributes, ReactNode } from "react";
import "./FormInput.css";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  rightElement?: ReactNode;
};

const FormInput = ({ label, id, rightElement, ...props }: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <div className="input-wrapper">
        <input id={id} {...props} />

        {rightElement && (
          <div className="input-right-element">{rightElement}</div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
