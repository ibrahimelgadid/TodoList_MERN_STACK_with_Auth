import React, { useEffect } from "react";
import { FaEdit, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  deleteTaskFun,
  getTasksFun,
} from "../../ReduxCycle/actions/taskActions";
import isEmpty from "../../utitlis/isEmpty";
import classNames from "classnames";

const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    search: "",
  });
  const getTasksFunHandler = bindActionCreators(getTasksFun, useDispatch());
  const deleteTaskFunHandler = bindActionCreators(deleteTaskFun, useDispatch());
  const { loading, tasks, tasksCount } = useSelector(
    (state) => state.taskReducer
  );

  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search");
  const pagesNumber = Array(tasksCount).fill("");

  const deleteTaskFunDispatch = (id) => {
    deleteTaskFunHandler(id);
    if (tasks.length === 1) setSearchParams({ page: 1, search: "" });
  };

  const searchFunHandler = (e) => {
    // setSearch(e.target.value);
    setSearchParams({ page: 1, search: e.target.value });
  };

  useEffect(() => {
    getTasksFunHandler(searchParam, pageParam);
    // eslint-disable-next-line
  }, [searchParam, pageParam]);

  return isEmpty(tasks) && loading ? (
    <div className="text-center mt-4">
      <div className="spinner-border " role="status"></div>
    </div>
  ) : (
    <div className="row justify-content-center m-4 ">
      <h1 className="text-center">Tasks</h1>
      <div className="col-10">
        <div>
          <Link className="text-center " to={"/add-task"}>
            New Task+{tasksCount}
          </Link>
          <input
            name="search"
            type="text"
            placeholder="Search for tasks......."
            className={"form-control my-2 "}
            onInput={searchFunHandler}
          />
        </div>
        {tasks.length > 0 ? (
          <>
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
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {pagesNumber.map((page, i) => (
                  <li
                    onClick={() =>
                      setSearchParams({ page: i + 1, search: searchParam })
                    }
                    key={i}
                    className={classNames("page-item", {
                      active: Number(pageParam) === i + 1,
                    })}
                    aria-current="page"
                  >
                    <span className="page-link">{i + 1}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        ) : (
          <div className="text-center text-danger">
            {" "}
            <h3>There's no tasks</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
