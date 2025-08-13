import { cn } from "@/src/utils/cn";

export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5";

interface TitleProps {
  type: TitleType;
  children: string;
  alignText?: "left" | "center" | "right";
  as?: TitleType | "span";
  className?: string;
  color?: "black" | "dark-blue" | "current";
  lineClamp?: 0 | 1 | 2 | 3 | 4;
}

const Title = ({
  type,
  children,
  alignText,
  as,
  className,
  color,
  lineClamp,
  ...props
}: TitleProps) => {
  const Heading = as ?? type;

  const headingVariants = {
    h1: "text-[4rem]/[1.2]",
    h2: "text-[3rem]/[1.2]",
    h3: "text-[2.25rem]/[1.2]",
    h4: "text-[1.5rem]/[1.2]",
    h5: "text-[1rem]/[1.2]",
  };

  return (
    <Heading
      className={cn("text-current m-0 p-0", headingVariants[type], className)}
      {...props}
    >
      {children}
    </Heading>
  );
};

export default Title;
