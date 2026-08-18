import Link from "next/link";

export default function Header() {
  return (
    <>
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close">
          <span className="icofont-close js-menu-toggle"></span>
        </div>
      </div>
      <div className="site-mobile-menu-body"></div>
    </div>

    <nav className="site-nav">
      <div className="container">
        <div className="menu-bg-wrap">
          <div className="site-navigation">
            <a href="/" className="logo m-0 float-start">Property</a>

            <ul
              className="js-clone-nav d-none d-lg-inline-block text-start site-menu float-end"
            >
              <li className="active"><Link href="/">Home</Link></li>
              <li className="has-children checkagain">
                <Link href="/properties">Properties</Link>
                <ul className="dropdown">
                  <li><Link href="/agent-dashboard/properties/new">Add new property</Link></li>
                </ul>
              </li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>

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