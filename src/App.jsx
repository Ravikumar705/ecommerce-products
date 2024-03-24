import "./App.css";
import IncludeProduct from "./components/IncludeProduct";
import ProductList from "./components/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/add-product" element={<IncludeProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
