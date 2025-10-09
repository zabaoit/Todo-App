import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v2/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Đăng Ký thất bại!");
        return;
      }

      setIsSuccess(true);
      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold  text-white">Sign up to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-xl font-medium text-gray-100">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="block w-full bg-white/5 px-3 py-1.5 text-base text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm/6 "
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-gray-100">Email</label>
            <div className="mt-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full bg-white/5 px-3 py-1.5 text-base text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm/6 "
              />
            </div>
          </div>

          <div>
            <label className="block text-xl font-medium text-gray-100">Password</label>
            <div className="mt-2">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full bg-white/5 px-3 py-1.5 text-base text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex justify-center max-w-60 mx-auto">
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 cursor-pointer"
            >
              Sign up
            </button>
          </div>

          <p className="text-sm font-semibold text-white text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-gray-400 underline">
              Login
            </Link>
          </p>
        </form>
        <Snackbar
          open={message}
          autoHideDuration={3000}
          onClose={() => setMessage("")}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={!isSuccess ? "error" : "success"}>{message}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Register;
