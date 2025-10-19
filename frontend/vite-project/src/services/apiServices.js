import API from "../components/api.js";

// Auth API functions
export const authAPI = {
  // Sign up
  signup: async (userData) => {
    try {
      const response = await API.post("/api/auth/signup", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Signup failed" };
    }
  },

  // Log in
  login: async (credentials) => {
    try {
      const response = await API.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
};

// Product API functions
export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await API.get("/api/products");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch products" };
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await API.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch product" };
    }
  },
};

// Order API functions
export const orderAPI = {
  // Create order
  createOrder: async (orderData) => {
    try {
      const response = await API.post("/api/orders", orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create order" };
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await API.get("/api/orders/my");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch orders" };
    }
  },
};
