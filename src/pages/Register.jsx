import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import LottieAnimation from "../animation/Walking";
import { loginAnimation2 } from "../animation";
import { AuthContext } from "../provider/MyProvider";

const Register = () => {
  const { createUser, updateUser, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(from, "Register.jsx", 12);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    // Password validation
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const minLength = password.length >= 6;

    if (!upperCase || !lowerCase || !minLength) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password must include at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      });
      return;
    }

    setError("");
    createUser(email, password)
      .then(() => {
        updateUser(name, photoUrl)
          .then(() => {
            Swal.fire("Success", "Account created successfully!", "success");
            form.reset();
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  const handleGoogleSignup = () => {
    googleLogin()
      .then(() => {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            timer: 1000,
            title: "Success",
            text: "Successfully logged in!",
            showConfirmButton: false,
          });
          navigate(from, {
            replace: true,
          }),
            1500;
        });
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gray-10 max-lg:flex-col-reverse max-lg:my-10">
      <div>
        <LottieAnimation animation={loginAnimation2} />
      </div>
      <Helmet>
        <title>Register || FlavorBook</title>
      </Helmet>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-info w-full mt-2"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-info w-full mt-2"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>

          <div className="flex items-center mb-4 input input-info w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter a strong password"
              required
            />
            <Link onClick={() => setShowPassword(!showPassword)} to="">
              {showPassword ? (
                <EyeIcon className="w-5 h-5 text-gray-500 hover:text-primary" />
              ) : (
                <EyeOffIcon className="w-5 h-5 text-gray-500 hover:text-primary" />
              )}
            </Link>
          </div>

          {/* Photo URL Field */}
          <div className="mb-6">
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              className="input input-info w-full mt-2"
              placeholder="Enter your photo URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full py-2 text-white"
          >
            Register
          </button>
        </form>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="btn btn-outline btn-primary w-full py-2 mt-3"
        >
          Sign up with Google
        </button>

        {/* Already have an account */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?
            <Link to="/auth/login" className="text-primary ml-3">
              Log In
            </Link>
          </p>
        </div>
        {error && (
          <h2 className="text-red-500 mt-4 font-semibold capitalize">
            {error}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Register;