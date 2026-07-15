import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

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

  if (!property) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">

        <img
          src={property.image}
          alt={property.title}
          className="card-img-top"
          style={{
            height: "400px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">

          <h2>{property.title}</h2>

          <p>{property.description}</p>

          <h3 className="text-success">
            ₹ {property.price}
          </h3>

          <p>
            <strong>📍 Location:</strong> {property.location}
          </p>

          <p>
            <strong>🛏 Bedrooms:</strong> {property.bedrooms}
          </p>

          <p>
            <strong>🛁 Bathrooms:</strong> {property.bathrooms}
          </p>

          <Link to="/">
            <button className="btn btn-primary mt-3">
              ← Back to Home
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PropertyDetails;