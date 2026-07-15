import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    image: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/property/${id}`
      );

      setProperty(response.data.property);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/property/update/${id}`,
        property
      );

      alert("Property Updated Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to Update Property");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "30px auto",
      }}
    >
      <h2>Edit Property</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={property.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={property.description}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={property.price}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={property.bedrooms}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={property.bathrooms}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={property.image}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditProperty;