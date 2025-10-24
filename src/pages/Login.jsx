import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { loginAnimation, loginAnimation2, loginAnimation3 } from "../animation";
import { AuthContext } from "../provider/MyProvider";
import LottieAnimation from "../animation/Walking";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { googleLogin, login, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await login(email, password);
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
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setTimeout(() => {
        toast.success("Logged in successfully!");
        navigate(from, {
          replace: true,
        }),
          1500;
      });
    } catch (err) {
      setError("Google login failed.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-[90vh] flex items-center justify-evenly gap-9 max-lg:flex-col-reverse max-lg:gap-18  bg-base-200 py-10">
        <div>
          <LottieAnimation animation={loginAnimation} />
        </div>
        <Helmet>
          <title>Forgot Password || FriendAssign</title>
        </Helmet>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shado">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Login
          </h2>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-accent w-full mt-2"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-accent w-full mt-2"
                placeholder="Enter your password"
                required
              />
            </div>
            <Link to="/auth/forgot-password" className="text-primary">
              Forgot password?
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              Log In
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mt-4"
            disabled={loading}
          >
            Sign in with Google
          </button>

          <div className="mt-4 flex justify-between text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-primary ml-2">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;