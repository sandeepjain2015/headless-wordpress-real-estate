const services = [
  {
    icon: "flaticon-house",
    title: "Quality Properties",
    description:
      "Find premium residential and commercial properties that meet your needs.",
  },
  {
    icon: "flaticon-house-2",
    title: "Top Rated Agents",
    description:
      "Experienced real estate professionals to guide every step of your journey.",
  },
  {
    icon: "flaticon-building",
    title: "Property for Sale",
    description:
      "Browse verified properties available for sale across multiple locations.",
  },
  {
    icon: "flaticon-house-3",
    title: "House for Sale",
    description:
      "Explore modern homes and villas at competitive prices.",
  },
  {
    icon: "flaticon-house-4",
    title: "Property Investment",
    description:
      "Investment opportunities with long-term value and growth.",
  },
  {
    icon: "flaticon-building",
    title: "Property Consulting",
    description:
      "Professional consultation for buying, selling, and investing.",
  },
  {
    icon: "flaticon-house",
    title: "Property Management",
    description:
      "Complete property management solutions for owners.",
  },
  {
    icon: "flaticon-house-1",
    title: "Rental Services",
    description:
      "Helping tenants and landlords find the perfect match.",
  },
];

export default function ServiceGrid() {
  return (
    <div className="section bg-light">
      <div className="container">
        <div className="row">

          {services.map((service, index) => (
            <div
              className="col-6 col-lg-3"
              key={index}
            >
              <div className="box-feature mb-4">

                <span className={`${service.icon} mb-4 d-block`}></span>

                <h3 className="text-black mb-3 font-weight-bold">
                  {service.title}
                </h3>

                <p className="text-black-50">
                  {service.description}
                </p>

                <p>
                  {/* <a href="#" className="learn-more">
                    Read more
                  </a> */}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}