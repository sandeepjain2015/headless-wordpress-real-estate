import PageHero from "@/components/PageHero";
import { GET_PAGE } from "@/graphql/page";
import { fetchGraphQL } from "@/lib/wordpress";
import "@/app/styles/gutenberg.css";
import TestimonialSection from "@/sections/Testimonial/TestimonialSection";
import type { PageResponse } from "@/types/graphql";
export default async function AboutPage() {
const data = await fetchGraphQL<PageResponse>(GET_PAGE, {
  uri: "about",
});
console.log('Fetched page data:', data);
  return (
    <>
      <PageHero
        title={data?.page?.title}
        backgroundImage ={data?.page?.featuredImage?.node?.sourceUrl??''}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: data?.page?.title, href: "/about" },
        ]}
      />
   

    <div className="section">
      <div className="container">
        <div className="row text-left mb-5">
          <div className="col-12">
            <h2 className="font-weight-bold heading text-primary mb-4">{data?.page?.title}</h2>
          </div>
          <div
  className="entry-content"
  dangerouslySetInnerHTML={{ __html: data?.page?.content }}
/>

        </div>
      </div>
    </div>

    <div className="section pt-0">
      <div className="container">
        <div className="row justify-content-between mb-5">
          <div className="col-lg-7 mb-5 mb-lg-0 order-lg-2">
            <div className="img-about dots">
              <img src="images/hero_bg_3.jpg" alt="Image" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-home2"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Quality properties</h3>
                <p className="text-black-50">
                  Explore carefully selected properties in Tikamgarh that match different needs and budgets.
                </p>
              </div>
            </div>

            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-person"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Trusted Local Agents</h3>
                <p className="text-black-50">
                  Connect with experienced local agents who provide reliable guidance throughout your property journey.
                </p>
              </div>
            </div>

            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-security"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Easy and safe</h3>
                <p className="text-black-50">
                  Enjoy a simple and transparent process for finding, buying, or selling your property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section pt-0">
      <div className="container">
        <div className="row justify-content-between mb-5">
          <div className="col-lg-7 mb-5 mb-lg-0">
            <div className="img-about dots">
              <img src="images/hero_bg_2.jpg" alt="Image" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-home2"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Quality properties</h3>
                <p className="text-black-50">
                  Explore carefully selected properties in Tikamgarh that match different needs and budgets.
                </p>
              </div>
            </div>

            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-person"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Trusted Local Agents</h3>
                <p className="text-black-50">
                  Connect with experienced local agents who provide reliable guidance throughout your property journey.
                </p>
              </div>
            </div>

            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-security"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Easy and safe</h3>
                <p className="text-black-50">
                  Enjoy a simple and transparent process for finding, buying, or selling your property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="0">
            <img src="images/img_1.jpg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-md-4 mt-lg-5" data-aos="fade-up" data-aos-delay="100">
            <img src="images/img_3.jpg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
            <img src="images/img_2.jpg" alt="Image" className="img-fluid" />
          </div>
        </div>
        <div className="row section-counter mt-5">
          <div
            className="col-6 col-sm-6 col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="counter-wrap mb-5 mb-lg-0">
              <span className="number"
                ><span className="countup text-primary">0</span></span
              >
              <span className="caption text-black-50"># of Buy Properties</span>
            </div>
          </div>
          <div
            className="col-6 col-sm-6 col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="counter-wrap mb-5 mb-lg-0">
              <span className="number"
                ><span className="countup text-primary">0</span></span
              >
              <span className="caption text-black-50"># of Sell Properties</span>
            </div>
          </div>
          <div
            className="col-6 col-sm-6 col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="counter-wrap mb-5 mb-lg-0">
              <span className="number"
                ><span className="countup text-primary">6</span></span
              >
              <span className="caption text-black-50"># of All Properties</span>
            </div>
          </div>
          <div
            className="col-6 col-sm-6 col-md-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="counter-wrap mb-5 mb-lg-0">
              <span className="number"
                ><span className="countup text-primary">3</span></span
              >
              <span className="caption text-black-50"># of Agents</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TestimonialSection section_title='The Team'/>
    </>
  );
}