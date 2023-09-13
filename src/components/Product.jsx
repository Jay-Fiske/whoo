
import axios from "axios";
import React, { useEffect, useState } from "react";
import TitleBar from "./TitleBar";
import ProductSlider from "./ProductSlider";
import Rating from "./Rating";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const id = searchParams.get("id");
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`).then((response) => {
      setProduct(response.data);
      setLoading(false);
    });
  }, [id]);

  const handleCart = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const current_user = user_data.find((user) => user.signin === true);
    current_user.cart.push({
      itemId: nanoid(),
      productdetails: product,
      quantity: parseInt(quantity),
    });

    const new_user_data = user_data.map((user) => {
      if (user.signin === true) {
        return current_user;
      } else {
        return user;
      }
    });
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    window.alert(`${quantity} ${product.title} have been added to your cart`)
  };

  const handleOrders = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const current_user = user_data.find((user) => user.signin === true);

    current_user.orders.push({
      itemId: nanoid(),
      productdetails: product,
      quantity: parseInt(quantity),
    });

    const new_user_data = user_data.map((user) => {
      if (user.signin === true) {
        return current_user;
      } else {
        return user;
      }
    });
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    window.alert(`You have ordered ${quantity} ${product.title}`)
  };

  return loading === true ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : (
    <div className="individual-product">
      <TitleBar />
      <ProductSlider images={product.images} />
      <h1 className="product-title">{product.title}</h1>
      <h3>{product.description}</h3>
      <div className="product-rating">
        <Rating percent={(product.rating * 100) / 5} />
        &nbsp;
        {product.rating}
      </div>
      <h2 style={{ marginTop: "30px" }}>
        <span style={{ color: "red", fontSize: "20px" }}>
          -{product.discountPercentage}%
        </span>
        &nbsp;
        <span>
          $
          {((product.price * (100 - product.discountPercentage)) / 100).toFixed(
            2
          )}
        </span>
      </h2>
      <h3 style={{ color: "grey" }}>
        <s>${product.price}</s>
      </h3>
      <div className="quantity">
        Quantity:&nbsp;
        <select
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <button className="add-to-cart" onClick={handleCart}>
        Add to Cart
      </button>
      <button className="buy-now" onClick={handleOrders}>
        Buy Now
      </button>
      <div className="footer"></div>
    </div>
  );
};

export default Product;
