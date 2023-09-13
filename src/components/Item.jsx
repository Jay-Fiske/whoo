import { useState } from "react";

const Item = ({ id, details, quantity,setUpdated,setItemDeleted }) => {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const handleQuantity = (e) => {
    const new_quantity = parseInt(e.target.value);
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const cartData = user_data.find((user) => user.signin === true).cart;
    const newcartData = cartData.map((item) => {
      if (item.itemId === id) {
        return { ...item, quantity: new_quantity };
      } else {
        return item;
      }
    });
    const new_user_data = user_data.map((user) => {
      if (user.signin === true) {
        return { ...user, cart: newcartData };
      } else {
        return user;
      }
    });
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    setProductQuantity(new_quantity);
    setUpdated(false);
  };
  const deleteItem = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const cartData = user_data.find((user) => user.signin === true).cart;
    const newcartData = cartData.filter((item) => item.itemId!==id);
    const new_user_data = user_data.map((user) => {
      if (user.signin === true) {
        return { ...user, cart: newcartData };
      } else {
        return user;
      }
    });
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    setItemDeleted(true);
  }
  return (
    <div>
      <div className="item">
        <img
          className="item-image"
          src={details.thumbnail}
          alt={details.title}
        />
        <div className="item-details">
          <h2>{details.title}</h2>
          <h4>{details.description}</h4>
          <h2 style={{ marginTop: "10px" }}>
            <span style={{ color: "red", fontSize: "20px" }}>
              -{details.discountPercentage}%
            </span>
          </h2>
          <h2 style={{ marginBottom: "10px" }}>
            <span>
              $
              {(
                (details.price * (100 - details.discountPercentage)) /
                100
              ).toFixed(2)}
            </span>
            &nbsp;
            <s style={{ color: "grey", fontSize: "large" }}>${details.price}</s>
          </h2>
          <div>
            Quantity:&nbsp;
            <select
              value={productQuantity}
              onChange={handleQuantity}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button className="add-to-cart" onClick={deleteItem}>Delete from Cart</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Item;