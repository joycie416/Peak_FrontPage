import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="h-10 rounded-[4px] px-[10px] py-[30px] font-[16px]"
    >
      {children}
    </button>
  );
};

export default Button;
