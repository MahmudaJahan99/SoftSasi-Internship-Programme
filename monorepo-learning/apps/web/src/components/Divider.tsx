import type { ReactNode } from "react";
import "./Divider.css";

type DividerProps = {
  children?: ReactNode;
};

const Divider = ({ children = "or" }: DividerProps) => {
  return (
    <div className="divider">
      <span>{children}</span>
    </div>
  );
};

export default Divider;
