import { InfoSection } from "@/sanity.types";

type HeroSectionProps = {
    block: InfoSection;
    index: number;
};

export default function HeroSection({ block }: HeroSectionProps) {
    return (
        <div className="container my-12">
            image 1
            image 2
        </div>
    );
}
