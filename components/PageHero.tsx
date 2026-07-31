import Link from "next/link";
export default function PageHero({
  title,
  backgroundImage,
  breadcrumbs,
}: {
  title: string;
  backgroundImage: string;
  breadcrumbs: { label: string; href?: string }[];
}) {
  return (
    <div
      className="hero page-inner overlay"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-9 text-center mt-5">
            <h1 className="heading">{title}</h1>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                {breadcrumbs.map((item, index) => (
                  <li
                    key={index}
                    className={`breadcrumb-item ${
                      !item.href ? "active text-white-50" : ""
                    }`}
                    aria-current={!item.href ? "page" : undefined}
                  >
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}