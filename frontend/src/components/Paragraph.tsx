import type { ReactNode } from "react";
import { cn } from "@/src/utils/cn";

export type ParagraphColorType = "black" | "currentColor";

export type ParagraphVariantType = "text-M-light";

interface ParagraphType {
  type: ParagraphVariantType;
  color?: ParagraphColorType;
  children?: ReactNode;
  lineClamp?: 0 | 1 | 2 | 3 | 4 | 5;
  alignText?: "left" | "center" | "right";
  as?: "span" | "p";
  className?: string;
}

const Paragraph = ({
  type,
  color = "black",
  children,
  lineClamp = 0,
  alignText = "left",
  as = "p",
  className,
  ...props
}: ParagraphType) => {
  const colorVariants = {
    black: "text-base-black-100",
    currentColor: "text-current",
  };

  const alignmentVariants = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const lineClampVariants = {
    0: "",
    1: "line-clamp-1 text-ellipsis",
    2: "line-clamp-2 text-ellipsis",
    3: "line-clamp-3 text-ellipsis",
    4: "line-clamp-4 text-ellipsis",
    5: "line-clamp-5 text-ellipsis",
  };

  const fontSizeVariants = {
    "text-M-light": "text-base/[1.4] font-light",
  };

  const Component = as;

  return (
    <Component
      className={cn(
        "m-0 p-0",
        colorVariants[color],
        alignmentVariants[alignText],
        lineClampVariants[lineClamp],
        fontSizeVariants[type],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Paragraph;
