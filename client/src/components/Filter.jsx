import React, { useEffect, useState } from "react";
import axios from "axios";

const priceRanges = [
  { label: "Under ₹500", value: "0-500" },
  { label: "₹500 - ₹1000", value: "500-1000" },
  { label: "₹1000 - ₹5000", value: "1000-5000" },
  { label: "₹5000 - ₹10000", value: "5000-10000" },
  { label: "Above ₹10000", value: "10000-999999" },
];

const Filters = ({
  selectedCategories,
  setSelectedCategories,
  selectedPrice,
  setSelectedPrice,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        setCategories(data.categories || data.category || []);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div style={{ minWidth: 220 }}>
      <div className="mb-4">
        <h5 className="fw-bold mb-2">Filter by Category</h5>
        {categories.map((cat) => (
          <div key={cat._id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`cat-${cat._id}`}
              value={cat._id}
              checked={selectedCategories.includes(cat._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, cat._id]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((id) => id !== cat._id)
                  );
                }
              }}
            />
            <label className="form-check-label" htmlFor={`cat-${cat._id}`}>
              {cat.name}
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mt-2"
          onClick={() => setSelectedCategories([])}
        >
          Reset Category
        </button>
      </div>
      <div className="mb-4">
        <h5 className="fw-bold mb-2">Filter by Price</h5>
        {priceRanges.map((range) => (
          <div key={range.value} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="priceRange"
              id={`price-${range.value}`}
              value={range.value}
              checked={selectedPrice === range.value}
              onChange={(e) => setSelectedPrice(e.target.value)}
            />
            <label
              className="form-check-label"
              htmlFor={`price-${range.value}`}
            >
              {range.label}
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mt-2"
          onClick={() => setSelectedPrice("")}
        >
          Reset Price
        </button>
      </div>
    </div>
  );
};

export default Filters;
