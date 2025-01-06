import { Link } from "react-router-dom";
import NavData from "./NavData";
import './navbar.css';
import { CreateContextApi } from "../../../context/MyContextApi";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { remove, update } from "../../../redux/Slices/CartSlice";
import toast from "react-hot-toast";
import SearchBar from "../../SearchBar";
import SearchResult from "../../SearchResult";
import MobileNav from "../../MobileNav";
import useCheckMobileScreen from "../../../helper/helper";

const Navbar = () => {
    const dispatch = useDispatch();
    const context = useContext(CreateContextApi);
    const { openDrawer, setOpenDrawer, searchResult, user } = context;
    const { cart } = useSelector((state) => state);
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

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
        toast.error("Item removed from Cart");
    }


    const toggleDrawer = () => {
        if (openDrawer) {
            setOpenDrawer(false)
        }
        else {
            setOpenDrawer(true)
        }
    }


    return (
        <header className="bg-black">
            <nav className="navbar-wrap mx-container">
                <Drawer
                    open={openDrawer}
                    onClose={toggleDrawer}
                    direction='right'
                    className='mini-cart-wrapper'
                >
                    <div className="mini-cart-container">

                        <h3>Cart</h3>
                        {cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <ul>
                                <p className="cart-count">You have {totalQuantity} items in your cart</p>
                                {cart.map((product) => {
                                    return (
                                        <li key={product.id}>
                                            <div className="p-img"><img src={product.image} alt={product.title} /></div>
                                            <div className="p-details">

                                                <h4>{product.title}</h4>
                                                <div className="quantity">

                                                    <button onClick={(e) => handleDecrement(product)}>-</button>
                                                    <input type="text" value={product.quantity} />
                                                    <button value={'plus'} onClick={(e) => handleIncrement(product)}>+</button>
                                                    {/* <button value={'minus'} onClick={ handleDecrement(product)}>-</button>
                                                    <input type="number" value={product.quantity} />
                                                     */}
                                                </div>
                                                <p>Rs. {product?.price.toFixed(2)}</p>
                                                <button onClick={() => removeFromCart(product.id)}>Remove</button>

                                            </div>
                                        </li>
                                    )

                                })}

                            </ul>

                        )}
                        {cart.length > 0 && (
                            <div className="mini-cart-footer">
                                <h5>Total: Rs. {totalPrice.toFixed(2)}</h5>
                                <div className="btn-wrap flex">
                                    <Link className="button" to={"/cart"}>View Cart</Link>
                                    <Link className="button" to={"/Checkout"}>Checkout</Link>
                                </div>

                            </div>
                        )}

                    </div>
                </Drawer>
                <div className="navbar-container flex justify-space-between px-15 ">
                    <ul className="ul-head px-0 flex content-center">
                        <li className="list-style-none">
                            {useCheckMobileScreen() && (
                                <MobileNav data={NavData} user={user} />
                            )}

                            <Link to="/"><img src="/logos/logo_transparent.png" className="brand-logo" alt="logo" /></Link>
                            {useCheckMobileScreen() && (
                                <div className="cartItem">
                                    <button onClick={toggleDrawer}>
                                        <span className="cartText"><img src="/bag.png" alt="cart-icon" className="cart-bag" /></span>
                                        {cart?.length > 0 && (
                                            <span className="cartCount">{cart?.length ? totalQuantity : 0}</span>
                                        )}
                                    </button>
                                </div>
                            )}

                        </li>
                    </ul>
                    <ul className="ul-head px-0 search-wrapper flex content-center">
                        <li className="list-style-none flex">
                            {/* <input type="search" placeholder="Search" className="search-bar" />
                            <button>Submit</button> */}
                            <SearchBar />
                        </li>
                    </ul>
                    <ul className="ul-head flex px-0 gap-20 content-center menu-wrap">
                        {NavData?.map((item) => {
                            return (
                                <li key={item.id} className="list-style-none"><Link to={item.url}>{item.title}</Link></li>
                            )
                        })}
                        {user ? (
                            <li className="list-style-none"><Link to="/account">Account</Link></li>
                        ) : (
                            <>
                            <li className="list-style-none"><Link to="/login">Login</Link></li>
                            <li className="list-style-none"><Link to="/signup">Sign Up</Link></li>
                            </>
                            
                        )}
                        <li className="cartItem list-style-none">
                            <button onClick={toggleDrawer}>
                                <span className="cartText"><img src="/bag.png" alt="cart-icon" className="cart-bag" /></span>
                                {cart?.length > 0 && (
                                    <span className="cartCount">{cart?.length ? totalQuantity : 0}</span>
                                )}
                            </button>

                        </li>
                    </ul>
                </div>
            </nav>
            <div className=" search-result-wrapper">
                <div className="mx-container">
                    {searchResult.length > 0 && <SearchResult data={searchResult} />}
                </div>
            </div>
        </header>

    )
}

export default Navbar;