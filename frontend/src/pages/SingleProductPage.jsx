import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CreateContextApi } from "../context/MyContextApi";
import { add, update } from "../redux/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const SingleProductPage = () => {
    const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();
    const context = useContext(CreateContextApi);
    const { products, loading } = context;
    const { id } = useParams();
    const data = products.find((product) => product.id === parseInt(id));

    if (loading) { 
        return <Spinner />
    }

    const addToCart = () => {

        const existingProduct = cart.find((p) => p.id === data.id);
        if (existingProduct) {
            const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + 1 };
            dispatch(update(updatedProduct));
        } else {
            const newProduct = { ...data, quantity: 1 };
            dispatch(add(newProduct));
        }

        // console.log(data)
        // dispatch(add(data));
        toast.success("Item added to Cart");
    }

    return (
        <div className="product-page-wrapper">
            <div className="mx-container">
                <div className="product-page-container">
                    <div className="product-page-image">
                        <img src={data?.image} alt={data?.title} />
                    </div>
                    <div className="product-page-details">
                        <h2>{data?.title}</h2>
                        <p>{data?.description}</p>
                        <h3>${data?.price}</h3>
                        <button onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProductPage;