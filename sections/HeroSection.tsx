import { fetchGraphQL } from "@/lib/wordpress";
import { GET_HERO_QUERY } from "@/graphql/hero";
import HeroSlider from "@/components/HeroSlider";
type HeroImage = {
  sourceUrl: string;
  altText?: string;
};

type HeroData = {
  slide1?: {
    node?: HeroImage;
  };
  slide2?: {
    node?: HeroImage;
  };
  slide3?: {
    node?: HeroImage;
  };
};

type HeroResponse = {
  page: {
    homepage: HeroData;
  };
};

export default async function HeroSection() {
   const data = await fetchGraphQL<HeroResponse>(GET_HERO_QUERY);

  const hero = data.page.homepage;

  const slides = [
    hero.slide1?.node,
    hero.slide2?.node,
    hero.slide3?.node,
  ].filter(Boolean);

  return <HeroSlider slides={slides} />;
}