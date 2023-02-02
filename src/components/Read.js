import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTimesCircle,
  faUserAlt,
  faCheckCircle,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Read = () => {
  const [data, setData] = useState([]);
  const [switchTheme, setSwitchTheme] = useState("");
  const [mode, setMode] = useState("Dark")

  function getData() {
    axios
      .get("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData")
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
      .then(() => {
        getData();
      });
  }

  useEffect(() => {
    getData();
  }, [data]);

  const onEdit = (fname, lname, checkbox, id) => {
    localStorage.setItem("fname", fname);
    localStorage.setItem("lname", lname);
    localStorage.setItem("checkbox", checkbox);
    localStorage.setItem("id", id);
  };

  const handleTheme = () => {
    if(switchTheme === ""){
        setSwitchTheme("table-dark")
        setMode("Light")
    }else{
        setSwitchTheme("")
        setMode("Dark")
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-check form-switch mt-4">
            <label>

          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onClick={handleTheme}
            /> Change to {mode} Mode
            </label>
        </div>
        <h1>Read</h1>
        <div className=" text-end">
          <Link to="/">
            <button className="btn btn-outline-primary my-3 btn-sm">
              Add User
            </button>
          </Link>
        </div>
        {data.length === 0 ? (
          <h4>No Data Available. Add users to see the data</h4>
        ) : (
          <table className={`table table-bordered text-center ${switchTheme}`}>
            <thead>
              <tr>
                <th scope="col">
                  <i>
                    <FontAwesomeIcon icon={faUserAlt} className="mx-1" />
                  </i>{" "}
                  First Name
                </th>
                <th scope="col">
                  <i>
                    <FontAwesomeIcon icon={faUserAlt} className="mx-1" />
                  </i>{" "}
                  Last Name
                </th>
                <th scope="col">
                  <i>
                    <FontAwesomeIcon icon={faCheckCircle} className="mx-1" />
                  </i>{" "}
                  Checked
                </th>
                <th scope="col">
                  <i>
                    <FontAwesomeIcon icon={faSync} className="mx-1" />
                  </i>{" "}
                  Edit
                </th>
                <th scope="col">
                  <i>
                    <FontAwesomeIcon icon={faTrash} className="mx-1" />
                  </i>{" "}
                  Delete
                </th>
              </tr>
            </thead>
            {data.map((item) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.checkbox ? "Yes" : "No"}</td>
                      <td>
                        <Link to="/update">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              onEdit(
                                item.firstName,
                                item.lastName,
                                item.checkbox,
                                item.id
                              );
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default Read;
