import { fetchGraphQL } from "@/lib/wordpress";
import { GET_PROPERTIES_QUERY } from "@/graphql/property";
import PropertySlider from "../../components/PropertySlider";
type Property = {
  id: string;
  title: string;
  slug: string;
  content?: string;

  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };

  propertyDetails?: {
    price?: string;
    address?: string;
    city?: string;
    state?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
  };
};

type PropertiesResponse = {
  properties: {
    nodes: Property[];
  };
};

export default async function PropertySection() {
  const data = await fetchGraphQL<PropertiesResponse>(GET_PROPERTIES_QUERY);
  console.log("Fetched properties data:", data); // Log the fetched data for debugging

  return (
    <div className="section">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-6">
            <h2 className="font-weight-bold text-primary heading">
              Popular Properties
            </h2>
          </div>
        </div>

        <PropertySlider
          properties={data.properties.nodes}
        />
      </div>
    </div>
  );
}