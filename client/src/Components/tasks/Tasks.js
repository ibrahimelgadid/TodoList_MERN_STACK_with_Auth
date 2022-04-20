import React, { useEffect, useState } from "react";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  deleteTaskFun,
  getTasksFun,
} from "../../ReduxCycle/actions/taskActions";
import isEmpty from "../../utitlis/isEmpty";

const Tasks = () => {
  const [search, setSearch] = useState("");
  const getTasksFunHandler = bindActionCreators(getTasksFun, useDispatch());
  const deleteTaskFunHandler = bindActionCreators(deleteTaskFun, useDispatch());
  const { loading, tasks } = useSelector((state) => state.taskReducer);

  const deleteTaskFunDispatch = (id) => {
    deleteTaskFunHandler(id);
  };

  useEffect(() => {
    getTasksFunHandler();
    // eslint-disable-next-line
  }, []);

  return isEmpty(tasks) && loading ? (
    <div className="text-center mt-4">
      <div className="spinner-border " role="status"></div>
    </div>
  ) : tasks.length > 0 ? (
    <div className="row justify-content-center m-4 ">
      <h1 className="text-center">Tasks</h1>
      <div>
        <Link className="text-center float-start" to={"/add-task"}>
          New Task+
        </Link>
        <div className="input-group m-4 float-end">
          <span className="input-group-text">Search</span>
          <input
            name="search"
            type="text"
            className={"form-control "}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="col-10  ">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tille</th>
              <th scope="col">Content</th>
              <th scope="col">User</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={task._id}>
                <th scope="row">{i + 1}</th>
                <td>{task.title}</td>
                <td>{task.body}</td>
                <td>{task.user.username}</td>
                <td>
                  <span
                    onClick={() => deleteTaskFunDispatch(task._id)}
                    className="text-danger d-inline-block mr-2"
                  >
                    <FaTrashAlt cursor={"pointer"} />
                  </span>{" "}
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="text-primary d-inline-block mr-2"
                  >
                    <FaEdit cursor={"pointer"} />
                  </Link>{" "}
                  <Link
                    to={`/task/${task._id}`}
                    className="text-info d-inline-block mr-2"
                  >
                    <FaInfoCircle />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="text-center text-danger">
      {" "}
      <h3>There's no tasks yet;</h3>
    </div>
  );
};

export default Tasks;
