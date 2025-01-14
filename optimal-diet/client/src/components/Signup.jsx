import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import md5 from "md5";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";
import imageCompression from "browser-image-compression";

import { login } from "../states/user/userSlice";
import { toBase64 } from "../utils/utilities";

const Signup = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [passVisibility, setPassVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.2, // 200 KB
      maxWidthOrHeight: 300, // Resize to 300px
    };

    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const formData = new FormData();
    if (image) {
      try {
        const compressedFile = await compressImage(image);
        formData.append("image", compressedFile);
      } catch (err) {
        setError("Error compressing image");
        return;
      }
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", md5(password));

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const {
        _id,
        image: { data: buffer },
      } = response.data;

      dispatch(
        login({
          _id: _id,
          image: "data:image/jpg;base64," + toBase64(buffer),
          name: name,
          diets: [],
        })
      );
      navigate("/dietmaker");
    } catch (e) {
      setError(e.response.data);
    }
  };

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign Up
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {image ? (
            <div className="relative flex justify-center items-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded preview"
                className="h-20 w-20 rounded-full object-cover border-2 border-gray-300"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-100"
              >
                <CancelIcon fontSize="small" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <label className="flex justify-center items-center h-20 w-20 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                <AddPhotoAlternateIcon className="text-gray-600" />
                <input
                  name="image"
                  type="file"
                  hidden
                  required
                  onChange={handleUpload}
                  accept="image/*"
                />
              </label>
            </div>
          )}
          <input
            name="name"
            placeholder="Name"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login">
            <button className="text-blue-600 hover:underline">Log in</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
