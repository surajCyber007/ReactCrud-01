import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTimesCircle,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import "semantic-ui-css/semantic.min.css";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const Create = () => {
  const history = useNavigate();
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);
  const header = { "Access-Control-Allow-Origin": "*" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmit1 = (e) => {
    console.log(e);
    // e.preventDefault();
    axios
      .post("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData", {
        firstName: firstName,
        lastName: lastName,
        checkbox: checkTerms,
      })
      .then(history("/read"));
  };

  const handleChange = () => {
    setCheckTerms(!checkTerms);
  };

  const resetFirstName = () => {
    setFirstName("");
  };
  const resetLastName = () => {
    setLastName("");
  };

  return (
    <>
      <div className="d-md-flex">
        <div className="container create-content p-4">
          <h1 className="my-2">Create</h1>
          <div className=" text-end">
            <Link to="/read">
              <button className="btn btn-outline-success my-3 btn-sm">
                Read Data
              </button>
            </Link>
          </div>
          <form>
            <div>
              <div className="inputWithIcon my-2">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  {...register("firstName", { required: true, maxLength: 10 })}
                  className="form-control my-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <i className="start-icon">
                  <FontAwesomeIcon icon={faUserAlt} />
                </i>
                <i className="end-icon" onClick={resetFirstName}>
                  <FontAwesomeIcon icon={faTimesCircle} />
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
                  placeholder="Last name"
                  className="form-control my-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <i className="start-icon">
                  <FontAwesomeIcon icon={faUserAlt} />
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
                />
                I agree to the terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary my-4"
              // disabled={!(firstName && lastName)}
              onClick={handleSubmit(handleSubmit1)}
            >
              Submit
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

export default Create;
