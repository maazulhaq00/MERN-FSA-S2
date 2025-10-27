import { useEffect } from "react";
function Team() {
  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
    });
  }, []);
    return (

        <>
  <section
    className="breadcrumb-section set-bg"
    data-setbg="img/breadcrumb-bg.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb-text">
            <h2>Our Team</h2>
            <div className="bt-option">
              <a href="./index.html">Home</a>
              <span>Our team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Team Section Begin */}
  <section className="team-section team-page spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="team-title">
            <div className="section-title">
              <span>Our Team</span>
              <h2>TRAIN WITH EXPERTS</h2>
            </div>
            {/* <a href="#" className="primary-btn btn-normal appoinment-btn">
              appointment
            </a> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-1.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-2.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-3.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-4.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-5.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6">
          <div className="ts-item set-bg" data-setbg="img/team/team-6.jpg">
            <div className="ts_text">
              <h4>Athart Rachel</h4>
              <span>Gym Trainer</span>
              <div className="tt_social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa  fa-envelope-o" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Team Section End */}
  {/* Get In Touch Section Begin */}
  <div className="gettouch-section">
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-map-marker" />
            <p>
              333 Middle Winchendon Rd, Rindge,
              <br /> NH 03461
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text">
            <i className="fa fa-mobile" />
            <ul>
              <li>125-711-811</li>
              <li>125-668-886</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="gt-text email">
            <i className="fa fa-envelope" />
            <p>Support.gymcenter@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

      );
}

export default Team;