import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
export const CreateContextApi = createContext();
export const ContextProvider = ({ children }) => {
    const { cart } = useSelector((state) => state);
    const [products, setProducts] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [categoriesA, setCategoriesA] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [offset, setOffset] = useState(false);
    const [paymentId, setPaymentId] = useState('');
    const [user, setUser] = useState(null);

    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
  
    async function fetchProductData() {
      setLoading(true);
  
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.length === 0) {
          return false
        }
        setProducts(data);
        const categories = data.map((product) => product.category);
        const uniqueCategories = [...new Set(categories)];
        setCategoriesA(uniqueCategories);
      }
      catch (err) {
        alert("Error");
        setProducts([]);
      }
      setLoading(false);
    }
    useEffect(()=>{
      localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])
    useEffect(() => {
      fetchProductData();
    }, []);

    return (
        <CreateContextApi.Provider value={{ products, openDrawer, setOpenDrawer, categoriesA, loading, searchResult, setSearchResult, offset, setOffset, setPaymentId, mobileNavOpen, setMobileNavOpen, user, setUser }}>
            {children}
        </CreateContextApi.Provider>
    );
}