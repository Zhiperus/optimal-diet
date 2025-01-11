import React, { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { toBase64 } from "../utils/utilities";
import { login } from "../states/user/userSlice";
import md5 from "md5";

const Login = () => {
  const [error, setError] = useState("");
  const [passVisibility, setPassVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = md5(e.target.password.value);
    let response;

    try {
      response = await axios.get("http://localhost:3000", {
        params: { email, password },
      });

      const {
        _id,
        image: { data: buffer },
        name,
        diets,
      } = response.data;

      const image = toBase64(buffer);
      dispatch(login({ _id, image, name, diets }));
      navigate("/dietlists");
    } catch (e) {
      setError(e.response.data);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Log In
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="relative">
            <button
              className="absolute bottom-2 right-3 z-10"
              onClick={(e) => {
                e.preventDefault();
                setPassVisibility(!passVisibility);
              }}
            >
              {passVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
            <input
              name="password"
              placeholder="Password"
              type={`${passVisibility ? "text" : "password"}`}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup">
            {" "}
            <button className="text-blue-600 hover:underline">Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
