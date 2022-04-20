import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { registerFun } from "../../ReduxCycle/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "../../utitlis/isEmpty";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [ismounted, setIsmounted] = useState(false);

  const registerFunHandler = bindActionCreators(registerFun, useDispatch());
  const errorsFromState = useSelector((state) => state.errorsReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();

  const RegisterHandling = (e) => {
    e.preventDefault();

    const registerData = {
      username,
      email,
      password,
      confirmPassword,
    };
    registerFunHandler(registerData, navigate);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (ismounted) {
      setErrors(errorsFromState);
    } else {
      setIsmounted(true);
    }
    //eslint-disable-next-line
  }, [errorsFromState]);

  return (
    <div className="register">
      <div className="row justify-content-center">
        <div className="card mt-4 col-8 col-md-6 col-xl-5 shadow p-0">
          <div className="card-header">
            <h3 className="text-center">
              <FaUserPlus className="d-inline-block me-2" />
              Register
            </h3>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={RegisterHandling}>
              <div className="input-group">
                <span className="input-group-text">Username</span>
                <input
                  type="text"
                  className={classnames("form-control ", {
                    "is-invalid": errors.username,
                  })}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="invalid-feedback text-center">
                  {errors.username}
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">E-mail</span>
                <input
                  type="email"
                  className={classnames("form-control ", {
                    "is-invalid": errors.email,
                  })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback text-center">
                  {errors.email}
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">Password</span>
                <input
                  type="password"
                  className={classnames("form-control ", {
                    "is-invalid": errors.password,
                  })}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback text-center">
                  {errors.password}
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">Confirm Pass</span>
                <input
                  type="password"
                  className={classnames("form-control ", {
                    "is-invalid": errors.confirmPassword,
                  })}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="invalid-feedback text-center">
                  {errors.confirmPassword}
                </div>
              </div>

              <button
                className="col-12 btn btn-info"
                type="submit"
                onClick={() => setLoading(true)}
              >
                {loading && isEmpty(errors) ? (
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Register"
                )}
              </button>
              <Link className="text-center" to="/login">
                {" "}
                Do you have account?, login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
