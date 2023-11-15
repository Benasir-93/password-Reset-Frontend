import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../Utils/Utils";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = yup.object({
    username: yup
      .string()
      .required("Name is required")
      .max(15, "Max length is 15 chars")
      .min(3, "Min length is 3 chars"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password start with capital letter then from 5 to 10 letters or digits"
      ),
  });
  async function sendData(values) {
    setLoading(true);
    let { data } = await axios
      .post(`https://password-reset-backend-bm8h.onrender.com/api/user/signUp`, values)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.msg);
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    setLoading(false);
    toast.success("Register Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/login");
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendData,
  });
  function changeBgRegister() {
    document.getElementById("changeR").classList.add("auth");
  }
  return (
    <>
      <div className="bg-color">
      <div class="card m-5 mx-auto bg-light py-5 py-md-0 w-75 " >
  <div class="row g-0">
    <div class="col-md-5">
      <img src="./image/images.png" class="img-fluid rounded-start h-100" alt="..."/>
    </div>
    <div class="col-md-7">
      <div class="card-body ">
        <h1 className="text-main fw-bolder tect-center">Register Now</h1>

        <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <input
                  type="text"
                  className="form-control mt-3 "
                  placeholder="Enter User Name"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.username && formik.touched.username ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.username}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Enter Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <div className="position-relative">
                  <input
                    id="password-input"
                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <i
                    onClick={() => togglePasswordVisibility()}
                    className="fa-regular fa-eye-slash eyeIcon"
                  ></i>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="fs-small ps-1 text-danger text-start">
                    {formik.errors.password}
                  </p>
                ) : (
                  ""
                )}
                <button
                  onClick={() => changeBgRegister()}
                  id="changeR"
                  type="submit"
                  className="btn-style text-center mt-3 w-100"
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <Oval
                        height={30}
                        width={30}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#86b7fe"//cyan-blue
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
                <br />
              <p className="m-3">
              Already Registered ! Click here<Link to={"/login"}>
                <button className="btn-style text-center mt-3 w-100">
                  Login
                </button>
              </Link>            </p>
             
              </form>
      </div>
    </div>
  </div>
</div>
</div>
    </>
  );
}
