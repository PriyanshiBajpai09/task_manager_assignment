import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
  setError("");

  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    setSuccess(true);

    setTimeout(() => {
      nav("/dashboard");
    }, 1500);

  } catch (err) {
    setError(err.response?.data?.msg || "Login failed");
  }
};

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-dark1 to-dark4 text-white">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl text-center shadow-xl">

          <h2 className="text-2xl font-bold mb-4 text-green-400">
            ✅ Login Successful!
          </h2>

          <p className="text-gray-300">
            Redirecting to dashboard...
          </p>

        </div>
      </div>
    );
  }

  // ✅ LOGIN UI
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-dark1 to-dark4">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-[350px] shadow-2xl">

        <h2 className="text-white text-3xl font-bold mb-6 text-center">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded-lg bg-white/10 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-[#168777] text-white p-3 rounded-lg transition font-semibold"
        >
          Login
        </button>

        <p
          onClick={() => nav("/signup")}
          className="text-center mt-4 cursor-pointer text-sm text-gray-300 hover:text-white"
        >
          New user? Signup
        </p>

      </div>
    </div>
  );
}