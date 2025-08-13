import { HeroSection } from "@/sanity.types";
import Title from "@/components/Title";
import Button from "@/components/Button";

type HeroSectionProps = {
  block: HeroSection;
  index: number;
};

export default function HeroSection({ block }: HeroSectionProps) {
  const { title, link, backgroundImages } = { ...block };
  return (
    <div className="h-screen w-full relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2">
        <div className="w-full h-full bg-amber-100" />
        <div className="w-full h-full bg-amber-200" />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        {title && <Title type="h1">{title}</Title>}
        {link && <Button variant="outline-light">{link.label}</Button>}
      </div>
    </div>
  );
}
