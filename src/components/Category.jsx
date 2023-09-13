import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import TitleBar from "./TitleBar";
import Rating from "./Rating";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [dataLoaded, setDataLoaded] = useState(false);
  const category = searchParams.get("category");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      });
  }, []);
  if (dataLoaded === false && loading === false) {
    console.log(products);
    setDataLoaded(true);
  }
  const productPage = (id) => {
    navigate({
      pathname: "/product",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };
  return loading === true ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <TitleBar />
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>{category}</h1>
      <div className="parent">
        {products.map((item) => {
          const offerPrice = (
            item.price *
            (100 - item.discountPercentage) *
            0.01
          ).toFixed(2);
          const ratingPercent = (item.rating - 4) * 100;
          return (
            <div className="child">
              <img src={item.thumbnail} onClick={() => productPage(item.id)} />
              <h2 onClick={() => productPage(item.id)}>{item.title}</h2>
              <h4>{item.brand}</h4>
              {item.stock < 50 && (
                <p className="stock">Only {item.stock} left!!!</p>
              )}
              <p>
                <span>{"$" + offerPrice}</span>
                <span className="original-price">
                  <s>{"$" + item.price}</s>
                </span>
                <span className="discount">
                  &#123;${item.discountPercentage}%&#125;
                </span>
              </p>
              <Rating percent={ratingPercent} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;