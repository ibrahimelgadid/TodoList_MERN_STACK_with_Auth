import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { editTaskFun, getTaskFun } from "../../ReduxCycle/actions/taskActions";
import isEmpty from "../../utitlis/isEmpty";

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState([]);

  const { loading, task } = useSelector((state) => state.taskReducer);
  const errorsFromState = useSelector((state) => state.errorsReducer);
  const getTaskFunHandler = bindActionCreators(getTaskFun, useDispatch());
  const editTaskFunHandler = bindActionCreators(editTaskFun, useDispatch());

  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    setErrors(errorsFromState);
    //eslint-disable-next-line
  }, [errorsFromState]);

  useEffect(() => {
    if (!isEmpty(task)) {
      setTitle(task.title);
      setBody(task.body);
    }
  }, [task]);

  const editTaskHandling = (e) => {
    e.preventDefault();
    editTaskFunHandler({ title, body }, taskId, navigate);
  };

  useEffect(() => {
    getTaskFunHandler(taskId);
    // eslint-disable-next-line
  }, []);
  return loading ? (
    <div className="text-center mt-4">
      <div className="spinner-border " role="status"></div>
    </div>
  ) : (
    !isEmpty(task) && (
      <div className="row justify-content-center my-4">
        <div className="col-10">
          <div className="card ">
            <div className="card-header">
              <h3 className="text-center">{task.title}</h3>
            </div>
            <div className="card-body">
              <form className="row g-3" onSubmit={editTaskHandling}>
                <div className="input-group">
                  <span className="input-group-text">Title</span>
                  <input
                    name="title"
                    type="text"
                    value={title}
                    className={classNames("form-control ", {
                      "is-invalid": errors.title,
                    })}
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
                  onClick={() => setLoad(true)}
                >
                  {load && isEmpty(errors) ? (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Edit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditTask;
