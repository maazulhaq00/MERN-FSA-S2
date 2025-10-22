import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <OwlCarousel
          className="partner-logo owl-theme"
          loop
          margin={10}
          items={6}
          autoplay
          autoplayTimeout={3000}
          dots={false}
          nav={false}
        >
          {["logo-1", "logo-2", "logo-3", "logo-4", "logo-5", "logo-6"].map((logo, index) => (
            <a href="#" className="pl-table" key={index}>
              <div className="pl-tablecell">
                <img src={`/assets/img/partner-logo/${logo}.png`} alt={`Partner ${index + 1}`} />
              </div>
            </a>
          ))}
        </OwlCarousel>

        <div className="row">
          <div className="col-lg-12">
            <div className="footer-text">
              <div className="ft-logo">
                <a href="#" className="footer-logo">
                  <img src="/assets/img/footer-logo.png"  />
                </a>
              </div>
              <ul>
                <li>
           <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
           <Link to="/shedules">Shedules</Link>
          </li>
          <li>
           <Link to="/expos">Expos</Link>
          </li>
          <li>
           <Link to="/booths">Booths</Link>
          </li>
         
          <li>
           <Link to="/contact">Contact</Link>
          </li>
              </ul>
              <div className="copyright-text">
                <p>
                  Copyright &copy; {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
              <div className="ft-social">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-youtube-play"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
