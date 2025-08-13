import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/src/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "outline-light";
  asChild?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      asChild = false,
      fullWidth,
      children,
      className,
      type = "button",
      disabled,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const Comp = (asChild ? Slot : "button") as ElementType;

    const baseStyle = cn(
      "border-none",
      "block px-4 py-2 font-medium text-base rounded-md",
      "transition-all duration-200 ease-in-out",
      fullWidth && "w-full",
    );

    const variants = {
      "outline-light": cn(
        baseStyle,
        "bg-base-white group-hover:bg-base-black-100",
      ),
    };

    return (
      <Comp
        ref={ref}
        className={cn(variants[variant], className)}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;
