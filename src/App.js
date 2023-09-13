import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Category from "./components/Category";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/category" element={<Category/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;