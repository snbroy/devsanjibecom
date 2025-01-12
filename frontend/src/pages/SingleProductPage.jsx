import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateContextApi } from "../context/MyContextApi";
import { add, update } from "../redux/Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SingleProductPage = () => {
    const { cart } = useSelector((state) => state);
    const dispatch = useDispatch();
    const context = useContext(CreateContextApi);
    const { products, loading } = context;
    const { id } = useParams();
    const data = products.find((product) => product.id === parseInt(id));
    const [mainImage, setMainImage] = useState();

    useEffect(() => {
        if (data) {
            setMainImage(data?.images[0]);
        }
    }, [data]);

    const imageRendering = (e) => {
        setMainImage(e.target.src)   
    }

    if (loading) { 
        return <Spinner />
    }

    const relatedProducts = products.filter((product) => product?.category?.name?.toLowerCase().replaceAll(' ','') === data?.category?.name?.toLowerCase().replaceAll(' ','') && product.id !== data.id).slice(0, 4);

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

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    console.log(mainImage);
    return (
        <div className="product-page-wrapper">
            <div className="mx-container">
                <div className="product-page-container">
                    <div className="product-page-image">
                        <div className="main-image">
                            <img src={mainImage?.replace("[","").replace("]","").replace(/['"]+/g, '')} alt={data?.title} />
                        </div>
                        <div className="thumbnail-images">
                            {
                                data?.images.map((image, index) => {
                                    const active = image === mainImage ? 'active' : '';
                                    return (
                                        <div key={index} className={`thumbnail-image ${active}`} onClick={(e)=>imageRendering(e)}>
                                            <img src={image?.replace("[","").replace("]","").replace(/['"]+/g, '')} alt={data?.title} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <img src={data?.image} alt={data?.title} /> */}
                    </div>
                    <div className="product-page-details">
                        <h2>{data?.title}</h2>
                        <p className="tag">{data?.category?.name}</p>
                        <p>{data?.description}</p>
                        <h3>Rs. {data?.price}</h3>
                        <button onClick={addToCart}>Add to Cart</button>
                    </div>
                </div>

                <div className="related-products">
                    <h3>Related Products</h3>
                    <div className="related-products-list">
                        <Carousel responsive={responsive}>
                            {relatedProducts?.map((product, index) => (
                                <Product key={product.id} post={product} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProductPage;