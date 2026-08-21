

import Image from "next/image";
import Link from "next/link";
export default function PropertyCard({
  featuredImage,
  propertyDetail,
  title,
  slug
}: {
  featuredImage: any;
  propertyDetail: any;
  title: string;
  slug: string;
}) {
  const image =
    featuredImage?.node?.sourceUrl ?? "/images/no-property-image.webp";
  const price = propertyDetail?.price ?? "N/A";
  const bedroom = propertyDetail?.bedroom ?? "N/A";
  const bathroom = propertyDetail?.bathroom ?? "N/A";
  const address = title ?? "N/A";
  return (
    <div className="property-item">
      <Link href={`/property/${slug}`}>
        <Image
          src={image}
          alt={title}
          width={400}
  height={267}
  sizes="(max-width: 768px) 100vw, 400px"
  quality={65}
  className="w-100"
  style={{
    aspectRatio: "3 / 2",
    objectFit: "cover",
  }}
        />
      </Link>

      <div className="property-content">
        <div className="price mb-2"><span>{address}</span></div>
        <div>
          <span className="d-block mb-2 text-black-50"
          >{price}</span>
          <div className="specs d-flex mb-4">
            <span className="d-block d-flex align-items-center me-3">
              <span className="icon-bed me-2"></span>
              <span className="caption">{bedroom?.toString() || 'N/A'} beds</span>
            </span>
            <span className="d-block d-flex align-items-center">
              <span className="icon-bath me-2"></span>
              <span className="caption">{bathroom?.toString() || 'N/A'} baths</span>
            </span>
          </div>

          <Link
            href={`/property/${slug}`}
            className="btn btn-primary py-2 px-3"
          >See details</Link>
        </div>
      </div>
    </div>
  );
}