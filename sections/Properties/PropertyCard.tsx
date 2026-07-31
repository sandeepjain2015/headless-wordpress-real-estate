import Image from "next/image";
import Link from "next/link";

type Property = {
  slug: string;
  title: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
  propertyDetail: {
    price?: string;
    bedroom?: number;
    bathroom?: number;
    area?: number;
  };
};

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  console.log("PROPERTY card data:", property);

  const image =
    property?.featuredImage?.node?.sourceUrl || "/images/img_1.jpg";
console.log("IMAGE:", image);
  return (
    <div className="property-item mb-30">
      <Link href={`/properties/${property.slug}`} className="img">
        <Image
          src={image}
          alt={property.title}
          width={412}
          height={300}
          className="img-fluid"
        />
      </Link>

      <div className="property-content">
        <div className="price mb-2">
          <span>{property.propertyDetail?.price}</span>
        </div>

        <div>
          <span className="d-block mb-2 text-black-50">
            {property.title}
          </span>

          <div className="specs d-flex mb-4">
            {property.propertyDetail?.bedroom && (
              <span className="d-flex align-items-center me-3">
                <span className="icon-bed me-2"></span>
                <span className="caption">
                  {property.propertyDetail.bedroom} Beds
                </span>
              </span>
            )}

            {property.propertyDetail?.bathroom && (
              <span className="d-flex align-items-center me-3">
                <span className="icon-bath me-2"></span>
                <span className="caption">
                  {property.propertyDetail.bathroom} Baths
                </span>
              </span>
            )}

            {property.propertyDetail?.area && (
              <span className="d-flex align-items-center">
                <span className="icon-expand me-2"></span>
                <span className="caption">
                  {property.propertyDetail.area} Sq.ft
                </span>
              </span>
            )}
          </div>

          <Link
            href={`/property/${property.slug}`}
            className="btn btn-primary py-2 px-3"
          >
            See details
          </Link>
        </div>
      </div>
    </div>
  );
}