import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/property"
      );

      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  const totalProperties = properties.length;

  const totalPrice = properties.reduce(
    (sum, property) => sum + Number(property.price),
    0
  );

  const averagePrice =
    totalProperties > 0
      ? Math.round(totalPrice / totalProperties)
      : 0;

  const cities = [...new Set(properties.map((p) => p.location))];

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-5">
        📊 Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h3>🏠</h3>
            <h2>{totalProperties}</h2>
            <p>Total Properties</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h3>💰</h3>
            <h2>₹ {averagePrice}</h2>
            <p>Average Price</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow p-4">
            <h3>📍</h3>
            <h2>{cities.length}</h2>
            <p>Cities Available</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;