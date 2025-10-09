import React, { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/v2/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Đăng nhập thất bại!");
        return;
      }

      localStorage.setItem("token", data.token);

      setMessage("Đăng nhập thành công!");
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      setMessage("Lỗi kết nối server!");
    }
  };

  return (
    <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-3xl font-bold  text-white">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} class="space-y-6">
          <div>
            <label class="block text-xl font-medium text-gray-100">Email</label>
            <div class="mt-2">
              <input
                type="email"
                value={email}
                autoComplete="username"
                onChange={e => setEmail(e.target.value)}
                class="block w-full bg-white/5 px-3 py-1.5 text-base text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm/6 "
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label class="block text-xl font-medium text-gray-100">Password</label>
              <div class="text-md">
                <a href="#" class="font-semibold text-gray-400 hover:text-gray-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="mt-2">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                class="block w-full bg-white/5 px-3 py-1.5 text-base text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex justify-center max-w-60 mx-auto">
            <button
              type="submit"
              class="flex w-full justify-center rounded-lg bg-gray-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>

        {message && <p class="mt-10 text-center text-md text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
