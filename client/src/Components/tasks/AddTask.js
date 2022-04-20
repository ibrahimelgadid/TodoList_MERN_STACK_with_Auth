import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { addTaskFun } from "../../ReduxCycle/actions/taskActions";
import isEmpty from "../../utitlis/isEmpty";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const errorsFromState = useSelector((state) => state.errorsReducer);
  const addTaskFunHandler = bindActionCreators(addTaskFun, useDispatch());
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(errorsFromState);
    //eslint-disable-next-line
  }, [errorsFromState]);

  const newTaskHandling = (e) => {
    e.preventDefault();
    addTaskFunHandler({ title, body }, navigate);
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-8 col-md-6 col-lg-4">
        <div className="card ">
          <div className="card-header">
            <h3>New Task</h3>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={newTaskHandling}>
              <div className="input-group">
                <span className="input-group-text">Title</span>
                <input
                  name="title"
                  type="text"
                  className={classNames("form-control ", {
                    "is-invalid": errors.title,
                  })}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="invalid-feedback text-center">
                  {errors.title}
                </div>
              </div>

              <div className="input-group">
                <span className="input-group-text">Body</span>
                <textarea
                  type="text"
                  className={classNames("form-control ", {
                    "is-invalid": errors.body,
                  })}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <div className="invalid-feedback text-center">
                  {errors.body}
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
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
