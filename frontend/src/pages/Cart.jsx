import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"
import { useEffect, useState } from "react";

const Cart = () => {
  const { cart } = useSelector((state) => state)
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  useEffect(() => {
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    setTotalAmount(totalPrice)
    setTotalQty(totalQuantity)
  }, [cart])

  return (
    <div className="cart-wrapper">
      <div className="mx-container">
        <h1>Your Cart</h1>
        {
          cart.length > 0 ?
            (<div className="cart-container">
              <div className="cart-items">
                {
                  cart.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))
                }
              </div>
              <div className="cart-summary">
                <div>
                  <div className="uppercase text-green-700 font-semibold">Your Cart</div>
                  <div className="uppercase text-green-700 font-bold text-4xl">Summary</div>
                  <p className="mt-3 font-bold">
                    <span>Total Item: {totalQty}</span>
                  </p>
                </div>

                <div>
                  <p className="">Total Amount: <span className="font-bold">Rs. {totalAmount.toFixed(2)}</span></p>
                  <Link className="button" to={"/checkout"}>Checkout Now</Link>
                </div>

              </div>
            </div>) :
            (
              <p className="empty-card">Your cart is empty. <Link to="/collection/all">Continue Shopping</Link></p>
            )
        }
      </div>
    </div>
  );
};

export default Cart;