import Image from "next/image";
import type { HomeAgent } from "@/types/home";

type AgentProps = HomeAgent;

export default function AgentCard({
  title,
  content,
  featuredImage,
  agentDetails,
}: AgentProps) {
  const {
    designation,
    twitterUrl,
    facebookUrl,
    linkedinUrl,
    instagramUrl,
  } = agentDetails || {};

  const imageUrl = featuredImage?.node?.sourceUrl;

  return (
    <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
      <div className="h-100 person">

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            className="img-fluid"
            width={300}
            height={300}
          />
        )}

        <div className="person-contents">
          <h2 className="mb-0">
            <a href="#">{title}</a>
          </h2>

          {designation && (
            <div className="meta d-block mb-2">
              {designation}
            </div>
          )}

          {content && (
            <div
              className="meta d-block mb-3"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          )}

          <ul className="social list-unstyled list-inline dark-hover">

            {twitterUrl && (
              <li className="list-inline-item">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-twitter"></span>
                </a>
              </li>
            )}

            {facebookUrl && (
              <li className="list-inline-item">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-facebook"></span>
                </a>
              </li>
            )}

            {linkedinUrl && (
              <li className="list-inline-item">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-linkedin"></span>
                </a>
              </li>
            )}

            {instagramUrl && (
              <li className="list-inline-item">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon-instagram"></span>
                </a>
              </li>
            )}

          </ul>
        </div>
      </div>
    </div>
  );
}
