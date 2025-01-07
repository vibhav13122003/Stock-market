import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Actions/user";
import { axiosSignin } from "../../../utils/api";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
    alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await axiosSignin(
        {
          email: email.trim(),
          password: password.trim(),
          role: "client",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(login(data));
       
      })

    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
     
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-900 p-4 ">
      <div className="flex w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden bg-white transition-shadow duration-1000 hover:shadow-2xl hover:shadow-cyan-400">
        <div
          className="lg:block w-1/2 bg-cover bg-center rounded-l-2xl imgdiv"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/stock-market-illustration-with-bull-bear_1017-9635.jpg?t=st=1735731306~exp=1735734906~hmac=d2610fd1194f49ee9b28a52c551576d3d42636e496c6967661d2fcf6857b2d81&w=740')",
          }}
        >
          <div className="h-full text-white flex flex-col justify-center items-center p-7">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="mt-4 text-center">
              Manage your stock portfolio efficiently and track market trends
              in one place.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-7">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Login to Your Account
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-950 focus:outline-none"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-center">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
