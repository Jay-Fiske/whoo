import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { useNavigate,createSearchParams } from "react-router-dom";

const Categories = () => {
  const [allCategories, setAllCategories] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => handleData(data.products));
  }, []);
  const productPage = (id) => {
    navigate({
      pathname:"/product",
      search:createSearchParams({
        id: id
      }).toString()
    })
  }
  const handleData = (data) => {
    const all_data = [];
    let index = 0;
    while (index < data.length) {
      const category_name = data[index].category;
      const category_data = [];
      while (index < data.length && category_name === data[index].category) {
        category_data.push(data[index]);
        index = index + 1;
      }
      all_data.push(category_data);
    }
    setAllCategories(
      all_data.map((category,index) => {
        const title = category[0].category.toUpperCase();

        return (
          <div className="category" key={index}>
            <h2>{title}</h2>
            <div className="products">
              {category.map((cat) => {
                const offerPrice = (
                  cat.price *
                  (100 - cat.discountPercentage) *
                  0.01
                ).toFixed(2);
                const ratingPercent = ((cat.rating-4) * 100)
                return (
                  <div key={cat.id} className="product">
                    <img
                      className="image"
                      src={cat.thumbnail}
                      alt={cat.title}
                      onClick={()=>productPage(cat.id)}
                    />
                    <h4>{cat.title}</h4>
                    <p>
                      <span>{"$" + offerPrice}</span>
                      <span className="original-price">
                        <s>{"$" + cat.price}</s>
                      </span>
                      <span className="discount">
                        &#123;${cat.discountPercentage}%&#125;
                      </span>
                    </p>
            <Rating percent={ratingPercent}/>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })
    );
  };
  return <div className="categories">{allCategories}</div>;
};

export default Categories;