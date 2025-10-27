import { useEffect } from "react";
function Galary() {
  useEffect(() => {
    const bgElements = document.querySelectorAll("[data-setbg]");
    bgElements.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      el.style.backgroundImage = `url(${bg})`;
    });
  }, []);
    return (  <>
  <section
    className="breadcrumb-section set-bg"
    data-setbg="img/breadcrumb-bg.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="breadcrumb-text">
            <h2>Gallery</h2>
            <div className="bt-option">
              <a href="./index.html">Home</a>
              <a href="#">Pages</a>
              <span>Gallery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Gallery Section Begin */}
  <div className="gallery-section gallery-page">
    <div className="gallery">
      <div className="grid-sizer" />
      <div
        className="gs-item grid-wide set-bg"
        data-setbg="img/gallery/gallery-1.jpg"
      >
        <a href="img/gallery/gallery-1.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-2.jpg">
        <a href="img/gallery/gallery-2.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-3.jpg">
        <a href="img/gallery/gallery-3.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-4.jpg">
        <a href="img/gallery/gallery-4.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-5.jpg">
        <a href="img/gallery/gallery-5.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div
        className="gs-item grid-wide set-bg"
        data-setbg="img/gallery/gallery-6.jpg"
      >
        <a href="img/gallery/gallery-6.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div
        className="gs-item grid-wide set-bg"
        data-setbg="img/gallery/gallery-7.jpg"
      >
        <a href="img/gallery/gallery-7.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-8.jpg">
        <a href="img/gallery/gallery-8.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
      <div className="gs-item set-bg" data-setbg="img/gallery/gallery-9.jpg">
        <a href="img/gallery/gallery-9.jpg" className="thumb-icon image-popup">
          <i className="fa fa-picture-o" />
        </a>
      </div>
    </div>
  </div>
  {/* Gallery Section End */}
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

export default Galary;