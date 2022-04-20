import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { loginFun } from "../../ReduxCycle/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "../../utitlis/isEmpty";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [ismounted, setIsmounted] = useState(false);

  const LoginFunHandler = bindActionCreators(loginFun, useDispatch());
  const errorsFromState = useSelector((state) => state.errorsReducer);
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const LoginHandling = (e) => {
    e.preventDefault();

    const LoginData = {
      email,
      password,
    };
    LoginFunHandler(LoginData, navigate);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
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
    <div className="Login">
      <div className="row justify-content-center">
        <div className="card mt-4 col-8 col-md-6 col-xl-5  shadow p-0">
          <div className="card-header">
            <h3 className="text-center">
              <FaSignInAlt className="d-inline-block me-2" />
              Login
            </h3>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={LoginHandling}>
              <div className="input-group">
                <span className="input-group-text">E-mail</span>
                <input
                  name="email"
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
                  "Login"
                )}
              </button>
              <Link className="text-center" to="/register">
                {" "}
                Don't have account?, create one
              </Link>
              <Link className="text-center" to="/sendResetPassEmail">
                {" "}
                Forget password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
