import PropertyCard from "./PropertyCard";

type Props = {
  properties: any[];
};

export default function PropertyGrid({ properties }: Props) {
  return (
    <div className="section section-properties">
      <div className="container">
        <div className="row">
          {properties.map((property) => (
            <div
              key={property.id}
              className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}