import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProduct(res.data.products))
      .catch((err) => console.warn(err));
  }, [products]);

  const deleteProduct = (id) => {
    const confirmation = confirm("Are you sure ?");
    if (confirmation) {
      axios
        .delete(`http://localhost:8080/api/products/${id}`)
        .then((res) => {
          console.log(res.data.success);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <h1>Product List</h1>{" "}
        <div className="addButton">
          <Link className="addProduct" to="/add-product">
            AddProduct
          </Link>
        </div>
      </div>
      <div className="container">
        {products.map((product) => {
          return (
            <div className="card" key={product._id}>
              <div className="button-container">
                <button
                  onClick={() =>
                    navigate("/add-product", {
                      replace: false,
                      state: { id: product._id },
                    })
                  }
                  className="update-btn"
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
              <div className="thumbnail">
                <img src={product.thumbnail} alt="thumbnail" srcSet="" />
              </div>
              <div className="product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>
                  <span>Rating </span>
                  <span className="rating">
                    {product.rating.toFixed(1)} / 5
                  </span>
                </p>
                <p>
                  <span className="price">${product.price}</span>{" "}
                  <span className="discount">
                    {Math.round(product.discountPercentage)} %
                  </span>
                </p>
                <p>
                  In stocks{" "}
                  <span className="stocks">{product.stock} units</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProductList;
