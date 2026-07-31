import { fetchGraphQL } from "@/lib/wordpress";
import PageHero from "@/components/PageHero";

import { GET_PAGE } from "@/graphql/page";
import { GET_PROPERTIES_QUERY } from "@/graphql/property";

import FeaturedProperties from "@/sections/Properties/FeaturedProperties";
import PropertyGrid from "@/sections/Properties/PropertyGrid";
import { PageResponse } from "@/types/graphql";
import { PropertiesResponse } from "@/types/property";

export default async function PropertiesPage() {
  
  const [pageData, propertyData] = await Promise.all([
    fetchGraphQL<PageResponse>(GET_PAGE, {
      uri: "our-properties",
    }),
    fetchGraphQL<PropertiesResponse>(GET_PROPERTIES_QUERY),
  ]);
const page = pageData.page;
  const properties = propertyData?.properties?.nodes ?? [];

  return (
    <>
      <PageHero
        title= "Properties"
        backgroundImage={
          page?.featuredImage?.node?.sourceUrl ||
          "/images/hero_bg_1.jpg"
        }
         breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties" },
        ]}
      />

      <FeaturedProperties properties={properties} />

      <PropertyGrid properties={properties} />
    </>
  );
}