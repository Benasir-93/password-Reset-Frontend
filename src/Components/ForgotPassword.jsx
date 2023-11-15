import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  async function sendDataToMail(values) {
    console.log("Working sendDataToMail");
    setLoading(true);
    try {
      const response = await axios.post(
        `https://password-reset-backend-bm8h.onrender.com/api/user/ForgotPassword`,
        values
      );

      setLoading(false);
      toast.success("Reset Link send to your Mail", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    
    } catch (err) {
      setLoading(false);
      setError("Email is not Register");
      toast.error("Email is not Register", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToMail,
  });

  function changeBgForgotPassword() {
    document.getElementById("change").classList.add("auth");
    console.log("Working changeBgForgotPassword");
  }

  return (
    <>
     
      {/* 99999999999999999 */}
      <div className="bg-color">
      <div class="card m-5 mx-auto bg-light py-5 py-md-0  w-75" >
  <div class="row g-0">
    <div class="col-md-5">
      <img src="./image/forgotpassword.jpg" class="img-fluid rounded-start h-100" alt="..."/>
    </div>
    <div class="col-md-7">
      <div class="card-body ">
      <div className="text-center p-5">
                <i
                  class="fa-solid fa-lock text-main"
                  style={{ fontSize: "50px" }}
                ></i>

                <h4
                  className="fw-bolder fs-5 my-3"
                  style={{ color: "#a83236" }}
                >
                  Trouble logging in?
                </h4>
                <h5
                  className="fw-bold my-3"
                  style={{ fontSize: "15px", color: "gray" }}
                >
                  Enter your email we'll send you a link to get back into your
                  account.
                </h5>

                <form onSubmit={formik.handleSubmit}>
                  {error ? <p className="text-danger ">{error}</p> : ""}
                  <input
                    type="email"
                    className="form-control mt-3"
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email} // Use formik.values for input value
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
                  <button
                    onClick={() => changeBgForgotPassword()}
                    id="change"
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
                          secondaryColor="#86b7fe"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                  <br />
                <p className="m-3"> Need an Account? Register Here
                <Link to={"/register"}>
                  <button className=" btn-style text-center mt-3 w-100 ">
                    Register
                  </button>
                </Link>
                </p>
                </form>
              </div>
      </div>
    </div>
  </div>
</div>
</div>
    </>
  );
}
