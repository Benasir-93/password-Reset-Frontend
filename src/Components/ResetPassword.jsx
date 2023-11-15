import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { togglePasswordVisibility } from "../Utils/Utils";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { randomString } = useParams(); // Get the random string from the URL

  // Define a validation schema for the form
  const validation = yup.object({
    password: yup.string().required("Password is required"),
  });

  // Function to send updated password data to the server
  async function sendUpdatedData(values) {
    console.log("Working sendUpdatedData");
    setLoading(true);
    try {
      // Replace ":randomString" with the extracted random string
      const response = await axios.post(
        `https://password-reset-backend-bm8h.onrender.com/api/user/resetPassword/${randomString}`,
        values
      );
      console.log("response", response);
      setLoading(false);
      toast.success("Password Updated Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // You can use navigate here if needed
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Random String is not valid");
      toast.error("Random String is not valid", {
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

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendUpdatedData,
  });

  // Function to change background for the update password button
  function changeBgUpdatePassword() {
    document.getElementById("change").classList.add("auth");
    console.log("Working changeBgUpdatePassword");
  }

  return (
    <>
 
      <div className="bg-color">
      <div class="card m-5 mx-auto bg-light py-5 py-md-0 w-75 " >
  <div class="row g-0">
    <div class="col-md-5 " style={{ background: "linear-gradient(to bottom, #b086aa, #c9c9c7,#b086aa)"}}>
<h2 className="text-center my-5 mx-auto py-5 fw-bold">Password Reset</h2>
    </div>
    <div class="col-md-7">
      <div class="card-body ">
        <h1 className="text-main fw-bolder text-center">Update Password</h1>

        <form onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger ">{error}</p> : ""}
                <div className="position-relative">
                  <input
                    id="password-input"
                    type="password"
                    className="form-control mt-3"
                    placeholder="Enter Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <i
                    onClick={togglePasswordVisibility}
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
                  onClick={changeBgUpdatePassword}
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
                    "Update Password"
                  )}
                </button>
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
