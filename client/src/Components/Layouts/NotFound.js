import React from "react";
import { FaSkullCrossbones } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="not-found mt-4">
      <h2 className="text-center ">
        This page not found <strong className="text-warning ">404</strong>
        <div className="text-warning skull">
          <FaSkullCrossbones />
        </div>
      </h2>
    </div>
  );
};

export default NotFound;
