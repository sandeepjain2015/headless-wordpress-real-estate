import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import PropertySection from "@/sections/PopularProperties/PropertySection";
import TestimonialSection from "@/sections/Testimonial/TestimonialSection";
import HeroSection from "@/sections/HeroSection";
import AgentSection from "@/sections/AgentSection";
import AgentCTA from "@/components/AgentCTA/AgentCTA";
export default function Home() {
  return (
    <>
      <HeroSection />

    <PropertySection />

    <section className="features-1">
      <div className="container">
        <div className="row">
          <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div className="box-feature">
              <span className="flaticon-house"></span>
              <h3 className="mb-3">Our Properties</h3>
              <p>
                Explore residential and commercial properties available across Tikamgarh.
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
            <div className="box-feature">
              <span className="flaticon-building"></span>
              <h3 className="mb-3">Property for Sale</h3>
              <p>
                Find houses, plots, and commercial properties that match your needs and budget.
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div className="box-feature">
              <span className="flaticon-house-3"></span>
              <h3 className="mb-3">Real Estate Agent</h3>
              <p>
                Connect with local property experts for reliable guidance and assistance.
              </p>
            </div>
          </div>
          <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="600">
            <div className="box-feature">
              <span className="flaticon-house-1"></span>
              <h3 className="mb-3">House for Sale</h3>
              <p>
                Discover houses for sale in Tikamgarh at different locations and price ranges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

   <TestimonialSection section_title='Customer Says'/>

    <div className="section section-4 bg-light">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-5">
            <h2 className="font-weight-bold heading text-primary mb-4">
              Let's find home that's perfect for you
            </h2>
            <p className="text-black-50">
              Discover the right property in Tikamgarh with trusted listings, local expertise, and guidance at every step.
            </p>
          </div>
        </div>
        <div className="row justify-content-between mb-5">
          <div className="col-lg-7 mb-5 mb-lg-0 order-lg-2">
            <div className="img-about dots">
              <Image
  src="/images/hero_bg_3-optimized.webp"
  alt="Residential property in Tikamgarh"
  width={679}
  height={543}
  sizes="(max-width: 768px) 100vw, 679px"
  className="img-fluid"
/>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-home2"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">12 Properties</h3>
                <p className="text-black-50">
                  Discover the right property in Tikamgarh with trusted listings, local expertise, and guidance at every step.
                </p>
              </div>
            </div>

            <div className="d-flex feature-h">
              <span className="wrap-icon me-3">
                <span className="icon-person"></span>
              </span>
              <div className="feature-text">
                <h3 className="heading">Top Rated Agents</h3>
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
                <h3 className="heading">Legit Properties</h3>
                <p className="text-black-50">
                  Enjoy a simple and transparent process for finding, buying, or selling your property.
                </p>
              </div>
            </div>
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

    <AgentCTA />
    <AgentSection />
    
    </>
  );
}
