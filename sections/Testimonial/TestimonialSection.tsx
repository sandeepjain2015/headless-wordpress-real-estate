import { fetchGraphQL } from "@/lib/wordpress";
import { GET_TESTIMONIALS_QUERY } from "@/graphql/testimonial";
import TestimonialSlider from "./../../components/TestimonialSlider";
import type { TestimonialsResponse } from "@/types/testimonial";
import type { Testimonial } from "@/types/testimonial";

type TestimonialSectionProps = {
  section_title: string;
  testimonials?: Testimonial[];
};

export default async function TestimonialSection({
  section_title,
  testimonials,
}: TestimonialSectionProps) {
  const fetchedData = testimonials
    ? null
    : await fetchGraphQL<TestimonialsResponse>(GET_TESTIMONIALS_QUERY);
  const items = testimonials ?? fetchedData?.testimonials.nodes ?? [];

  return (
    <div className="section sec-testimonials">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="font-weight-bold heading text-primary mb-4 mb-md-0">
              {section_title}
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4"></div>
        </div>

        <div className="testimonial-slider-wrap">
          <div className="testimonial-slider">
            <TestimonialSlider
              testimonials={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
