import HeroSlider from "@/components/HeroSlider";
import type { HomeImage } from "@/types/home";

type HeroData = {
  slide1?: { node?: HomeImage | null } | null;
  slide2?: { node?: HomeImage | null } | null;
  slide3?: { node?: HomeImage | null } | null;
};

export default function HeroSection({ hero }: { hero?: HeroData | null }) {

  const slides: HomeImage[] = [
    hero?.slide1?.node,
    hero?.slide2?.node,
    hero?.slide3?.node,
  ].filter((slide): slide is HomeImage => slide != null);

  return <HeroSlider slides={slides} />;
}
