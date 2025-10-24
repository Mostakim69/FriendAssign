import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../provider/MyProvider";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // Simulate sending reset email
    if (email.trim()) {
      resetPassword(email)
        .then(() => {
          setMessage(`Reset link sent to ${email}`);
          setEmail("");
        })
        .catch((error) => {
          console.error("Error sending reset email:", error);
          setMessage("Failed to send reset email.");
        });
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Helmet>
        <title>Forgot Password || FlavorBook</title>
      </Helmet>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleReset}>
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="text-sm text-green-600 mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;