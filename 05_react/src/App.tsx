import "./index.css";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Payments } from "./components/Payments";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
        <nav className="mb-8">
          <ul className="flex justify-center gap-4">
            <li><Link to="/" className="nav-link">Products</Link></li>
            <li><Link to="/cart" className="nav-link">Cart</Link></li>
            <li><Link to="/payments" className="nav-link">Payments</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}