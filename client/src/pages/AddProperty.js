import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
  title: "",
  description: "",
  price: "",
  location: "",
  bedrooms: "",
  bathrooms: "",
});

const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", property.title);
  formData.append("description", property.description);
  formData.append("price", property.price);
  formData.append("location", property.location);
  formData.append("bedrooms", property.bedrooms);
  formData.append("bathrooms", property.bathrooms);

  if (image) {
    formData.append("image", image);
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/property/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);

    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to Add Property");
  }
};

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow-lg p-4">

            <h2 className="text-center mb-4">
              🏠 Add New Property
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Property Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={property.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={property.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={property.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={property.location}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label">Bedrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bedrooms"
                    value={property.bedrooms}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Bathrooms</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bathrooms"
                    value={property.bathrooms}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="mb-4">
  <label className="form-label">
    Upload Property Image
  </label>

  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    required
  />
</div>
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                ➕ Add Property
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AddProperty;