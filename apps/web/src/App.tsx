import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SystemsPage from './pages/SystemsPage';
import SystemDetailPage from './pages/SystemDetailPage';
import TechnicalHubPage from './pages/TechnicalHubPage';
import MediaPage from './pages/MediaPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import MarketsPage from './pages/MarketsPage';
import ContactPage from './pages/ContactPage';
import PortalPage from './pages/PortalPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/systems" element={<SystemsPage />} />
        <Route path="/systems/:slug" element={<SystemDetailPage />} />
        <Route path="/technical-hub" element={<TechnicalHubPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/request-support" element={<SupportPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portal/dashboard" element={<PortalPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
