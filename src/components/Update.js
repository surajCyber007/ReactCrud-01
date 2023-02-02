import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const Update = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFirstName(localStorage.getItem("fname"));
    setLastName(localStorage.getItem("lname"));
    setCheckTerms(localStorage.getItem("checkbox"));
    setId(localStorage.getItem("id"));
  }, []);

  const handleChange = () => {
    setCheckTerms(!checkTerms);
  };

  const handleUpdate1 = (e) => {
    // e.preventDefault();
    axios
      .put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
        firstName: firstName,
        lastName: lastName,
        checkbox: checkTerms,
      })
      .then(() => {
        navigate("/read");
      });
  };

  const resetFirstName = () => {
    setFirstName("");
  };
  const resetLastName = () => {
    setLastName("");
  };

  const handleBack = () => {
    navigate("/read");
  };

  return (
    <>
      <div className="d-md-flex">
        <div className="container create-content p-4">
          <h1 className="my-2">Update</h1>
          <form>
            <div>
              <div className="inputWithIcon my-2">
                <input
                  type="text"
                  value={firstName}
                  {...register("firstName", { required: true, maxLength: 10 })}
                  className="form-control my-4"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <i className="start-icon">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <i className="end-icon">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    onClick={resetFirstName}
                  />
                </i>
              </div>
              {errors.firstName && (
                <p className="errorMessage">Please check the First Name</p>
              )}
            </div>

            <div>
              <div className="inputWithIcon my-2">
                <input
                  type="text"
                  value={lastName}
                  {...register("lastName", { required: true, maxLength: 10 })}
                  className="form-control my-4"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <i className="start-icon">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <i className="end-icon" onClick={resetLastName}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </i>
              </div>
              {errors.lastName && (
                <p className="errorMessage">Please check the Last Name</p>
              )}
            </div>

            <div className="mb-3 form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkTerms}
                  onChange={handleChange}
                  // onChange={handleSubmit}
                />
                I agree to the terms and conditions
              </label>
            </div>

            <button
              // type="submit"
              className="btn btn-primary"
              onClick={handleSubmit(handleUpdate1)}
              // disabled={!(firstName && lastName)}
            >
              Update
            </button>

            <button className="btn btn-dark mx-3" onClick={handleBack}>
              Back
            </button>
          </form>
        </div>
        <div className="p-4 text-center">
          <img
            src="../images/Home-page.png"
            alt=""
            className=""
            width={"80%"}
          />
        </div>
      </div>
    </>
  );
};

export default Update;
