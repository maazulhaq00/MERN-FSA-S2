import { Link } from 'react-router-dom';

function AboutSection() {
    return ( 
        <section className="home-about-section spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="ha-pic">
          <img src="/assets/img/h-about.jpg" alt="" />
        </div>
      </div>
      <div className="col-lg-6">
      <div className="ha-text">
  <h2>About Us</h2>
  <p>
    Join us at this year’s Expo — a dynamic gathering where businesses, creators,
    and industry leaders converge to showcase their innovations, services, and solutions.
    Explore a diverse range of interactive booths, discover emerging trends, and engage
    in expert-led sessions that spark new ideas and opportunities. Whether you're looking
    to network, learn, or grow your presence, this Expo offers the perfect environment to
    connect and thrive.
  </p>
  <ul>
    <li>✔ Explore industry-specific booths</li>
<li>✔ Attend expert-led keynote sessions</li>
<li>✔ Network with exhibitors and attendees</li>
<li>✔ Stay updated with a detailed event schedule</li>
    
  </ul>
  <Link to="/expos" className="ha-btn">Discover Now</Link>
  {/* <a href="#" className="ha-btn">
    Discover Now
  </a> */}

</div>

      </div>
    </div>
  </div>
</section>

     );
}

export default AboutSection;