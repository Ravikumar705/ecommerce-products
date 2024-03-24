import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function IncludeProduct() {
  const product = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    thumbnail: "",
  };
  const [data, setData] = useState(product);

  const location = useLocation();
  const id = location?.state?.id;
  if (!!id) {
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/products${id}`)
        .then((res) => setData(res.data.oneProduct))
        .catch((err) => console.log(err));
    }, [id]);
  }

  const navigate = useNavigate();

  const dataSend = (e) => {
    e.preventDefault();
    try {
      console.log(data);
      setData(product);
      if (
        data.title ||
        data.description ||
        data.price ||
        data.rating ||
        data.stock ||
        data.thumbnail
      ) {
        axios
          .post("http://localhost:8080/api/products", data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        navigate("/");
      } else {
        alert("Please fill all required fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataUpdate = (e) => {
    e.preventDefault();
    try {
      console.log(data);
      setData(product);
      if (
        data.title ||
        data.description ||
        data.price ||
        data.rating ||
        data.stock ||
        data.thumbnail
      ) {
        axios
          .patch(`http://localhost:8080/api/products${data._id}`, data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        navigate("/");
      } else {
        alert("Please fill all required fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container container1">
      <div className="add-product">
        <h1>Add products</h1>
      </div>
      <form onSubmit={!!id ? dataUpdate : dataSend}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          value={data.title}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={data.description}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          type="text"
          name="price"
          id="price"
          placeholder="price"
          value={data.price}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="discountPercentage">DiscountPercentage</label>
        <br />
        <input
          type="text"
          name="discountPercentage"
          id="discountPercentage"
          placeholder="discount"
          value={data.discountPercentage}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="rating">Rating</label>
        <br />
        <input
          type="text"
          name="rating"
          id="rating"
          placeholder="rating"
          value={data.rating}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="stock">Stock</label>
        <br />
        <input
          type="text"
          name="stock"
          id="stock"
          placeholder="stocks"
          value={data.stock}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        <label htmlFor="thumbnail">Thumbnail</label>
        <br />
        <input
          type="text"
          name="thumbnail"
          id="thumbnail"
          placeholder="thumbnail"
          value={data.thumbnail}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <br />
        {id ? (
          <div className="update-button">
            <button type="submit">Update</button>
          </div>
        ) : (
          <div className="add-button">
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default IncludeProduct;
