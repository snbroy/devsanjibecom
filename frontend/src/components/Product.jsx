import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../redux/Slices/CartSlice";
import { Link } from "react-router-dom";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    const existingProduct = cart.find((p) => p.id === post.id);
    if (existingProduct) {
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
      dispatch(update(updatedProduct));
    } else {
      const newProduct = { ...post, quantity: 1 };
      dispatch(add(newProduct));
    }
    toast.success("Item added to Cart");
  }
  return (
    <div className="product-item">
      <div className="product-details">
        <Link to={`/product/${post.id}`} className="full-link">&nbsp;</Link>
        <div className="">
          <img src={post.image} alt="" className="product-img" />
        </div>
        <div className="p-title">
          <p className="">{post?.title}</p>
        </div>
        <div>
          <p className="p-des">
            {post?.description?.split(" ").slice(0, 10).join(" ") + "..."}
          </p>
        </div>
        <div>
          <p className="">RS. {post?.price}</p>
        </div>
      </div>

      <div className="">
        <button
          className=""
          onClick={addToCart}
        >
          Add to Cart
        </button>

        {/* {
          cart?.some((p) => p.id === post.id) ?
            (<button
              className=""
              onClick={removeFromCart}
            >
              Remove Item
            </button>) :
            (<button
              className=""
              onClick={addToCart}
            >
              Add to Cart
            </button>)
        } */}

      </div>
    </div>
  );
};

export default Product;