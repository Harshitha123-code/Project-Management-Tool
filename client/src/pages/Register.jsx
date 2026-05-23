import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg w-96">

        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white outline-none"
          />

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded"
          >
            Register
          </button>

        </form>

        <p className="text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;