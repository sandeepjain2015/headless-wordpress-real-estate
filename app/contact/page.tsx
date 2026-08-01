import { fetchGraphQL } from "@/lib/wordpress";
import { GET_PAGE } from "@/graphql/page";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import type { PageResponse } from "@/types/graphql";
export default async function ContactPage() {
  const data = await fetchGraphQL<PageResponse>(GET_PAGE, {
    uri: "contact",
  });

  const page = data.page;

  return (
    <>
      <PageHero
        title={page.title}
        backgroundImage={page.featuredImage?.node?.sourceUrl?? ''}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: page.title },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="contact-info">
                <div className="address mt-2">
                  <i className="icon-room"></i>
                  <h4 className="mb-2">Location</h4>
                  <p>
                    Tikamgarh,
                    <br />
                    Madhya Pradesh, India
                  </p>
                </div>

                <div className="open-hours mt-4">
                  <i className="icon-clock-o"></i>
                  <h4 className="mb-2">Working Hours</h4>
                  <p>
                    Monday - Saturday
                    <br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>

                <div className="email mt-4">
                  <i className="icon-envelope"></i>
                  <h4 className="mb-2">Email</h4>
                  <p><a href="mailto:mr.sandeepmcscet@gmail.com">mr.sandeepmcscet@gmail.com</a></p>
                </div>

                <div className="phone mt-4">
                  <i className="icon-phone"></i>
                  <h4 className="mb-2">Phone</h4>
                  <p><a href="tel:+918287660417">+91 8287660417</a></p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
             <ContactForm />
            </div>
          </div>

          {/* Gutenberg Content */}
          {page.content && (
            <div className="row mt-5">
              <div className="col-lg-12">
                <div
                  className="entry-content"
                  dangerouslySetInnerHTML={{
                    __html: page.content,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}