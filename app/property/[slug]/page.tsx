import { notFound } from "next/navigation";

import { GET_PROPERTY_QUERY } from "@/graphql/property";
import { fetchGraphQL } from "@/lib/wordpress";
import PropertyGallery from "@/sections/SingleProperty/PropertyGallery";
import PropertyDetails from "@/sections/SingleProperty/PropertyDetails";
import AgentCard from "@/sections/SingleProperty/AgentCard";
import PageHero from "@/components/PageHero";
import {PropertyResponse} from "@/types/property";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;

  const data = await fetchGraphQL<PropertyResponse>(GET_PROPERTY_QUERY, {
      slug: slug,
    });
    
  if (!data?.property) {
    notFound();
  }

  const property = data.property;

  return (
    <>
    <PageHero
            title={property.title}
            backgroundImage={property.featuredImage?.node?.sourceUrl ?? ''}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: property.title },
            ]}
          />
    <div className="section">
  <div className="container">
    <div className="row justify-content-between">

      <div className="col-lg-7">
        <PropertyGallery
          image={property.featuredImage?.node}
        />
      </div>

      <div className="col-lg-4">
        <PropertyDetails property={property} />

        <AgentCard
          agent={property.author?.node}
        />
      </div>

    </div>
  </div>
</div>
</>
  );
}