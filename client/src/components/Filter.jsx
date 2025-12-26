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
  openSection, // optional: 'category' | 'price' to open specific section
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

  const [openCategory, setOpenCategory] = useState(
    openSection ? openSection === "category" : true
  );
  const [openPrice, setOpenPrice] = useState(
    openSection ? openSection === "price" : true
  );

  useEffect(() => {
    if (openSection === undefined || openSection === null) return;
    if (openSection === "category") {
      setOpenCategory(true);
      setOpenPrice(false);
    } else if (openSection === "price") {
      setOpenPrice(true);
      setOpenCategory(false);
    }
  }, [openSection]);

  return (
    <div style={{ minWidth: 220 }}>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setOpenCategory((s) => !s)}
          className="w-full flex items-center justify-between text-left"
        >
          <h5 className="fw-bold mb-2">Filter by Category</h5>
          <svg
            className={`w-4 h-4 transform transition-transform ${openCategory ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openCategory && (
          <div className="mt-2">
            {categories.map((cat) => (
              <div key={cat._id} className="form-check mb-1">
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
                  style={{ accentColor: "#000" }}
                />
                <label className="form-check-label ms-2" htmlFor={`cat-${cat._id}`}>
                  {cat.name}
                </label>
              </div>
            ))}

            <button
              type="button"
              className="mt-2 text-sm px-3 py-2 bg-white text-black border border-black rounded-md"
              onClick={() => setSelectedCategories([])}
            >
              Reset Category
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setOpenPrice((s) => !s)}
          className="w-full flex items-center justify-between text-left"
        >
          <h5 className="fw-bold mb-2">Filter by Price</h5>
          <svg
            className={`w-4 h-4 transform transition-transform ${openPrice ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openPrice && (
          <div className="mt-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priceRange"
                  id={`price-${range.value}`}
                  value={range.value}
                  checked={selectedPrice === range.value}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  style={{ accentColor: "#000" }}
                />
                <label className="form-check-label ms-2" htmlFor={`price-${range.value}`}>
                  {range.label}
                </label>
              </div>
            ))}

            <button
              type="button"
              className="mt-2 text-sm px-3 py-2 bg-white text-black border border-black rounded-md"
              onClick={() => setSelectedPrice("")}
            >
              Reset Price
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
