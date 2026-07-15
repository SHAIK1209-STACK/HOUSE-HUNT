import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch Properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/property");
      setProperties(response.data.properties);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Property
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/property/delete/${id}`);
      alert("Property Deleted Successfully");
      fetchProperties();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Property");
    }
  };

  // Search + Filter
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase()) ||
      property.price.toString().includes(search);

    let matchesPrice = true;

    if (priceFilter === "under10") {
      matchesPrice = property.price < 1000000;
    } else if (priceFilter === "10to50") {
      matchesPrice =
        property.price >= 1000000 &&
        property.price <= 5000000;
    } else if (priceFilter === "above50") {
      matchesPrice = property.price > 5000000;
    }

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="container mt-5">

      <div className="text-center mb-4">
        <h1>🏠 Find Your Dream Home</h1>
        <p className="text-muted">
          Buy, Sell & Rent Properties Easily
        </p>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search by Title, Location or Price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <select
          className="form-select"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under10">Below ₹10 Lakhs</option>
          <option value="10to50">₹10 Lakhs - ₹50 Lakhs</option>
          <option value="above50">Above ₹50 Lakhs</option>
        </select>
      </div>

      <div className="row">

        {filteredProperties.length > 0 ? (

          filteredProperties.map((property) => (

            <div className="col-lg-4 col-md-6 mb-4" key={property._id}>

              <div className="card shadow-lg h-100">

                <img
                  src={property.image}
                  className="card-img-top"
                  alt={property.title}
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h4>{property.title}</h4>

                  <p>{property.description}</p>

                  <h5 className="text-success">
                    ₹ {property.price}
                  </h5>

                  <p>📍 {property.location}</p>

                  <p>🛏 {property.bedrooms} Bedrooms</p>

                  <p>🛁 {property.bathrooms} Bathrooms</p>

                </div>

                <div className="card-footer bg-white border-0">

                  <Link to={`/edit-property/${property._id}`}>
                    <button className="btn btn-primary w-100 mb-2">
                      Edit Property
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => deleteProperty(property._id)}
                  >
                    Delete Property
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <h3 className="text-center text-danger">
            No Properties Found
          </h3>

        )}

      </div>

    </div>
  );
}

export default Home;