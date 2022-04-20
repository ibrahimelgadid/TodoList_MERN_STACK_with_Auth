import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getTaskFun } from "../../ReduxCycle/actions/taskActions";
import isEmpty from "../../utitlis/isEmpty";

const Task = () => {
  const getTaskFunHandler = bindActionCreators(getTaskFun, useDispatch());
  const { loading, task } = useSelector((state) => state.taskReducer);
  const { taskId } = useParams();

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
          bss
          <div className="card ">
            <div className="card-header">
              <h3 className="text-center">{task.title}</h3>
            </div>
            <div className="card-body">
              <h4 className="card-title">{task.title}</h4>
              <p className="card-text">{task.body}</p>
              <span>{task.user.username}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Task;
