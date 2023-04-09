import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Logo from './100YM-ILY_logo_white.png';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <img className="logo" src={Logo} alt="logo"/>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            {/* These links only show up once setupComplete for user is TRUE in DB */}
            {user.setupComplete &&
              <>
                <Link className="navLink" to="/week">
                  Week
                </Link>

                <Link className="navLink" to="/priorities">
                  Priorities
                </Link>

                <Link className="navLink" to="/questions">
                  Questions
                </Link>
              </>
            }

            <LogOutButton className="navLink" />
          </>
        )}

        {/* If a user is admin, show this link - UNTESTED */}
        {user.admin && (
          <>
            <Link className="navLink" to="/admin">
              Admin
            </Link>
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
