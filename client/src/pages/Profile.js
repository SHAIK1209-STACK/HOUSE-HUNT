import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name: user.name,
          phone: user.phone,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              👤 My Profile
            </h2>

            <div className="mb-3">
              <label>Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>

              <input
                type="email"
                className="form-control"
                value={user.email}
                disabled
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleUpdate}
            >
              Update Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;