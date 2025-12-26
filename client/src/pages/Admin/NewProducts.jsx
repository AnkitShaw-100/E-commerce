import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/get-products");
        const list = data.products || [];
        // sort by createdAt desc (new -> old)
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(list);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const token = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).token : "";
      await axios.delete(`/api/v1/product/delete-product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      // refresh list
      const { data } = await axios.get("/api/v1/product/get-products");
      const list = data.products || [];
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(list);
      // if current page now empty, go back one
      if (displayed.length === 1 && currentPage > 1) setCurrentPage((p) => p - 1);
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    // navigate to create-product and pass product in state for editing
    navigate('/dashboard/admin/create-product', { state: { product } });
  };

  const getImageUrl = (photo) => {
    try {
      if (!photo || !photo.data || !photo.data.data) return "";
      const uint8Array = new Uint8Array(photo.data.data);
      const blob = new Blob([uint8Array], { type: photo.contentType });
      return URL.createObjectURL(blob);
    } catch (e) {
      return "";
    }
  };

  // pagination
  const totalPages = Math.max(1, Math.ceil(products.length / perPage));
  const start = (currentPage - 1) * perPage;
  const displayed = products.slice(start, start + perPage);

  return (
    <div className="bg-white rounded-xl  p-6">
      <h2 className="text-xl font-semibold mb-4">All Products </h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading products...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-sm text-gray-500">No products yet.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((p) => (
              <div key={p._id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                {p.photo && (
                  <img src={getImageUrl(p.photo)} alt={p.name} className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-900">{p.name}</h5>
                      <p className="text-xs text-gray-500">{p.category?.name || '-'}</p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="flex-1 px-3 py-2 bg-black text-white rounded-md text-sm">Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="flex-1 px-3 py-2 bg-gray-100 text-gray-800 rounded-md text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length > perPage && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
              >Prev</button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700'}`}
                >{i + 1}</button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
              >Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewProducts;
