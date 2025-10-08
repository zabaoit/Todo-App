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

      // ✅ Lưu token vào localStorage
      localStorage.setItem("token", data.token);

      setMessage("Đăng nhập thành công!");
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      setMessage("Lỗi kết nối server!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-3 mb-4 rounded bg-gray-700 outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" className="w-full bg-teal-600 py-2 rounded hover:bg-teal-700 transition">
          Đăng nhập
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
