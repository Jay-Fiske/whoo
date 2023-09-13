import { useState } from "react";
import TitleBar from "./TitleBar";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [updated, setUpdated] = useState(false);
  const fetchData = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const orderData = user_data.find((user) => user.signin === true).orders;
    setOrders(orderData);
  };
  if (updated === false) {
    fetchData();
    setUpdated(true);
  }

  const toHomePage = () => {
    navigate("/home");
  };

  return (
    <div>
      <TitleBar />
      {orders.length > 0 ? (
        <div>
          {orders.map((item) => (
            <OrderItem
              id={item.itemId}
              details={item.productdetails}
              quantity={item.quantity}
            />
          ))}
        </div>
      ) : (
        <div className="empty-cart">
          <h1>You have not ordered any items</h1>
          <button className="add-to-cart" onClick={toHomePage}>
            SHOP NOW
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;