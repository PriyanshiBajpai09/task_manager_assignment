import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      setSuccess(true);

      // auto redirect after 2 sec
      setTimeout(() => {
        nav("/");
      }, 2000);

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-dark1 to-dark4 text-white">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl text-center shadow-xl">

          <h2 className="text-2xl font-bold mb-4 text-green-400">
            ✅ Signup Successful!
          </h2>

          <p className="text-gray-300 mb-2">
            Redirecting to login...
          </p>

        </div>
      </div>
    );
  }

  // ✅ NORMAL SIGNUP UI
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-dark1 to-dark4">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-[350px] shadow-xl">

        <h2 className="text-white text-2xl mb-6 text-center font-semibold">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-3 bg-white/10 text-white rounded outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-3 bg-white/10 text-white rounded outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-5 bg-white/10 text-white rounded outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-primary p-3 rounded text-white font-semibold hover:opacity-90 transition"
        >
          Signup
        </button>

        <p
          onClick={() => nav("/")}
          className="text-center mt-4 cursor-pointer text-sm text-gray-300 hover:text-white"
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}