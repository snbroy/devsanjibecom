import { useContext } from "react";
import { CreateContextApi } from "../context/MyContextApi";
import Product from "../components/Product";

const ProductListing = () => {
    const context = useContext(CreateContextApi);
    const { products } = context;

    return (
        <div className="product-listing-wrap mx-container">
            <div className="product-listing-container">
                <h2 className="heading">All</h2>
                <div className="product-listing">
                    {products.map((product) => {
                        return (
                            <Product key={product.id} post={product} />
                        )

                    })
                    }
                </div>
            </div>
        </div>
    )

}

export default ProductListing;