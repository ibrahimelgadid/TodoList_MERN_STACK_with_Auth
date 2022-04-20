import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  return (
    <div className="text-center text-white landing">
      <h1 className="pt-4">Landing page</h1>
      {!isAuthenticated ? (
        <div className="btn-group  my-4">
          <NavLink to={"/register"} className="btn btm-sm btn-info">
            Register
          </NavLink>
          <NavLink to={"/login"} className="btn btm-sm btn-outline-secondary">
            Login
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sequi
        natus quas optio adipisci exercitationem, amet neque facilis? Sequi
        eveniet optio itaque provident{" "}
        <span className="text-warning">
          minima? Nesciunt doloremque error libero iure dolore.
        </span>
      </p>
    </div>
  );
};

export default Landing;
