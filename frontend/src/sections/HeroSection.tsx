import { HeroSection as HeroSectionType } from "@/sanity.types";
import Title from "@/components/Title";

type HeroSectionProps = {
  block: HeroSectionType;
  index: number;
};

export default function HeroSection({ block }: HeroSectionProps) {
  const { title } = { ...block };
  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2">
        <div className="w-full h-full bg-amber-100" />
        <div className="w-full h-full bg-amber-200" />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        {title && <Title type="h1">{title}</Title>}
      </div>
    </div>
  );
}
