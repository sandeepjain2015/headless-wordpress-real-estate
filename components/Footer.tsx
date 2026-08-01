import Link from 'next/link'
export default function Footer() {
  return (
    <>
    <div className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="widget">
              <h3>Contact</h3>
              <address> Tikamgarh, India</address>
              <ul className="list-unstyled links">
                <li><Link href="tel://918287660417">+918287660417</Link></li>
                <li><Link href="tel://917838366235">+917838366235</Link></li>
                <li>
                  <Link href="mailto:mr.sandeepmcscet@gmail.com">mr.sandeepmcscet@gmail.com</Link>
                </li>
              </ul>
            </div>
            {/* <!-- /.widget --> */}
          </div>
          {/* <!-- /.col-lg-4 --> */}
          <div className="col-lg-4">
            <div className="widget">
              <h3>Sources</h3>
              <ul className="list-unstyled float-start links">
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/vision">Vision</Link></li>
                <li><Link href="/mission">Mission</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
              <ul className="list-unstyled float-start links">
                <li><Link href="/partners">Partners</Link></li>
                <li><Link href="/business">Business</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/creative">Creative</Link></li>
              </ul>
            </div>
            {/* <!-- /.widget --> */}
          </div>
          {/* <!-- /.col-lg-4 --> */}
          <div className="col-lg-4">
            <div className="widget">
              <h3>Links</h3>
              <ul className="list-unstyled links">
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/contact">Contact us</Link></li>
              </ul>

              <ul className="list-unstyled social">
                <li>
                  <a href="#"><span className="icon-instagram"></span></a>
                </li>
                <li>
                  <a href="#"><span className="icon-twitter"></span></a>
                </li>
                <li>
                  <a href="#"><span className="icon-facebook"></span></a>
                </li>
                <li>
                  <a href="#"><span className="icon-linkedin"></span></a>
                </li>
                <li>
                  <a href="#"><span className="icon-pinterest"></span></a>
                </li>
                <li>
                  <a href="#"><span className="icon-dribbble"></span></a>
                </li>
              </ul>
            </div>
            {/* <!-- /.widget --> */}
          </div>
          {/* <!-- /.col-lg-4 --> */}
        </div>
        {/* <!-- /.row --> */}

        <div className="row mt-5">
          <div className="col-12 text-center">
            {/* <!-- 
              **==========
              NOTE: 
              Please don't remove this copyright link unless you buy the license here https://untree.co/license/  
              **==========
            --> */}

            <p>
              Copyright &copy;
              {new Date().getFullYear()}
              . All Rights Reserved. &mdash; Designed with love by { }
              <a href="https://sandeepjain.in" target="_blank">Sandeep Jain</a>
              
            </p>
          </div>
        </div>
      </div>
      {/* <!-- /.container --> */}
    </div>
    {/* <!-- /.site-footer --> */}

    {/* <!-- Preloader --> */}
   
    
    </>
  );
}