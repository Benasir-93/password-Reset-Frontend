import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../Utils/Utils";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup.string().required("Password is required"),
  });
  async function sendDataToLogin(values) {
    console.log("Working sendDataToLogin");
    setLoading(true);
    let { data } = await axios
      .post(
        `https://password-reset-backend-bm8h.onrender.com/api/user/login`,
        values
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        setLoading(false);
        setError("Email or password is not valid");
        toast.error("Email or password is not valid", {
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
    console.log(data);
    localStorage.setItem("Auth Token", `${data?.authToken}`);
    localStorage.setItem("userName", `${data?.userName}`);
    toast.success("Welcome To Home Page", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/", { state: { message: "Welcome back" } });
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToLogin,
  });
  function changeBgLogin() {
    document.getElementById("change").classList.add("auth");
    console.log("Working changeBgLogin");
  }
  return (
    <>
              {/* jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}
        <div className="bg-color">
      <div class="card m-5 mx-auto bg-light py-5 py-md-0 w-75" >
  <div class="row g-0">
    <div class="col-md-5">
      <img src="./image/Login.jpg" class="img-fluid rounded-start h-100" alt="..."/>
    </div>
    <div class="col-md-7">
      <div class="card-body ">
        <h1 className="text-main fw-bolder text-center">Login Now</h1>

        <form onSubmit={formik.handleSubmit}>
                  {error ? <p className="text-danger ">{error}</p> : ""}
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
                    onClick={() => changeBgLogin()}
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
                          secondaryColor="white"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div className="mt-4 text-center">
                    <Link to="/forgotPassword" style={{textDecoration: "none" ,color:" #a83236",fontWeight:"bold"}}>Forgot Password</Link>
                  </div>
                  <br />
                <p className="m-3"> Don't have an Account? Register Here
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
    </>
  );
}
