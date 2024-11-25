import React, { useState } from "react";
import axios from "axios";
import { login } from "../states/user/userSlice";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CancelIcon from "@mui/icons-material/Cancel";

const Signup = ({ changeTab }) => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(
        login({ _id: response.data._id, image: image, name: name, diets: [] })
      );
      changeTab("Diets");
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
            <label className="flex justify-center items-center place-self-center h-20 w-20 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
              <AddPhotoAlternateIcon className="text-gray-600" />
              <input type="file" hidden required onChange={handleUpload} />
            </label>
          )}
          <input
            placeholder="Name"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Email"
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            placeholder="Password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => changeTab("Login")}
            className="text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
