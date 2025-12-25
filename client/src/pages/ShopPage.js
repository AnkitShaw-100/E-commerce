import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import Filters from '../components/Filters';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/v1/product/get-products');
        console.log(data)
        setProducts(data.products || []);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  // Get product image URL from backend endpoint
     console.log("products",products)

    const getImageUrl = (photo) => {
        if (!photo || !photo.data || !photo.data.data) return '';
        const uint8Array = new Uint8Array(photo.data.data);
        const blob = new Blob([uint8Array], {
            type: photo.contentType,
        });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    };

  // Filter products by selected categories and price
  const filteredProducts = products.filter(prod => {
    let categoryMatch = true;
    let priceMatch = true;
    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(
        prod.category?._id || prod.category
      );
    }
    if (selectedPrice) {
      const [min, max] = selectedPrice.split('-').map(Number);
      priceMatch = prod.price >= min && prod.price <= max;
    }
    return categoryMatch && priceMatch;
  });

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <Filters
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div className="col-lg-9 col-md-8">
            <h2 className="mb-4 text-center fw-bold" style={{ color: '#222' }}>All Products</h2>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <div className="row g-4" style={{ overflowX: 'hidden', width: '100%' }}>
              {filteredProducts.map(prod => (
                <div key={prod._id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100 shadow-sm" style={{ minHeight: '370px', maxWidth: '100%' }}>
                    <img
                      src={getImageUrl(prod.photo)}
                      alt={prod.name}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px', width: '100%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title fw-bold mb-2">{prod.name}</h5>
                        <p className="card-text mb-1">{prod.category?.name || '-'}</p>
                        <p className="card-text small mb-2">{prod.description}</p>
                        <p className="card-text small mb-2">{prod.shipping ? 'Shipping Available' : 'No Shipping'}</p>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/product/${prod.slug || prod._id}`)}
                        >
                          View More
                        </button>
                        <button
                          className="btn btn-success btn-sm ms-2"
                          onClick={() => {
                            setCart(prev => {
                              const exists = prev.find(item => item._id === prod._id);
                              if (exists) return prev;
                              return [...prev, { ...prod, quantity: 1 }];
                            });
                            navigate('/cart');
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
