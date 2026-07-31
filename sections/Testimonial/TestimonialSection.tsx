import { fetchGraphQL } from "@/lib/wordpress";
import { GET_TESTIMONIALS_QUERY } from "@/graphql/testimonial";
import TestimonialSlider from "./../../components/TestimonialSlider";
import type { TestimonialsResponse } from "@/types/testimonial";

type TestimonialSectionProps = {
  section_title: string;
};

export default async function TestimonialSection({
  section_title,
}: TestimonialSectionProps) {
  const data = await fetchGraphQL<TestimonialsResponse>(
    GET_TESTIMONIALS_QUERY
  );

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
              testimonials={data.testimonials.nodes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}