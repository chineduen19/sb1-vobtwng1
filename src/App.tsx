import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import AffiliateDashboard from './pages/dashboard/AffiliateDashboard';
import VendorDashboard from './pages/dashboard/VendorDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import SubscriptionPage from './pages/auth/SubscriptionPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="marketplace/product/:id" element={<ProductPage />} />
          <Route path="checkout/:id" element={<CheckoutPage />} />
          <Route path="payment/success" element={<PaymentSuccessPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={<ProtectedRoute />}>
            <Route path="affiliate" element={<AffiliateDashboard />} />
            <Route path="vendor" element={<VendorDashboard />} />
            <Route path="customer" element={<CustomerDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;