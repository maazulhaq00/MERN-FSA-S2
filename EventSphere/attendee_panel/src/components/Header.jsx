import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <header className="header-section">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/assets/img/logo.PNG" alt="ManUp Logo" />
          </Link>
        </div>
        <div className="nav-menu">
          <nav className="mainmenu mobile-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/shedules">Shedules</Link></li>
              <li><Link to="/expos">Expos</Link></li>
              <li><Link to="/booths">Booths</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          {/* ✅ Only show Profile for attendee, nothing else */}
          {userRole === "attendee" ? (
            <Link to="/profile" className="primary-btn top-btn">
              <i className="fa fa-user" /> Profile
            </Link>
          ) : (
            <Link to="/login" className="primary-btn top-btn">
              <i className="fa fa-ticket" /> Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
