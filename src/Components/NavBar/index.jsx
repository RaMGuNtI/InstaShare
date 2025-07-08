import React, { useState } from 'react';
import './index.css';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { IoHome, IoHomeOutline, IoSearch, IoSearchOutline, IoCompass, IoCompassOutline, IoHeart, IoHeartOutline, IoPerson, IoPersonOutline, IoAdd, IoAddOutline, IoFilm, IoFilmOutline, IoPaperPlane, IoPaperPlaneOutline } from 'react-icons/io5';

const NavBar = () => {
  const [inp, setInp] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    Cookies.remove('JWTTOKEN');
    navigate('/login');
  };
  const searchINSTA = () => {
    console.log(inp);
    navigate(`/search/${inp}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div className="navbar">
        <div className="logobranding">
          <img src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751611659/Group_ldfylf.png" />
          <h3>Insta Share</h3>
        </div>
        <div className="searchLinks">
          <div className="serchcont">
            <input
              onChange={(e) => setInp(e.target.value)}
              placeholder="Search Caption"
            />
            <div className="searchIcon">
              <svg
                onClick={searchINSTA}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.375 10C9.45312 10 9.53125 9.98535 9.60938 9.95605C9.6875 9.92676 9.75586 9.87956 9.81445 9.81445C9.93815 9.69075 10 9.54427 10 9.375C10 9.20573 9.93815 9.05925 9.81445 8.93555L7.94922 7.07031C8.22917 6.69922 8.44727 6.28906 8.60352 5.83984C8.75977 5.39062 8.83789 4.91862 8.83789 4.42383C8.83789 3.81185 8.72233 3.2373 8.49121 2.7002C8.26009 2.16309 7.94434 1.69434 7.54395 1.29395C7.14355 0.893555 6.6748 0.577799 6.1377 0.34668C5.60059 0.11556 5.0293 0 4.42383 0C3.81185 0 3.2373 0.11556 2.7002 0.34668C2.16309 0.577799 1.69434 0.893555 1.29395 1.29395C0.893555 1.69434 0.577799 2.16309 0.34668 2.7002C0.11556 3.2373 0 3.81185 0 4.42383C0 5.0293 0.11556 5.60059 0.34668 6.1377C0.577799 6.6748 0.893555 7.14355 1.29395 7.54395C1.69434 7.94434 2.16309 8.26009 2.7002 8.49121C3.2373 8.72233 3.81185 8.83789 4.42383 8.83789C4.91862 8.83789 5.39062 8.75977 5.83984 8.60352C6.28906 8.44727 6.69922 8.22917 7.07031 7.94922L8.93555 9.81445C8.99414 9.87956 9.0625 9.92676 9.14062 9.95605C9.21875 9.98535 9.29688 10 9.375 10ZM4.42383 7.58789C3.98112 7.58789 3.56771 7.50488 3.18359 7.33887C2.79948 7.17285 2.46419 6.94661 2.17773 6.66016C1.89128 6.3737 1.66504 6.03841 1.49902 5.6543C1.33301 5.27018 1.25 4.86003 1.25 4.42383C1.25 3.98112 1.33301 3.56771 1.49902 3.18359C1.66504 2.79948 1.89128 2.46419 2.17773 2.17773C2.46419 1.89128 2.79948 1.66504 3.18359 1.49902C3.56771 1.33301 3.98112 1.25 4.42383 1.25C4.86003 1.25 5.27018 1.33301 5.6543 1.49902C6.03841 1.66504 6.3737 1.89128 6.66016 2.17773C6.94661 2.46419 7.17285 2.79948 7.33887 3.18359C7.50488 3.56771 7.58789 3.98112 7.58789 4.42383C7.58789 4.86003 7.50488 5.27018 7.33887 5.6543C7.17285 6.03841 6.94661 6.3737 6.66016 6.66016C6.3737 6.94661 6.03841 7.17285 5.6543 7.33887C5.27018 7.50488 4.86003 7.58789 4.42383 7.58789Z"
                  fill="#989898"
                />
              </svg>
            </div>
          </div>
          <div className="links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              {isActive('/') ? <IoHome size={24} /> : <IoHomeOutline size={24} />}
              <span className="nav-text">Home</span>
            </Link>
            <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>
              {isActive('/explore') ? <IoCompass size={24} /> : <IoCompassOutline size={24} />}
              <span className="nav-text">Explore</span>
            </Link>
            <Link to="/reels" className={`nav-link ${isActive('/reels') ? 'active' : ''}`}>
              {isActive('/reels') ? <IoFilm size={24} /> : <IoFilmOutline size={24} />}
              <span className="nav-text">Reels</span>
            </Link>
            <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'active' : ''}`}>
              {isActive('/messages') ? <IoPaperPlane size={24} /> : <IoPaperPlaneOutline size={24} />}
              <span className="nav-text">Messages</span>
            </Link>
            <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
              <IoAdd size={24} />
              <span className="nav-text">Create</span>
            </Link>
            <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
              {isActive('/profile') ? <IoPerson size={24} /> : <IoPersonOutline size={24} />}
              <span className="nav-text">Profile</span>
            </Link>
            <Link to="/saved" className={`nav-link ${isActive('/saved') ? 'active' : ''}`}>
              {isActive('/saved') ? <IoHeart size={24} /> : <IoHeartOutline size={24} />}
              <span className="nav-text">Saved</span>
            </Link>
          </div>
          <div className="logout">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
        <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          {showMenu && (
            <div
              className="mobileMenu"
              onClick={(e) => e.stopPropagation()} // prevents menu from auto-closing on internal clicks
            >
              <div className="serchcont">
                <input
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  placeholder="Search Caption"
                  autoFocus
                />
                <div className="searchIcon">
                  <svg
                    onClick={searchINSTA}
                    width="16"
                    height="16"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.375 10C9.45312 10 9.53125 9.98535 9.60938 9.95605C9.6875 9.92676 9.75586 9.87956 9.81445 9.81445C9.93815 9.69075 10 9.54427 10 9.375C10 9.20573 9.93815 9.05925 9.81445 8.93555L7.94922 7.07031C8.22917 6.69922 8.44727 6.28906 8.60352 5.83984C8.75977 5.39062 8.83789 4.91862 8.83789 4.42383C8.83789 3.81185 8.72233 3.2373 8.49121 2.7002C8.26009 2.16309 7.94434 1.69434 7.54395 1.29395C7.14355 0.893555 6.6748 0.577799 6.1377 0.34668C5.60059 0.11556 5.0293 0 4.42383 0C3.81185 0 3.2373 0.11556 2.7002 0.34668C2.16309 0.577799 1.69434 0.893555 1.29395 1.29395C0.893555 1.69434 0.577799 2.16309 0.34668 2.7002C0.11556 3.2373 0 3.81185 0 4.42383C0 5.0293 0.11556 5.60059 0.34668 6.1377C0.577799 6.6748 0.893555 7.14355 1.29395 7.54395C1.69434 7.94434 2.16309 8.26009 2.7002 8.49121C3.2373 8.72233 3.81185 8.83789 4.42383 8.83789C4.91862 8.83789 5.39062 8.75977 5.83984 8.60352C6.28906 8.44727 6.69922 8.22917 7.07031 7.94922L8.93555 9.81445C8.99414 9.87956 9.0625 9.92676 9.14062 9.95605C9.21875 9.98535 9.29688 10 9.375 10ZM4.42383 7.58789C3.98112 7.58789 3.56771 7.50488 3.18359 7.33887C2.79948 7.17285 2.46419 6.94661 2.17773 6.66016C1.89128 6.3737 1.66504 6.03841 1.49902 5.6543C1.33301 5.27018 1.25 4.86003 1.25 4.42383C1.25 3.98112 1.33301 3.56771 1.49902 3.18359C1.66504 2.79948 1.89128 2.46419 2.17773 2.17773C2.46419 1.89128 2.79948 1.66504 3.18359 1.49902C3.56771 1.33301 3.98112 1.25 4.42383 1.25C4.86003 1.25 5.27018 1.33301 5.6543 1.49902C6.03841 1.66504 6.3737 1.89128 6.66016 2.17773C6.94661 2.46419 7.17285 2.79948 7.33887 3.18359C7.50488 3.56771 7.58789 3.98112 7.58789 4.42383C7.58789 4.86003 7.50488 5.27018 7.33887 5.6543C7.17285 6.03841 6.94661 6.3737 6.66016 6.66016C6.3737 6.94661 6.03841 7.17285 5.6543 7.33887C5.27018 7.50488 4.86003 7.58789 4.42383 7.58789Z"
                      fill="#989898"
                    />
                  </svg>
                </div>
              </div>

              <div className="links">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/') ? <IoHome size={20} /> : <IoHomeOutline size={20} />}
                  <span>Home</span>
                </Link>
                <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/explore') ? <IoCompass size={20} /> : <IoCompassOutline size={20} />}
                  <span>Explore</span>
                </Link>
                <Link to="/reels" className={`nav-link ${isActive('/reels') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/reels') ? <IoFilm size={20} /> : <IoFilmOutline size={20} />}
                  <span>Reels</span>
                </Link>
                <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/messages') ? <IoPaperPlane size={20} /> : <IoPaperPlaneOutline size={20} />}
                  <span>Messages</span>
                </Link>
                <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  <IoAdd size={20} />
                  <span>Create</span>
                </Link>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/profile') ? <IoPerson size={20} /> : <IoPersonOutline size={20} />}
                  <span>Profile</span>
                </Link>
                <Link to="/saved" className={`nav-link ${isActive('/saved') ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                  {isActive('/saved') ? <IoHeart size={20} /> : <IoHeartOutline size={20} />}
                  <span>Saved</span>
                </Link>
              </div>

              <div className="logout">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.948 6H20.051C20.573 6 21 6.427 21 6.949V7.051C21 7.573 20.573 8 20.051 8H3.948C3.426 8 3 7.573 3 7.051V6.949C3 6.427 3.426 6 3.948 6ZM20.051 11H3.948C3.426 11 3 11.427 3 11.949V12.051C3 12.573 3.426 13 3.948 13H20.051C20.573 13 21 12.573 21 12.051V11.949C21 11.427 20.573 11 20.051 11ZM20.051 16H3.948C3.426 16 3 16.427 3 16.949V17.051C3 17.573 3.426 18 3.948 18H20.051C20.573 18 21 17.573 21 17.051V16.949C21 16.427 20.573 16 20.051 16Z"
              fill="#262626"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
