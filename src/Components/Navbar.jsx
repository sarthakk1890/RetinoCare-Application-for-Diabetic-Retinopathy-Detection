import React from 'react';
import eyes from '../images/eye_new.png';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("You've been logged out", { autoClose: 2000 });
    navigate('/');
  };

  return (
    <nav className="navHome">
      <div className="naveye">
        <img src={eyes} alt="logo" />
      </div>
      <ul className="navItems mx--2">
        <li className="nav-items">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`}>
          <Link className="nav-link" to="/history">
            History
          </Link>
        </li>
        <li className="nav-item">
          <button type="button" className="btn btn-primary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
