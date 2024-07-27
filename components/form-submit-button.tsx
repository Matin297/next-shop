"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import cn from "classnames";

interface FormSubmitButtonProps extends ComponentProps<"button"> {}

export default function FormSubmitButton({
  children,
  className,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      disabled={disabled || pending}
      className={cn("btn btn-primary", className)}
    >
      {pending && <span className="loading loading-spinner loading-sm"></span>}
      {children}
    </button>
  );
}
