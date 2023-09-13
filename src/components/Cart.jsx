import { useState } from "react";
import TitleBar from "./TitleBar";
import Item from "./Item";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [cart, setCart] = useState([]);
  const [itemDeleted, setItemDeleted] = useState(true);
  const fetchData = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const cartData = user_data.find((user) => user.signin === true).cart;
    setCart(cartData);
    return cartData;
  };
  const calculateCost = () => {
    let sum = 0;
    const cartData = fetchData();
    cartData.forEach((item) => {
      const discountPrice = (
        (item.productdetails.price *
          (100 - item.productdetails.discountPercentage)) /
        100
      ).toFixed(2);
      const individualCost = discountPrice * item.quantity;
      sum = sum + individualCost;
    });
    setTotalCost(sum.toFixed(2));
  };

  const checkout = () => {
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const current_user = user_data.find((user) => user.signin === true);
    const cartData = current_user.cart;
    const ordersData = current_user.orders;
    cartData.forEach(item=>{
      ordersData.push(item)
    })
    const new_user_data = user_data.map((user)=>{
      if (user.signin===true){
        return{...user,cart:[],orders:ordersData}
      }
      else{
        return user
      }
     
    })
    localStorage.setItem("user_data", JSON.stringify(new_user_data));
    fetchData()
    window.alert("All items in the cart have been ordered")
  }

  if (updated === false) {
    calculateCost();
    setUpdated(true);
  }

  if (itemDeleted === true) {
    fetchData();
    calculateCost();
    setItemDeleted(false);
  }

  const toHomePage = () => {
    navigate('/home');
  }


  return (
    <div>
      <TitleBar />
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <Item
              id={item.itemId}
              details={item.productdetails}
              quantity={item.quantity}
              setUpdated={setUpdated}
              setItemDeleted={setItemDeleted}
            />
          ))}
          <h1 className="total-cost">Total Cost: {totalCost}</h1>
          <button className="checkout" onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <div className="empty-cart">
          <h1>You have an empty cart</h1>
          <button className="add-to-cart" onClick={toHomePage}>SHOP NOW</button>
        </div>
       
      )}
    </div>
  );
};

export default Cart;