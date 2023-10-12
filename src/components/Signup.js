import React, { useState } from 'react';
import './Signup.css';
import login from '../assets/login.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss';


export default function Signup() {
  const [val, setVal] = useState({ firstName: "", lastName: "", email: "", mobileNumber: "", password: "", udid: "", otp: "" });
  const navigate = useNavigate()

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setVal((prev) => ({
      ...prev, [name]: type === "checked" ? checked : value
    }))
  }
  async function saveHandler(e) {
    console.log(val);
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      udid,
      otp,
    } = val;

    if (firstName === "") {
      toast.error("Please enter Your First Name");
    } else if (lastName === "") {
      toast.error("Please enter Your Last Name");
    } else if (email === "") {
      toast.error("Please enter Your email");
    } else if (!email.includes("@")) {
      toast.error("Enter valid email");
    } else if (!email.includes(".")) {
      toast.error("Enter valid email");
    } else if (password === "") {
      toast.error("Enter your password");
    } else if (password.length < 8) {
      toast.error("Password must be 8 char");
    } else if (mobileNumber === "") {
      toast.error("Enter your Mobile Number");
    } else if (mobileNumber.length < 10) {
      toast.error("Mobile Number must be 10 char");
    } else if (udid === "") {
      toast.error("Enter your UDID");
    } else if (otp === "") {
      toast.error(`Click, Get Code to receive your verification code via email`);
    } else {

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            mobileNumber,
            password,
            udid,
            otp,
          }),
        });

        // Check the status code of the response
        if (response.status === 200) {
          // Registration successful
          const data = await response.json();
          console.log(data);
          toast.success("User registration done");

          // Clear form fields and redirect to the login page
          setVal({
            ...val,
            firstName: "",
            lastName: "",
            email: "",
            mobileNumber: "",
            password: "",
            udid: "",
            otp: "",
          });
          navigate('/login');
        } else if (response.status === 403) {
          // All Fields are required
          // alert("All fields are required");
          toast.error("All fields are required");
        } else if (response.status === 409) {
          // User already exists
          toast.error("User already exists. Please sign in to continue.");
        } else if (response.status === 405) {
          // Invalid OTP or other error
          toast.error("Verification Code is not valid");
        } else {
          // Handle other status codes as needed
          toast.error("User registration failed. Server returned an unexpected status code.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("User registration failed. Please try again.");
      }
    }
  }

  async function getCodeHandler(e) {
    e.preventDefault();
    const { email } = val;
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const res = await data.json();

      if (data.status === 200) {
        // OTP sent successfully
        // toast.success("Verification OTP sent successfully");
        // Verification code sent to email, check spam folder if missing.
        Swal.fire({
          title: '<h4><b>Verification Code</b></h4>',
          html:
            '<h5>Verification code sent to email,  check<b> spam</b> folder if missing. </h5> ',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      } else if (data.status === 401) {
        // User is already registered
        toast.error("User is already registered. Please sign in to continue.");
      } else {
        // Handle other status codes or error cases
        toast.error("Failed to send OTP. Please fill your email. First!.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  }
  async function loginHandler(e) {
    navigate('/login')
  }


  return (
    <div className='backsignup21'>
      <div className='signlogin21'>
        <div className='signmaindivimage21'>
          <img src={login} alt="loginimage" />
        </div>
        <div className='signloginform21'>

          <div className='signdetail21'>
            <h3>Welcome,Create your account</h3>
            <div className="signcontent21">
              <form>
                <div className="signuser-details21">
                  <div className="signinput-box21">
                    <label className="signdetails21" >First Name</label>
                    <input type="text" placeholder="Enter your name" required name="firstName" value={val.firstName} onChange={changeHandler} />
                  </div>
                  <div className="signinput-box21">
                    <label className="signdetails21" >Last Name</label>
                    <input type="text" placeholder="Enter your username" required name="lastName" value={val.lastName} onChange={changeHandler} />
                  </div>
                </div>
                <div className='signlongdiv21'>
                  <div className="signinput-box21">
                    <label className="signdetails21" >Email</label>
                    <input type="email" placeholder="Enter your email address" name="email" value={val.email} onChange={changeHandler} style={{ width: "350px", height: "40px", marginBottom: '10px', fontSize: '16px' }} />

                  </div>
                  <div className="signinput-box21">
                    <label className="signdetails21" >Password</label>
                    <input type="password" placeholder="***************" name="password" value={val.password} onChange={changeHandler} style={{ width: "350px", height: "40px", marginBottom: '10px', fontSize: '16px' }} />
                  </div>
                  <div className="signinput-box21">
                    <label className="signdetails21" >Mobile</label>
                    <input type="number" placeholder="Enter your mobile number" name="mobileNumber" value={val.mobileNumber} onChange={changeHandler} style={{ width: "350px", height: "40px", marginBottom: '10px', fontSize: '16px' }} />
                  </div>
                  <div className="signinput-box21">
                    <label className="signdetails21" >UDID</label>
                    <input type="text" placeholder="Enter your UDID number" name="udid" value={val.udid} onChange={changeHandler} style={{ width: "350px", height: "40px", marginBottom: '10px', fontSize: '16px' }} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ float: "left", fontSize: "17px", fontWeight: "600" }} className='verification21'>Verification Code</div>
                  <p style={{ fontSize: "13px", whiteSpace: "nowrap", textOverflow: "clip", width: "100%", color: "black", fontWeight: "400" }}>Click "Get Code" to receive your verification code via email</p>
                  <div className='signgetcode21'>
                    <input type="text" placeholder="" required name="otp" value={val.otp} onChange={changeHandler} />
                    <p className='code21' onClick={getCodeHandler}>Get Code</p>
                  </div>
                </div>
                <button type='submit' className='signloginbutton21' onClick={saveHandler}>Create Account</button>
                <p className='signloginregister21'>Already Registered?<label style={{ color: "#F58840", cursor: "pointer" }} onClick={loginHandler}>Login</label> here</p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
