import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow-lg p-4">

            <h2 className="text-center mb-4">📝 Register</h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Register
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;