import Image from "next/image";
type Testimonial = {
  id: string;
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  testimonialDetails?: {
    designation?: string;
  };
};
export default function TestimonialCard({testimonial}: { testimonial: Testimonial }) {
    return (
        <div className="item" key={testimonial.id}>
            <div className="testimonial">
                <figure className="mb-4">
                    <Image
                              
                              src={
    testimonial.featuredImage?.node?.sourceUrl ??
    "/images/no-property-image.webp"
  }
  alt={
    testimonial.featuredImage?.node?.altText ??
    testimonial.title
  }
                              
                              width={100}
                              height={100}
                              className="img-fluid mb-3"
                              style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      
                            />
                    
                    <p>{testimonial.title}</p>
                    <p className="text-muted">{testimonial.testimonialDetails?.designation}</p>
                </figure>
                <div>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: testimonial.content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}