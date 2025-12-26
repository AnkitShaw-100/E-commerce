import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/ShippingPolicy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UserDashboard from "./pages/user/UserDashboardHome";
import UserProfile from "./pages/user/UserProfile";
import UserOrders from "./pages/user/UserOrders";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminDetails from "./pages/Admin/AdminDetails";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ShopPage from "./pages/ShopPage";
import Users from "./pages/Admin/Users";
import AdminOrders from "./pages/Admin/AdminOrders";
import NewProducts from "./pages/Admin/NewProducts";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnRefund from "./pages/ReturnRefund";
import Support from "./pages/Support";
import FAQs from "./pages/FAQs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/refund" element={<ReturnRefund />} />
      <Route path="/support" element={<Support />} />
      <Route path="/faq" element={<FAQs />} />

      {/* User Dashboard Route and subpages (nested, like admin) */}
      <Route path="/dashboard/user" element={<PrivateRoute />}>
        <Route element={<UserDashboard />}>
          <Route index element={<UserProfile />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
      </Route>

      {/* Admin Dashboard Route and subpages (nested) */}
      <Route path="/dashboard/admin" element={<AdminRoute />}>
        <Route element={<AdminDashboard />}>
          <Route index element={<AdminDetails />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="new-products" element={<NewProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
