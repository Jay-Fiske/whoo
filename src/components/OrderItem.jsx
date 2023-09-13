const OrderItem = ({ id, details, quantity }) => {
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
            <h2 style={{ marginBottom: "10px" }}>
              $
              {(
                (details.price * (100 - details.discountPercentage)) /
                100
              ).toFixed(2)}
            </h2>
            <div>Quantity:&nbsp; {quantity}</div>
          </div>
        </div>
        <hr />
      </div>
    );
  };
  
  export default OrderItem;