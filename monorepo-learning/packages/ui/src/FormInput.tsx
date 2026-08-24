import type { InputHTMLAttributes } from "react";
import "./FormInput.css";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FormInput = ({ label, id, ...props }: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <input id={id} {...props} />
    </div>
  );
};

export default FormInput;