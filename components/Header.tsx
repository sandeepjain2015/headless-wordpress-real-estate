import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      {/* Mobile Menu */}
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close">
            <span className="icofont-close js-menu-toggle"></span>
          </div>
        </div>

        <div className="site-mobile-menu-body"></div>
      </div>

      {/* Main Navigation */}
      <nav className="site-nav">
        <div className="container">
          <div className="menu-bg-wrap">
            <div className="site-navigation">

              {/* Logo */}
              <Link href="/" className="property-logo">
                <Image
                  src="/images/tikamgarh-properties-logo.png"
                  alt="Tikamgarh Properties"
                  width={190}
                  height={70}
                  priority
                  className="property-logo-image"
                />
              </Link>

              {/* Desktop Menu */}
              <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end property-menu">

                <li className="active">
                  <Link href="/">Home</Link>
                </li>

                <li className="has-children checkagain">
                  <Link href="/properties">
                    Properties
                  </Link>

                  <ul className="dropdown">
                    <li>
                      <Link href="/agent-dashboard/properties/new">
                        Add new property
                      </Link>
                    </li>

                    <li>
                      <Link href="/agent-dashboard">
                        Agent Dashboard
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link href="/services">Services</Link>
                </li>

                <li>
                  <Link href="/about">About</Link>
                </li>

                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>

                <li>
                  <Link href="/login">Login</Link>
                </li>

              </ul>

              {/* Mobile Toggle */}
              <a
                href="#"
                className="burger light me-auto float-end mt-1 site-menu-toggle js-menu-toggle d-inline-block d-lg-none"
                data-toggle="collapse"
                data-target="#main-navbar"
              >
                <span></span>
              </a>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}