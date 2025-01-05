import { useDispatch } from "react-redux";
import { remove, update } from "../redux/Slices/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = (product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    dispatch(update(updatedProduct));
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      dispatch(update(updatedProduct));
    } else {
      dispatch(remove(product));
    }
  };

  const removeFromCart = (id) => {
    dispatch(remove(id));
  };

  return (
    <div className="cart-item">

      <img src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p>Rs. {item.price}</p>
        <div className="quantity-controls">
          <button onClick={() => handleDecrement(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncrement(item)}>+</button>
        </div>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
      {/* <div className="w-full flex justify-between gap-x-10">

        <div className="w-[170px] object-fill">
          <img src={item.image} alt="" className="" />
        </div>

        <div className="w-[450px] flex flex-col gap-y-4">
          <h1 className="font-semibold text-lg">{item.title}</h1>
          <h1 className="text-sm">{item.description.split(" ").slice(1, 20).join(" ") + "..."}</h1>
          <div className="flex justify-between">
            <p className="text-green-700 font-semibold">${item.price}</p>
            <div
              className="bg-pink-200 p-3 rounded-full hover:cursor-pointer"
              onClick={removeFromCart}
            >
              x
            </div>
          </div>

        </div>


      </div> */}

    </div>
  );
};

export default CartItem;