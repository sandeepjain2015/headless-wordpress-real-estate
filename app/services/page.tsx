import { fetchGraphQL } from "@/lib/wordpress";
import { GET_PAGE } from "@/graphql/page";
import PageHero from "@/components/PageHero";
import ServiceGrid from "@/sections/Services/ServiceGrid";
import TestimonialSection from "@/sections/Testimonial/TestimonialSection";
import { PageResponse } from "@/types/graphql";
export default async function ServicesPage() {
    const data = await fetchGraphQL<PageResponse>(GET_PAGE, {
    uri: "services",
  });

  const page = data.page;
  return (
    <>
      <PageHero
        title={page.title}
        backgroundImage={page.featuredImage?.node?.sourceUrl ?? ''}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: page.title },
        ]}
      />

      <ServiceGrid />

      <TestimonialSection section_title='Customer Says'/>
    </>
  );
}