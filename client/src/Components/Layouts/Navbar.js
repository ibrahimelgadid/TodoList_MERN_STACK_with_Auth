import React from "react";
import { FaFile, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { logOutFun } from "../../ReduxCycle/actions/authActions";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const logOutFunHandler = bindActionCreators(logOutFun, useDispatch());
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Landing
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {!isAuthenticated ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">
                    Tasks <FaFile />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={logOutFunHandler}
                    to="/login"
                  >
                    LogOut <FaSignOutAlt />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
